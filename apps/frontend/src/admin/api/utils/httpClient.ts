const createHeadersFromOptions = (options: RequestInit): Headers => {
  const requestHeaders = (options.headers ||
    new Headers({
      Accept: "application/json",
    })) as Headers;
  if (
    !requestHeaders.has("Content-Type") &&
    !(options && (!options.method || options.method === "GET")) &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  return requestHeaders;
};

export const httpClient = async (
  url: string,
  options: RequestInit = {}
): Promise<unknown | null> => {
  const headers = createHeadersFromOptions(options);
  const resp = await fetch(url, {
    ...options,
    headers: headers,
  });
  if (resp.ok) {
    if (resp.status === 204) {
      return { status: resp.status };
    }
    return resp.json();
  }
  const error = {
    status: resp.status,
    message: await resp.text(),
  };
  throw error;
};
