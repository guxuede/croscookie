'use strict';

//chrome.runtime.sendMessage({ msg: 'syncCookie', domain:window.document.domain,url:"http://121.199.49.95"});

chrome.runtime.sendMessage({ msg: 'getTbCookie'},function(r){
	document.body.setAttribute('data-tb_token', r.value);
});