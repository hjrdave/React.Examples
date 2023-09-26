const useSessionStorage = () => {
  const set = (key: string, value: any) =>
    sessionStorage.setItem(key, JSON.stringify(value));
  const get = (key: string) => {
    const cachedValue = sessionStorage.getItem(key);
    if (cachedValue !== null) {
      const parsedCachedValue = JSON.parse(cachedValue);
      return parsedCachedValue;
    }
    return cachedValue;
  };
  const remove = (key: string) => {
    sessionStorage.removeItem(key);
  };
  const clear = () => sessionStorage.clear();

  return { set, get, remove, clear };
};

export default useSessionStorage;
