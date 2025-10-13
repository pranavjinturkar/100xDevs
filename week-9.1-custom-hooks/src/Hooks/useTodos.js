export default useTodos = (n) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const limit = Math.floor(Math.random() * 20);
      await new Promise((r) => setTimeout(r, 0));
      axios.get(`https://dummyjson.com/todos?limit=${limit}`).then((res) => {
        console.log("Data fetched...");
        setTodos(res.data.todos);
        setIsLoading(false);
      });
    }
    const value = setInterval(fetchData, n * 1000);

    fetchData();

    return () => clearInterval(value);
  }, [n]);

  return [todos, isLoading];
};
