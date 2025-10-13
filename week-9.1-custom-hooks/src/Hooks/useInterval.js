export default function useInterval(fn, timeout) {
  useEffect(() => {
    const interval = setInterval(() => {
      fn();
    }, timeout * 1000);

    return () => clearInterval(interval);
  }, [timeout]);
}
