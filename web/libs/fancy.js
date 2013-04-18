/**
 * Function.func .
 * @param n name
 * @param m method
 * @returns {Function}
 */
Function.prototype.func = function(n,m){
	//n as name,m as method
	if(!this.prototype[n]){
		this.prototype[n] = m;
	}
	return this;
};
/**
 * String.trim .
 */
String.func("trim",function(){
	return this.replace(/^\s+|\s+$/g,'');
});
/**
 * initial fancy lib.
 * @author fantaros.
 */
(function(window, undefined) {
	var $ = window.jQuery;
	function $val(str){
		return (typeof str === "undefined"||str==null
				||!str.toString instanceof Function)
			?"":str.toString();
	}
	function valid(obj){
		return (typeof obj !== "undefined" && obj!=null);
	}
	//JsLink version 0.1
	var JsLink = (function(){
		var that = this,whereMap = [],select,from,orderby,groupby;
		function JsLink(sel){
			if(typeof sel === "undefined"){
				sel = "*";
			}
			select = sel;
		}
		function _build_(){
			var s = [];
			s.push("SELECT ");
			s.push($val(select));
			s.push(" FROM ");
			s.push($val(from));
			s.push(" WHERE ");
			if(whereMap!=null && whereMap.length>0){
				for(var i = 0;i<whereMap.length;++i){
					s.push(whereMap[i]);
				}
			}
			s.push(" ORDERBY ");
			s.push(orderby);
			s.push(" GROUPBY ");
			s.push(groupby);
			return s.join("");
		}
		function _query_(attr){
			var sql = _build_();
			var d = {"sql":sql};
			if(typeof attr !== "undefined"){
				d["attr"] = attr;
			}
			var rs = "";
			$.ajax({
				type:"POST",
				url:"JSLINK.JSP",
				async:false,
				data : d,
				success : function(result){
					rs = result;
				}
			});
			return rs;
		}
		return JsLink.prototype = {
				"where" : function(val){
					if(valid(val)){
						if(!(whereMap instanceof Array)){
							whereMap = [];
						}
						whereMap.push(val);
					}
					return this;
				},"from" : function(val){
					if(valid(val)){
						from = val;
					}
					return this;
				},"orderby" : function(val){
					if(valid(val)){
						orderby = val;
					}
					return this;
				},"groupby" : function(val){
					if(valid(val)){
						groupby = val;
					}
					return this;
				},"query" : function(attr){
					if(valid(whereMap) && valid(select) && valid(from)){
						return json.parse(_query_(attr));
					} else {
//						throw {
//							name : "not prepared",
//							type : ""
//						};
						return null;
					}
				}
		},JsLink;
	})();
	window.select = function(sel){
		return new JsLink(sel);
	}
	//Point version 0.2
	var Point = (function(){
		var that = this,x,y;
		function Point(xx,yy){
			x = xx;
			y = yy;
		}
		return Point.prototype = {
				"getX" : function(){
					return x;
				},"getY" : function(){
					return y;
				},"setX" : function(xx){
					x = xx;
				},"setY" : function(yy){
					y = yy;
				}
		},Point;
	})();
	//Copy from the 'BUTTERFLY'
	function isArray(arr){
		return arr && typeof arr === "object" 
			&& typeof arr.length === "number"
			&& typeof arr.splice === "function" 
			&& !(arr.propertyIsEnumerable('length'));
	}
	//How to fancy!
	window.fancy = (function(c) {
		c.JsLink = JsLink;
		c.clone = function(o){
			var Type = function(){};
			Type.prototype = o;
			return new Type();
		};
		c.iterate = function(o,m){
			var that = this;
			if(typeof o !=="undefined"){
				if(isArray(o)){
					for(var i=0;i<o.length;++i){
						m(o[i],i);
					}
				} else {
					for(var k in o){
						if(o.hasOwnProperty(k)){
							m(o[k],k);
						}
					}
				}
			}
			return c;
		};
		c.loadLib = function(libpath){
			$.script(libpath);
		};
		return c;
	})(window.fancy || {});
})(window);