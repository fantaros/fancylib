/**
	 * Fancy dynamic javascript lib. Dynamic Binding Plugin.
	 * 
	 * @author fantaros.
	 * @version 0.5
	 * @license BSD.
	 * @since 2012-04-08
	 */
(function(window, undefined) {
	if(typeof window.Fancy !== "undefined"){
		var f = window.Fancy;
		f.FunctionCatagories = {
			"1":"计算规则",
			"2":"校验规则",
			"3":"自定义规则",
			"4":"控件规则",
			"计算规则":"CountRule",
			"校验规则":"ValidateRule",
			"自定义规则":"CustomRule",
			"控件规则":"ControlRule"
		};
		f.bindAll = function(){
			// 获取所有的规则
			var rules = f.getRules();
			if(typeof rules !== "undefined" 
				&& rules!=null && f.isArray(rules)){
				// 遍历并绑定
				f.loop(rules,function(v){
					// 获取函数
					var funcId = f.get(v,"funcId");
					var func = f.findFuncById(funcId);
					if(typeof func !== "undefined" && func!=null){
						// 获取
						var cat = f.get(func,"categories");
						var indexid = f.get(v,"indexId");
						var rowindexid = f.get(v,"rowIndexId");
						var et = f.get(v,"eventType");
						var args = f.get(v,"params");
						switch(f.$val(cat)){
							// 计算规则绑定
							case '1':
								break;
							case '2':
							// 校验规则绑定
								f.bindValidateRule(f.str(rowindexid).a("_")
										.a(indexid).s(),func,args,et,v);
								break;
							// 控件规则绑定
							case '4':
								break;
							// 自定义规则绑定
							case '3':
								f.bindCustomRule(f.str(rowindexid).a("_")
										.a(indexid).s(),func,args,et,v);
								break;
							default:
								f.bindCustomRule(f.str(rowindexid).a("_")
										.a(indexid).s(),func,args,et,v);
								break;
						}
					}
				});
			}
		};
	}
})(window);
