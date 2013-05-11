/**
 * Fancy dynamic javascript lib.
 * 
 * @author fantaros(Luhan Yan).
 * @version 0.5
 * @license BSD.
 * @since 2012-04-08
 */
(function(window) {
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
     * String的去空格方法 .
     */
    window.String.func("trim", function() {
        return this.replace(/^\s+|\s+$/g, '');
    });
    /**
     * 获取任意对象的toString. 如果为undefined或null则为空字符串.
     */
    function $val(str) {
        return (str === undefined || str === null || !(typeof str.toString === "function")) ? ""
                : str.toString();
    }
    /**
     * 判断对象是否并非undefined或null.
     */
    function valid(obj) {
        return (obj !== undefined && obj !== null);
    }
    /**
     * 判断对象是否为数组. Copy from 'THE BUTTERFLY'
     */
    function isArray(arr) {
        return arr && typeof arr === "object" && typeof arr.length === "number"
                && typeof arr.splice === "function"
                && !(arr.propertyIsEnumerable('length'));
    }
    // jQuery 对象.
    var $ = window.jQuery;
    // How to Fancy!
    window.Fancy = (function FancyDomain(c) {
        // namespace Fancy
        'use strict';
        var $version = "0.5";
        /**
         * 字符串拼接工具
         */
        var str = (function() {
            // StringBuffer的实现
            var StringBuffer = (function(buffer) {
                var base = [];
                // 获取缓存
                function g() {
                    if (!valid(base)) {
                        base = [];
                    }
                    return base;
                }
                // 添加一部分字符串
                function a(str) {
                    if (str !== undefined && typeof str.toString === "function") {
                        g().push(str.toString());
                    }
                    return this;
                }
                // 转换为普通javascript字符串
                function s() {
                    return g().join("");
                }
                // 初始化清空
                function i(str) {
                    base = [];
                    a(str);
                    return this;
                }
                // 绑定方法
                buffer.func("append", a).func("add", a).func("a", a)
                      .func("init", i).func("clear", i).func("c", i)
                      .func("i", i).func("toString", s).func("str", s)
                      .func("_", s).func("s", s);
                return buffer;
            })(function StringBuffer(str) {
                this.i(str);
            });
            return function(obj) {
                return new StringBuffer(obj);
            };
        })();
        /**
         * 获取版本号.
         */
        function version() {
            return $version;
        }
        /**
         * 给Fancy增加属性.
         */
        function attr(n, m) {
            // n 名称 , m 值
            if (m === undefined) {
                // 当 值为空时 为获得属性值
                if (c.hasOwnProperty(n)) {
                    console.log(str("找寻属性").a(n).a("失败!").s());
                    return c[n];
                }
                return null;
            } else {
                // 值不空时为设定属性值
                if (!c[n] && typeof n === "string") {
                    // 如果值不存在则设定该值
                    c[n] = m;
                }
                // 返回本身用于链式编程用
                return this;
            }
        }
        /**
         * 首字母大写.
         */
        function upperCaseFirst(v) {
            // undefined 时 返回 null
            if (v !== undefined && typeof v.toString === "function") {
                var s = v.toString();
                // 首字母大写
                return s.charAt(0).toUpperCase() + s.substr(1, s.length - 1);
            }
            return null;
        }
        function containsClosure(n) {
            if (typeof n === "string") {
                var gn = attr("get" + upperCaseFirst(n));
                return gn !== undefined && typeof gn === "function";
            }
            return false;
        }
        /**
         * 加入闭包对象.
         */
        function closure(n, v, isreadonly) {
            var that = this;
            if (typeof n === "string") {
                (function(name, val) {
                    // 闭包对象
                    var innerObj = val,
                    // 获取属性扩展方法,先查找自己的
                    at = that.attr;
                    if (at === undefined) {
                        at = attr;
                    }
                    if (upperCaseFirst(name) !== null && at !== undefined
                            && typeof at === "function") {
                        // 如果属性名称正确且包含属性扩展方法
                        // 则自动生成get,set方法
                        at("get" + upperCaseFirst(name), function() {
                            return innerObj;
                        });
                        if (isreadonly === undefined || !isreadonly) {
                            at("set" + upperCaseFirst(name), function(val) {
                                innerObj = val;
                            });
                        }
                    }
                })(n, v);
            }
            return this;
        }
        /**
         * 获取指定对象的属性.
         */
        function get(o, n) {
            return (o !== undefined && typeof n === "string" && o[n] !== undefined) ? o[n]
                    : null;
        }
        /**
         * 深扩展方法.
         */
        function deepen() {
            if (c !== undefined && typeof c === "function") {
                for (var k in c) {
                    if (c.hasOwnProperty(k)) {
                        // 遍历并扩展
                        c.func(k, c[k]);
                    }
                }
            }
            return c;
        }
        function deep(attrname) {
            if (c !== undefined && typeof c === "function"
                    && typeof attrname === "string") {
                if (c.hasOwnProperty(attrname)) {
                    // 遍历并扩展
                    c.func(attrname, c[attrname]);
                }
            }
            return c;
        }
        /**
         * 由配置数组克隆对象的部分或全部. 注意不会克隆闭包.
         */
        function clone(o, a) {
            if (o === undefined || o == null) {
                // 无法克隆undefined 或 null
                return null;
            }
            if (a !== undefined && isArray(a)) {
                // 利用prototype进行克隆
                var Type = function FancyClosure() {
                };
                loop(a, function(val) {
                    Type.prototype[val] = o[val];
                });
                // 创造克隆对象
                return new Type();
            } else {
                // 利用prototype进行克隆
                var Type = function FancyClosure() {
                };
                Type.prototype = o;
                // 创造克隆对象
                return new Type();
            }
        }
        /**
         * 合并为数组.
         */
        function merge() {
            var arr = [];
            if (valid(arguments) && arguments.length > 0) {
                for (var i = 0; i < arguments.length; ++i) {
                    var a = arguments[i];
                    if (isArray(a)) {
                        loop(a, function(v) {
                            arr.push(v);
                        });
                    } else if (valid(a)) {
                        arr.push(a);
                    }
                }
            }
            return arr;
        }
        /**
         * 遍历. 可遍历对象或数组. o 为对象或数组. m 为回调方法.
         */
        function loop(o, m) {
            // 保留闭包的this(一般为caller)
            var that = this;
            if (o !== undefined) {
                if (isArray(o)) {
                    // 如果是数组回调方法会被传入 值和偏移.
                    for (var i = 0; i < o.length; ++i) {
                        m(o[i], i, 'array', that);
                    }
                } else {
                    // 如果是对象回调方法会被传入 值和属性名.
                    for (var k in o) {
                        if (o.hasOwnProperty(k)) {
                            (function(val, key) {
                                m(val, key, 'object', that);
                            })(o[k], k);
                        }
                    }
                }
            }
            // 返回本身用于链式编程用
            return this;
        }
        /**
         * 安全调用.
         */
        function safeCall(n) {
            if (c.hasOwnProperty(n)) {
                return c[n];
            }
            console.log(str("找寻属性").a(n).a("失败,返回stub方法!").s());
            return function Stub() {
                console.log(str("执行方法").a(n).a("失败,执行了stub的方法!").s());
            };
        }
        /**
         * 扩展.
         */
        function ext(n, m) {
            // 同时扩展Fancy的属性和Fancy对象的属性
            // Fancy对象 如 var fancy = new Fancy();
            if (c.attr !== undefined) {
                c.attr(n, m);
            }
            if (c.func !== undefined) {
                c.func(n, m);
            }
            return this;
        }
        /**
         * 用jquery加载脚本.
         */
        function load(url) {
            $.ajax({
                url : url,
                dataType : "script",
                async : false,
                success : function() {

                }
            });
            return this;
        }
        /**
         * 域内查看.
         */
        function findContext(name) {
            if (typeof name === "string") {
                return eval("(function(f){ return f; })((typeof " + name
                        + " ==='undefined')?null:" + name + ")");
            }
        }
        /**
         * 动态单名称绑定. 仅仅用于初始化
         */
        function dynamicBind(name) {
            if (name !== undefined && typeof name.toString === "function") {
                var d = findContext(name);
                if (d !== undefined) {
                    attr(name, d);
                }
            }
        }
        /**
         * 获取QueryString的数组.
         */
        function urlQuerys() {
            var result = window.location.search.match(new RegExp(
                    "[\?\&][^\?\&]+=[^\?\&]+", "g"));
            if (isArray(result)) {
                for (var i = 0; i < result.length; i++) {
                    result[i] = result[i].substring(1);
                }
            }
            if (result === undefined) {
                return null;
            }
            return result;
        }
        // 获得window上的QueryString
        var querylist = urlQuerys();
        // 封装这些QueryString
        var Querys = {};
        /**
         * 根据QueryString参数名称获取值.
         */
        function getQuery(name) {
            var result = window.location.search.match(new RegExp("[\?\&]"
                    + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        }
        /**
         * 根据QueryString参数索引获取值.
         */
        function getQueryByIndex(index) {
            if (index == null) {
                return "";
            }
            if (querylist === undefined) {
                querylist = urlQuerys();
            }
            if (index >= querylist.length) {
                return "";
            }
            var startIndex = result.indexOf("=") + 1;
            result = result.substring(startIndex);
            return result;
        }
        /**
         * 过滤对象的一些成员.
         */
        function filter(obj, filtercase) {
            if (obj !== undefined) {
                // 结果声明.
                var a = {};
                // 如果是数组则有计数器
                var c = 0;
                // 判断是否是数组
                var isa = false;
                if (isArray(obj)) {
                    a = [];
                    isa = true;
                }
                var func = filtercase;
                if (typeof filtercase === "string") {
                    // 构造判断方法
                    eval(str("func =  function(x,y,type,that){ return ").a(
                            filtercase).a("; };").s());
                }
                // 如果是正确的方法
                if (typeof func === "function") {
                    loop(obj, function(x, y, type, that) {
                        var flag = false;
                        try {
                            flag = func(x, y, type, that);
                        } catch (e) {
                            console.log(str("执行filter出错，filtercase为:").a(
                                    filtercase).a("对象为:").s());
                            console.log(obj);
                            flag = false;
                        }
                        if (flag === true) {
                            if (isa) {
                                a[c++] = x;
                            } else {
                                a[y] = x;
                            }
                        }
                    });
                }
                return a;
            }
            return obj;
        }
        /**
         * 加载插件.
         */
        function loadPlugins() {
            var config = merge("json2", window.fancy_config || []);
            if (config !== undefined && isArray(config)) {
                var loaded = {};
                loop(config, function(val) {
                    if (valid(val)
                            && (!valid(loaded[val]) || loaded[val] === false)) {
                        // 循环加载config里配置好的 plugins文件夹下的js文件
                        load(str(c.libBaseUrl).a("plugins/").a(val).a(".js")
                                .s());
                        loaded[val] = true;
                    }
                });
                return loaded;
            }
            return null;
        }
        /**
         * 获取配置.
         */
        function getConfig() {
            // 获取内置扩展配置
            if (window.fancyExtends !== undefined) {
                c.innerExtends = window.fancyExtends;
                loop(window.fancyExtends, function(val, key) {
                    if (c[key] === undefined) {
                        attr(key, val);
                    }
                });
            } else {
                c.innerExtends = {};
            }
            // 返回基础方法
            return [ "load", "attr", "isArray", "valid", "$val", "loop", "ext",
                    "closure", "get", "str", "deepen", "version", "clone",
                    "filter", "loadPlugins", "findContext", "containsClosure",
                    "safeCall", "getQuery", "urlQuerys", "getQueryByIndex",
                    "Querys", "deep", "merge" ];
        }
        if (querylist !== undefined && querylist !== null && isArray(querylist)
                && querylist.length > 0) {
            // 循环设置querystring到Querys节
            loop(querylist, function(val) {
                var s = val.indexOf("=");
                var v = null;
                var k = null;
                if (s > -1) {
                    v = val.substring(s + 1);
                    k = val.substr(0, s);
                }
                if (v !== null && k !== null) {
                    Querys[k] = v;
                }
            });
        }
        // 特殊：如果脚本加载时设定fancybaseurl则会覆盖这个值
        var fancybaseurl = $val(Querys["fancybaseurl"]);
        if (fancybaseurl !== undefined && fancybaseurl !== null) {
            c.baseUrl = fancybaseurl.trim();
        }
        // 扩展方法并返回Fancy(由 deepen 返回)
        return loop(getConfig(), dynamicBind), deepen();
    })(window.Fancy || function Fancy() {
    });
})(window);
