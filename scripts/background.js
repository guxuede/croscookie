'use strict';

var permit_site=["121.199.49.95","localhost","127.0.0.1","file:"];

var referMap={
	"ecrm.":"https://ecrm.taobao.com",
	"trade.":"https://trade.taobao.com"
}

function isEmpty(value) {
    return value === undefined || value === null || value.trim() === '';
}

var requestOrigins = {};

function getOriginOverride() {
    var requestOrigin = localStorage.getItem('requestOrigin') || '';
    return requestOrigin;
}

function getReferOverride(url){
	for(var name in referMap){
		if(url.indexOf(name) != -1){
			return referMap[name];
		}
	}
}

function isPermitSite(url){
    for(var i in permit_site){
		if(url.indexOf(permit_site[i]) != -1){
			return true;
		}
    }
    return false;
}

function handleRequestHeaders(details) {

    var header;
    requestOrigins[details.requestId] = undefined;

    if (!isPermitSite(details.initiator)) {
        return { requestHeaders: details.requestHeaders };
    }

    var url = new URL(details.url);

    for (var i = 0; i < details.requestHeaders.length; ++i) {
        header = details.requestHeaders[i];

        if (header.name.toLowerCase() === 'origin') {

            var originOverride = getOriginOverride(); // or get from localStorage from options.

            if (!isEmpty(originOverride)) {
                //add not empty also.
                header.value = originOverride.trim();
            }
            requestOrigins[details.requestId] = header.value;
        }
    }

    //Override referer
	var referOverride = getReferOverride(details.url);
	if(!isEmpty(referOverride)){
		details.requestHeaders.push({name:'referer',value:referOverride});
    }
    
    return { requestHeaders: details.requestHeaders,
        redirectUrl: details.url };
}

function handleResponseHeaders(details) {

    if (!isPermitSite(details.initiator)) {
        return { responseHeaders: details.responseHeaders };
    }

    var header = null,
        requestOrigin = requestOrigins[details.requestId] || '',
        allowOrigin = localStorage.getItem('allowOrigin') || '*',
        allowHeaders = localStorage.getItem('allowHeaders') || '*',
        allowMethods = localStorage.getItem('allowMethods') || '*',
        allowCredentials = localStorage.getItem('allowCredentials') || 'true',
        oldAllowHeaders = '',
        responseHeaderNames = '',
        allowOriginFound = false,
        allowCredentialsFound = false,
        allowMethodsFound = false,
        allowHeadersFound = false;

    delete requestOrigins[details.requestId];

    for (var i = 0, len = details.responseHeaders.length; i < len; ++i) {
        header = details.responseHeaders[i];
        if (header.name.toLowerCase() === 'access-control-allow-credentials') {
            allowCredentialsFound = header.value.toLowerCase() === 'true';
        }
        if (header.name.toLowerCase() === 'access-control-allow-headers') {
            oldAllowHeaders = header.value;
        }
    }

    if (allowCredentials) {
        for (var i = 0, len = details.responseHeaders.length; i < len; ++i) {
            header = details.responseHeaders[i];
            responseHeaderNames += ',' + header.name;
        }
    }

    responseHeaderNames = (oldAllowHeaders.replace(/(^,)|(,$)/g, '') + ',' + responseHeaderNames.replace(/(^,)|(,$)/g, '')).replace(/(^,)|(,$)/g, '');

    for (i = 0, len = details.responseHeaders.length; i < len; ++i) {
        header = details.responseHeaders[i];
        if (header.name.toLowerCase() === 'access-control-allow-origin') {
            header.value = allowOrigin === '*' && allowCredentials === 'true' ? requestOrigin : allowOrigin;
            allowOriginFound = true;
        } else if (header.name.toLowerCase() === 'access-control-allow-headers') {
            header.value = allowHeaders === '*' ? responseHeaderNames : allowHeaders;
            allowHeadersFound = true;
        } else if (header.name.toLowerCase() === 'access-control-allow-methods') {
            header.value = allowMethods === '*' ? 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH' : allowMethods;
            allowMethodsFound = true;
        } else if (header.name.toLowerCase() === 'access-control-allow-credentials') {
            header.value = allowCredentials;
            allowCredentialsFound = true;
        }
    }

    if (!allowOriginFound) {
        details.responseHeaders.push({
            name: 'Access-Control-Allow-Origin',
            value: allowOrigin === '*' && allowCredentials === 'true' ? requestOrigin : allowOrigin
        });
    }
    if (!allowHeadersFound) {
        details.responseHeaders.push({
            name: 'Access-Control-Allow-Headers',
            value: allowHeaders === '*' ? responseHeaderNames : allowHeaders
        });
    }
    if (!allowMethodsFound) {
        details.responseHeaders.push({
            name: 'Access-Control-Allow-Methods',
            value: allowMethods === '*' ? 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH' : allowMethods
        });
    }
    if (!allowCredentialsFound) {
        details.responseHeaders.push({
            name: 'Access-Control-Allow-Credentials',
            value: allowCredentials
        });
    }

    return { responseHeaders: details.responseHeaders };
}

function setOn() {
    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
    chrome.webRequest.onBeforeSendHeaders.addListener(handleRequestHeaders, { urls: ['<all_urls>'], types: ['xmlhttprequest'] }, ['blocking', 'requestHeaders']);
    chrome.webRequest.onHeadersReceived.addListener(handleResponseHeaders, { urls: ['<all_urls>'], types: ['xmlhttprequest'] }, ['blocking', 'responseHeaders']);
}

function setOff() {
    chrome.browserAction.setBadgeText({ text: 'off' });
    chrome.browserAction.setBadgeBackgroundColor({ color: [128, 128, 128, 200] });
    chrome.webRequest.onBeforeSendHeaders.removeListener(handleRequestHeaders);
    chrome.webRequest.onHeadersReceived.removeListener(handleResponseHeaders);
}

//alway on
setOn();


function syncCookie(request){
   chrome.cookies.getAll({'url': "https://taobao.com"}, function (cookies) {
		if (cookies) {
			for(var c in cookies){
				if(cookies[c].name == "cookie2" || cookies[c].name == "sg"){
					cookies[c].domain = request.domain;
					delete cookies[c].hostOnly;
					delete cookies[c].session;
					cookies[c].name = "tb_"+cookies[c].name;
					cookies[c].url=request.url;
					chrome.cookies.set(cookies[c], function(){})
				}
			}
		}
	});
}
function getTbCookie(request,sendResponse){
   chrome.cookies.getAll({'url': "https://taobao.com"}, function (cookies) {
		if (cookies) {
			for(var c in cookies){
				if(cookies[c].name == "_tb_token_"){
					sendResponse(cookies[c]);
				}
			}
		}
	});
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.msg === 'syncCookie'){
		syncCookie(request);
	}else if(request.msg === 'getTbCookie'){
		getTbCookie(request,sendResponse);
		return true;
	}
});

// chrome.runtime.onInstalled.addListener(details => {
//  console.log('previousVersion', details.previousVersion);
// });
//# sourceMappingURL=background.js.map
