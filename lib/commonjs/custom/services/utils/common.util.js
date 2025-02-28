"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocalStorage = setLocalStorage;
exports.getLocalStorage = getLocalStorage;
exports.removeLocalStorage = removeLocalStorage;
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getLocalStorage(key) {
    const values = localStorage.getItem(key);
    if (!values) {
        return null;
    }
    return JSON.parse(values);
}
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}
