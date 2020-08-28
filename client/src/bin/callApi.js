export async function getApi(route) {
  try {
    let url = "/api/" + route;
    let response = await fetch(url);

    if (!response.ok) throw Error(response.message);

    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}

export async function postApi(route, data) {
  try {
    const url = "/api/" + route;
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, config);

    if (!response.ok) throw Error(response.message);

    const res = await response.json();

    console.log(res);
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}

export async function patchApi(route, data) {
  try {
    const url = "/api/" + route;
    const config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, config);

    if (!response.ok) throw Error(response.message);

    const res = await response.json();

    console.log(res);
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}

export async function deleteApi(route, id) {
  try {
    const url = "/api/" + route;
    const config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    };

    const response = await fetch(url, config);

    if (!response.ok) throw Error(response.message);

    const res = await response.json();

    console.log(res);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
