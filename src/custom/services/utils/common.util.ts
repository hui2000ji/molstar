export function setLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string) {
  const values = localStorage.getItem(key);
  if (!values) {
    return null;
  }
  return JSON.parse(values);
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}
