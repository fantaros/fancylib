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
		c.baseUrl = "";
		c.libBaseUrl = "libs/fancy/";
		c.config = ["json2","fancy-simplelog"];
		return c;
	})(window.Fancy|| function FancyStub(){});
})(window);