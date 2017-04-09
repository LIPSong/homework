"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.square = square;
exports.diag = diag;
var sqrt = exports.sqrt = Math.sqrt;
//导出函数
function square(x) {
    return x * x;
}
//导出函数
function diag(x, y) {
    return sqrt(square(x) + square(y));
}