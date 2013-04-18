/**
 * 扩展在此.
 */
(function(window,undefined){
	var $ = window.jQuery;
	if(typeof $ !== "undefined"){
		window.fancyExtends = (function($fe){
			$fe.urlRegEx = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
			return $fe;
		})(window.fancyExtends||{});
	}
})(window);