# cached fetch

I cant remember where i got the inspirtation for this, its a bit jquery for some... take it if you want it :)

I wrote this tiny extention of jquerys ajax call to boost performance on an E-Commers site where we loaded som of the menus asynconously after pageload.

Instead of loading the same menus on each pageload i though that this could be done in a smarter way, and hey, it could.

It works by using the url as a key and passing in the stringified payload as value in localstorage, keep in mind that you may not want to put your entire page in the localstorage as it will eat a lot of memory, but i think small parts is ok.

For marked based sites i put the language in the url to get different versions of the cached data.
