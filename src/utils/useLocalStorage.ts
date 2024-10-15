/** The name of the module. */
export const LocalStorage = {
  /**
   * Retrieves data from localstorage
   * @param {string} key - Item to retrieve.
   * @return {string} - Item from localstorage
   */
  get(key) {
    return localStorage?.getItem(key);
  },
  set(name, value) {
    localStorage.setItem(name, value);
  },
  remove() {
    window.localStorage.clear();
  },
  clear() {},
};

export default LocalStorage