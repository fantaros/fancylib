/**
	 * Fancy dynamic javascript lib. Function Covert Plugin.
	 * 
	 * @author fantaros.
	 * @version 0.5
	 * @license BSD.
	 * @since 2012-04-08
	 */
(function(window, undefined) {
	if(typeof window.Fancy !== "undefined"){
		Fancy.makeFunc = function(f){
			// 将字符串变为函数 如 "function (){}"
			var func = null;
			//只支持 string转换到 function
			if(typeof f === "string"){
				try{
					eval(Fancy.str("func = (function(f){ return f; })(")
							.a(f).a(");").s());
				} catch (e){
					//失败则为空
					func = null;
					Fancy.safeCall("catchError")(e);
				}
			}
			return func;
		};
	}
})(window);
