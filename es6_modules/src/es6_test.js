/**
* @file es6 syntax study
* @author slp7756646@126.com
	*/
(() => {
	var a = [];
for(let i =0; i<10; i++) {
	a[i] = function () {
	console.log(i);
	};
}
// a[6]();
for (let i = 0; i < 3; i ++) {
    let i = 'abc';
    console.log(i);
}
})();

