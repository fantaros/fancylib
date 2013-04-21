/**
 * Fancy dynamic javascript lib config file.
 * 
 * @author fantaros.
 * @version 0.5
 * @license BSD.
 * @since 2012-04-08
 */
(function(window, undefined) {
	window.Fancy = (function(c){
		c.baseUrl = "/BCP";
		c.libBaseUrl = "./js/fancy/";
		c.config = ["bind-validate","bind-custom","fancy-bind"
		            ,"fancy-rule","fancy-simplelog","json2"];
		return c;
	})(window.Fancy|| function Fancy(){});
})(window);