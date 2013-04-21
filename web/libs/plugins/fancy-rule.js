/**
	 * Fancy dynamic javascript lib.
	 * 
	 * @author fantaros.
	 * @version 0.5
	 * @license BSD.
	 * @since 2012-04-08
	 */
(function(window, undefined) {
	if(typeof window.Fancy !== "undefined"){
		var rules = {};
		var functions = {};
		(function(f){
			f.setRules = function(r){
				if(typeof f === "string"){
					rules = JSON.parse(r);
				} else {
					rules = r;
				}
			};
			f.setFunctions = function(f){
				if(typeof f === "string"){
					functions = JSON.parse(f);
				} else {
					functions = f;
				}
			};
			f.addFunction = function(name,f){
				functions[name] = f;
			};
			f.getRules = function(){
				return rules;
			};
			f.getFunctions = function(){
				return functions;
			};
			/**
			 * 获取规则
			 */
			f.findFunc = function(name){
				var ret = null;
				f.loop(functions,function(v){
					if(f.get(v,"funcName") === name){
						ret = v;
					}
				});
				if(ret === null){
					ret = f.loadFunction(name);
				}
				return v;
			};
				/**
				 * 获取规则
				 */
				f.findFuncById = function(id){
					var ret = null;
					f.loop(functions,function(v){
						if(f.get(v,"funcId") === id){
							ret = v;
						}
					});
					if(ret === null){
						ret = f.loadFunctionById(name);
					}
					return ret;
				};
				 f.loadFunction = function(name){
					 return null;
				 };
				 f.loadFunctionById = function(id){
					 return null;
				 };
			/**
			 * 执行的方法.
			 */
			f.execFunc = function(name){
				var func = f.findFunc(name);
				if(f.valid( func )){
					
				} else {
					console.log(f.str("查找函数").a(name));
					return null;
				}
			}
		})(window.Fancy);
	}
})(window);
