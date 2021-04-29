const getToken = () => {
  return localStorage.getItem("token");
};

export const api = async <T>(
  endpoint: string,
  options: RequestInit
): Promise<T> => {
  const token = getToken();

  const config: RequestInit = {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { token }),
    },
  };
  if (options.body) {
    config.body = options.body;
  }
  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.msg ? data.msg : "error");
    }
    return data;
  } catch (error) {
    return Promise.reject(error.message ? error.message : null);
  }
};

api.get = <T>(endpoint: string) => {
  return api<T>(endpoint, { method: "GET" });
};
api.post = <T>(endpoint: string, body?: object) => {
  return api<T>(endpoint, { method: "POST", body: JSON.stringify(body) });
};
api.put = <T>(endpoint: string, body?: object) => {
  return api<T>(endpoint, { method: "PUT", body: JSON.stringify(body) });
};
api.delete = <T>(endpoint: string) => {
  return api<T>(endpoint, { method: "DELETE" });
};
