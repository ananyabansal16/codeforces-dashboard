useEffect(() => {
    const fetchContests = async () => {
        setLoading(true);
        try {
            // Replace with your actual API URL
            const response = await fetch("https://api.example.com/contests");
            const data = await response.json();
            setContests(data); // Make sure the data structure matches your state
        } catch (error) {
            console.error("Error fetching contests:", error);
        } finally {
            setLoading(false);
        }
        };
    
        fetchContests();
}, []);
