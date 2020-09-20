export async function getApi(route) {
  try {
    let url = "/api/" + route;
    let response = await fetch(url);

    if (!response.ok) throw Error(response.message);

    if (response.ok) {
      let data = await response.json();

      return data;
    }
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}

export async function fetchApi(method, route, data) {
  try {
    const url = "/api/" + route;
    const config = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, config);

    if (!response.ok) throw Error(response.message);

    if (response.ok) {
      const res = await response.json();

      return res;
    }
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}
