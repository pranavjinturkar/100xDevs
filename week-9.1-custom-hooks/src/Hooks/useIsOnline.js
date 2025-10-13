export default function useIsOnline() {
  const [value, setValue] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      const isOnline = window.navigator.onLine;
      setValue(isOnline);
      console.log(isOnline);
    }, 5000);

    const isOnline = window.navigator.onLine;
    setValue(isOnline);

    return () => clearInterval(interval);
  }, []);
  return value;
}
