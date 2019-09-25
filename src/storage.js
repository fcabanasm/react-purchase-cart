const storage = () => {
  const key = "cartProducts";
  return {
    persist: data => localStorage.setItem(key, data),
    get: () => localStorage.getItem(key),
    delete: () => localStorage.removeItem(key)
  };
};

export default storage;
