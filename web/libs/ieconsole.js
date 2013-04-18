(function(window,undefined){
	if(typeof window.console === "undefined" || typeof window.console.log !== "object"){
		var logs = [];
		window.console = (function(c){
			function log(o){
				if(typeof o !=="undefined" && o.toString instanceof Function){
					logMessage(""+o);
				} else {
					logMessage("undefined");
				}
			};
			function showAll(){
				if(logs!=null){
					for(var i = 0;i<logs.length;++i){
						alert(logs[i]);
					}
				}
			}
			function logMessage(m){
				logs.push(m);
			}
			c.log = log;
			c.show = showAll;
			return c;
		})(window.console||{});
	}
})(window);