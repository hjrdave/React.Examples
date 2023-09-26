const useLocalStorage = () => {
  const set = (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value));
  const get = (key: string) => {
    const cachedValue = localStorage.getItem(key);
    if (cachedValue !== null) {
      const parsedCachedValue = JSON.parse(cachedValue);
      return parsedCachedValue;
    }
    return cachedValue;
  };
  const remove = (key: string) => {
    localStorage.removeItem(key);
  };
  const clear = () => localStorage.clear();

  return { set, get, remove, clear };
};

export default useLocalStorage;
