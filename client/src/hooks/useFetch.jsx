import { useQuery } from "@tanstack/react-query";

const useFetch = (url, queryKey) => {
  const token = localStorage.getItem("authToken");

  const { isPending, error, isError, data, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: async ({ signal }) => {
      try {
        // Sigurohemi që URL të mos jetë bosh ose gabim
        if (!url) throw new Error("❌ useFetch: URL is missing.");

        const fullUrl = import.meta.env.VITE_BASE_URL + url;

        const response = await fetch(fullUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          signal,
        });

        // Nëse nuk merr përgjigje të mirë, kthe gabimin nga backend
        if (!response.ok) {
          const errorMessage = await response.json().catch(() => {
            throw new Error("❌ Invalid JSON response from server.");
          });
          throw new Error(errorMessage.message || "❌ Error fetching data.");
        }

        // Përgjigje e saktë
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error("🔥 Fetch Error:", error.message);
        throw error;
      }
    },
  });

  return { data, isError, error, loading: isPending, refetch };
};

export default useFetch;
