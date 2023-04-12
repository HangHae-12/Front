const session = {
  get: (key) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  set: (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  },

  remove: (key) => {
    sessionStorage.removeItem(key);
  },

  clear: () => {
    sessionStorage.clear();
  },
};

export default session;
