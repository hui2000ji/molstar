export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function getLocalStorage(key) {
    const values = localStorage.getItem(key);
    if (!values) {
        return null;
    }
    return JSON.parse(values);
}
export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}
