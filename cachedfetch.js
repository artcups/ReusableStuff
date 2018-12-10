
Services = Services || {};
Services.cachedFetch = function () {
  currentLanguage = "sv-se";
  
  function createUrl(endpoint) {
    return "/" + currentLanguage + "/" + endpoint;
  }
  function hashstr(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  
  function fetch(endpoint, payload, options, callback, failCallback, cacheKey) {
    $.ajax({
      type: "GET",
      url: createUrl(endpoint),
      data: payload
    }).done(function (data,a, req) {
      var headers = req.getAllResponseHeaders();
      if (headers && (headers.match(/application\/json/i) || headers.match(/text\//i))) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(cacheKey + ':ts', Date.now());
      }
      if (typeof (callback) === 'function')
        callback(JSON.parse(JSON.stringify(data)));
    }).fail(function (error) {
      console.log(error);
      if (typeof (failCallback) === 'function')
        failCallback(error);
    });
  }
  function cachedFetch(endpoint, payload, options, callback, failCallback) {
    var expiry = 10 * 60 // 10 min default
    
    if (typeof options === 'number') {
      expiry = options
      options = undefined
    } else if (typeof options === 'object') {
      expiry = options.seconds || expiry;
    }
    
    // Use the URL as the cache key to sessionStorage
    var cacheKey = hashstr(createUrl(endpoint));
    var cached = localStorage.getItem(cacheKey);
    var whenCached = localStorage.getItem(cacheKey + ':ts');
    if (cached !== null && whenCached !== null) {
    
      var age = (Date.now() - whenCached) / 1000;
      if (age < expiry) {
        if (typeof (callback) === 'function')
          callback(JSON.parse(cached));
        return;
      } else {
        // We need to clean up this old key
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheKey + ':ts');
      }
    } 
    fetch(cendpoint, payload, options, callback, failCallback, cacheKey);
  }
  return {
    cachedFetch: cachedFetch
  }
}();
