/**
 * Fancy dynamic javascript lib. Dynamic Binding Plugin.
 * 
 * @author fantaros.
 * @version 0.5
 * @license BSD.
 * @since 2012-04-08
 */
(function(window, undefined) {
	if (typeof window.Fancy !== "undefined") {
		Fancy.bindCustomRule = function(id, func, a, eventtype, rule) {
			if (eventtype !== null && typeof eventtype === "string"
					&& eventtype.trim() !== "") {
				var args = a;
				var fbody = Fancy.get(func, "funcBody");
				var fname = Fancy.get(func, "funcName");
				var executor = null;
				args["cbcpid"] = id;
				args["ruleData"] = rule;
				try {
					eval(Fancy.str("executor = ").a(fbody).a(";").s());
				} catch (e) {
					console.log(Fancy.str("转换执行函数[name=").a(fname).a("]时失败!")
							.s());
					console.log(e);
					executor = null;
				}
				if (typeof executor !== "undefined" && executor !== null
						&& executor instanceof Function) {
					$("#" + id).bind(
							eventtype.toLowerCase().trim(),
							args,
							function() {
								try {
									//执行
									executor(args);
								} catch (e) {
									console.log(Fancy.str("执行数据项[").a(id).a(
											"]的").a(eventtype).a("事件时失败,原因:"));
									console.log(e);
								}
							});
				}
			}
		};
	}
})(window);
