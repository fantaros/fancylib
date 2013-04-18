/**
 * fancy dynamic lib for javascript by fantaros
 * @author yanluhan/fantaros(fantasymon@gmail.com/@163.com)
 * @haskell> let at = "fantasymon@" in concat[at,"gmail.com",at,"163.com"]
 * @version 0.5
 */

var prefix = "";
// 配置加载脚本
//如 var libs = [ "BB/TM/Util/FancyBase", "BB/TM/Util/FancyConfig" ];

var libs = [ "js/jquery-easyui-1.1.2/json2", "EF/jQuery/jquery-1.7",
		"BB/PM/zoomer", "js/uploadify-v3.1/jquery.uploadify-3.1",
		"BB/TM/Util/uploadify", "BB/TM/Util/TableValOperate-Custom",
		"BB/TM/Util/trim", "BB/TM/Util/CustomIndexMeta",
		"BB/TM/Util/BCPMetaData" ];

/**
 * 加载类库
 * @param path
 * @returns {Boolean}
 */
function loadHeader(path) {
	if (path != null) {
		//var npath = path.toString().replace('.', '/');
		var node = document.createElement("script");
		//node.src = "./" + npath + ".js";
		node.src = "./" + path + ".js";
		document.getElementsByTagName("head")[0].appendChild(node);
		return true;
	} else {
		return false;
	}
}
/**
 * 加载类库
 * @param path
 * @returns {Boolean}
 */
function load(path) {
	if (path != null) {
		//var npath = path.toString().replace('.', '/');
		var node = document.createElement("script");
		//node.src = "./" + npath + ".js";
		node.src = "./" + path + ".js";
		document.getElementsByTagName("body")[0].appendChild(node);
		return true;
	} else {
		return false;
	}
}
load("BB/TM/Util/FancyBase");
//window.requireMap = fancy.createFancyLibObject("Map");
//window.requireMap.put("BB/TM/Util/FancyBase", true);
//function require(path) {
//	if (!window.requireMap.containsKey(path)) {
//		window.requireMap.put(path, load(path));
//	}
//	return window.requireMap.get(path);
//}
/**
 * 请求加载类库
 * @param path
 * @returns {Boolean}
 */
window.loadConfig = function() {
	if (typeof libs === "undefined" || libs == null || libs.length == 0) {

	} else {
		for ( var i = 0; i < libs.length; ++i) {
			//require(prefix + "." + libs[i]);
			load(libs[i]);
		}
	}
	return true;
}
window.loadConfig();
