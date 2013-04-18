/**
 * 为了兼容没有console的IE浏览器.
 */
(function ConsoleHost(window, undefined) {
	if(typeof window.console === "undefined"){
		var logs = [];
		window.console = {
			log : function(str){
				logs.push("[");
				logs.push((new Date()).toString());
				logs.push("]日志:");
				logs.push(str);
				logs.push("\r\n");
				return window.console;
			},
			toString : function(){
				return logs.join("");
			},
			alert : function(){
				alert(window.console.toString());
				return window.console;
			},
			clear : function(){
				logs = [];
				return window.console;
			}
		};
	}
})(window);
