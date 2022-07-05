# Checklist
1. 	Pre-connect to external recources: `<link rel="preconnect" href="https://cert.tryggehandel.net">`


# Non blocking css
https://keithclark.co.uk/articles/loading-css-without-blocking-render/

The trick to triggering an asynchronous stylesheet download is to use a <link> element and set an invalid value for the media attribute (I'm using media="none", but any value will do). When a media query evaluates to false, the browser will still download the stylesheet, but it won't wait for the content to be available before rendering the page.

This method of loading CSS will deliver useable content to visitors much quicker than the standard approach. Critical CSS can still be served with the usual blocking approach (or you can inline it for ultimate performance) and non-critical styles can be progressively downloaded and applied later in the parsing / rendering process.

This technique uses JavaScript, but you can cater for non-JavaScript browsers by wrapping the equivalent blocking <link> elements in a <noscript> element:

`<link rel="stylesheet" href="css.css" media="none" onload="if(media!='all')media='all'">
<noscript><link rel="stylesheet" href="css.css"></noscript>`
