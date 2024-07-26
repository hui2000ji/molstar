"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLocalStorage = exports.getLocalStorage = exports.setLocalStorage = void 0;
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
exports.setLocalStorage = setLocalStorage;
function getLocalStorage(key) {
    var values = localStorage.getItem(key);
    if (!values) {
        return null;
    }
    return JSON.parse(values);
}
exports.getLocalStorage = getLocalStorage;
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}
exports.removeLocalStorage = removeLocalStorage;
