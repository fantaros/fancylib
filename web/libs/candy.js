/**
 * Candy.
 * 
 * @author fantaros(Luhan Yan).
 * @version 0.1
 * @license BSD.
 * @since 2012-04-08 (As Extended Fancy)
 */
(function(window, undefined) {
	/**
	 * 对象属性扩展 .
	 */
	window.Function.prototype.func = function(n, m) {
		// n 名称,m 方法
		if (!this.prototype[n]) {
			this.prototype[n] = m;
		}
		return this;
	};
	/**
	 * 判断对象是否并非undefined或null.
	 */
	function valid(obj) {
		return (typeof obj !== "undefined" && obj != null);
	}
	/**
	 * 判断对象是否为数组. Copy from 'THE BUTTERFLY'
	 */
	function isArray(arr) {
		return arr && typeof arr === "object" 
				&& typeof arr.length === "number"
				&& typeof arr.splice === "function"
				&& !(arr.propertyIsEnumerable('length'));
	}
	/**
	 * 字符串拼接工具
	 */
	var $$ = (function() {var U = (function(b) {var d = [];function g() {if (!valid(d)) {d = [];}return d;}function a(v) {	if (typeof v !== "undefined"&&typeof v.toString === "function") {g().push(v.toString());}return this;}function s(v) {a(v);return g().join("");}function i(v) {d = [];a(v);return this;}b.func("append", a).func("$", a).func("init", i).func("$$", i).func("toString", s).func("_", s);return b;})(function U(str) {this.$$(str);});return function(s) {return new U(s);};})();
	/**
	 * String的去空格方法 .
	 */
	window.String.func("trim", function() {
		return this.replace(/^\s+|\s+$/g, '');
	}).func("$$",function(v){
		return $$(this).$(v);
	}).func("$",function(v){
		if(valid(v) && typeof v.toString === "function"){
			return this.concat(v.toString());
		} else {
			return this;
		}
	});
	/**
	 * window.console.
	 */
	var console = window.console || function() {
		var logs = [];
		return {
			log : function(str) {
				$$("[").$(new Date()).$("]LOG:").$(str).$("\r\n");
				return this;
			},
			toString : function() {
				return logs.join("");
			},
			alert : function() {
				alert(window.console.toString());
				return this;
			},
			clear : function() {
				logs = [];
				return this;
			}
		};
	};
	window.Object.func("$loop", function(m) {
				if (isArray(this)) {
					for ( var i = 0; i < this.length; ++i) {
						m(this[i], i, 'array', this);
					}
				} else {
					var that = this;
					for ( var k in this) {
						if (this.hasOwnProperty(k)) {
							(function(val, key) {
								m(val, key, 'object', that);
							})(this[k], k);
						}
					}
				}
			}).func("$clone",function(){
				var Type = function Clone(){};
				Type.prototype = this;
				return new Type();
			}).func("$filter",function filter(filtercase) {
						var func = filtercase;
						if (typeof filtercase === "string") {
							// 构造判断方法
							try {
								func = eval($$("(function(){ return function(x,y,type,that){ return ").$(filtercase).$("; };})();")._());
							} catch (e) {
								console.log("由于filtercase:").log(filtercase).log(" 错误!变成不删除元素");
								func = null;
							}
						}
						if (isArray(this)) {
							if(valid(func)){
								var rs = [];
								this.$loop(function(v, k, type, that) {
									try{
										if (func(v, k, type, that)){
											rs.push(v);
										}
									} catch(e){
										rs.push(v);
									}
								});
								return rs;
							} else {
								return this;
							}
						} else {
							if(valid(func)){
								var rs = this.$clone();
								this.$loop(function(v,k,type,that){
									try{
										if (this.hasOwnProperty(k) && func(v, k, type, that)){
											rs[k] = v;
										}
									} catch(e){
										rs[k] = v;
									}
								});
								return rs;
							} else {
								return this;
							}
						}
					});
	// jQuery 对象.
	var $ = window.jQuery;
	// Here is the Candy.
	/**
	 * 字符串拼接工具
	 */
	window.candy = window.$c = (function() {
		// StringBuffer的实现
		var CandyHost = (function(obj) {
			var closureObj = {};
			// 初始化清空
			function init(array) {
				return this;
			}
			// 绑定方法
			obj.func("init", init);
			return obj;
		})(function CandyHost(obj) {
			this.init(obj);
		});
		return function(obj) {
			return new CandyHost(obj);
		};
	})();
})(window);
