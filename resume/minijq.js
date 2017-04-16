export {jq as $};
var jq = function (selector) {
return new jq.fn.init(selector);
};
jq.fn = {
	init : function (selector) {
		console.log(selector);
	}, 





};










jq.fn.init.prototype = jq.fn;
jq.showHello = function () {
    console.log('i am from minijq ');
};
jq.showError = function () {
    console.log('sorry dude');
}
