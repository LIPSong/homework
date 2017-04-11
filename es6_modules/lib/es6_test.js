'use strict';

/**
* @file es6 syntax study
* @author slp7756646@126.com
	*/
(function () {
	var a = [];

	var _loop = function _loop(i) {
		a[i] = function () {
			console.log(i);
		};
	};

	for (var i = 0; i < 10; i++) {
		_loop(i);
	}
	// a[6]();
	for (var i = 0; i < 3; i++) {
		var i = 'abc';
		console.log(i);
	}
})();