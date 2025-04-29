import { useState, useEffect, useCallback } from "react";

const useFetch = (url, options = {}, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (overrideOptions = {}) => {
      const controller = new AbortController();
      const signal = controller.signal;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          ...overrideOptions,
          signal, // Ensure signal is always included
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          setData(result);
          return result;
        } else {
          throw new Error("Response is not JSON");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
        throw err; // Re-throw to allow consumers to handle errors
      } finally {
        setLoading(false);
      }

      return { cancel: () => controller.abort() }; // Return cancel function
    },
    [url, JSON.stringify(options)] // Serialize options to avoid reference issues
  );

  useEffect(() => {
    let controller;
    if (autoFetch) {
      controller = new AbortController();
      fetchData({ signal: controller.signal });
    }
    return () => {
      if (controller) controller.abort(); // Cleanup on unmount
    };
  }, [fetchData, autoFetch]);

  const revalidate = () => fetchData();

  const sendRequest = async (method, body = null, customOptions = {}) => {
    const requestOptions = {
      method,
      ...(body && {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
      ...customOptions,
    };
    return fetchData(requestOptions);
  };

  const postData = (body, customOptions) =>
    sendRequest("POST", body, customOptions);
  const putData = (body, customOptions) => sendRequest("PUT", body, customOptions);
  const deleteData = (customOptions) => sendRequest("DELETE", null, customOptions);
  const patchData = (body, customOptions) =>
    sendRequest("PATCH", body, customOptions);

  return {
    data,
    loading,
    error,
    revalidate,
    postData,
    putData,
    deleteData,
    patchData,
    sendRequest,
  };
};

export default useFetch;