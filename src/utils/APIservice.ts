const config = {
  // api: 'http://localhost:1337',
  apiUrl: `${process.env.BACKEND_SERVER}`,
  // apiUrl: process.env.REACT_APP_BASEURL,
  //api: 'http://192.168.29.204:9096/api',
  options: {
    headers: { 'content-type': 'application/json', "Authorization": "", "refreshtoken": "", "Accept": "application/json" },
  },
};

const httpGet = (endpoint: string, sessionToken?: string) => {
  if (sessionToken)
    config.options.headers.Authorization = "bearer " + sessionToken;
  return fetch(`${config.apiUrl}${endpoint}`, {
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const httpPost = (endpoint: string, data: any, sessionToken?: string, refreshToken?: string) => {
  if (sessionToken)
    config.options.headers.Authorization = "bearer " + sessionToken;
  config.options.headers.refreshtoken = refreshToken;
  return fetch(`${config.apiUrl}${endpoint}`, {
    method: 'post',
    body: data ? JSON.stringify(data) : null,
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const httpPut = (endpoint: string, data: any, sessionToken?: string) => {
  if (sessionToken)
    config.options.headers.Authorization = "bearer " + sessionToken;
  return fetch(`${config.apiUrl}${endpoint}`, {
    method: 'put',
    body: data ? JSON.stringify(data) : null,
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const httpDelete = (endpoint: string, sessionToken?: string) => {
  if (sessionToken)
    config.options.headers.Authorization = "bearer " + sessionToken;
  return fetch(`${config.apiUrl}${endpoint}`, {
    method: 'delete',
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const handleResponse = (response: any) => {

  // You can handle 400 errors as well.
  if (response.status === 200) {
    return response.json();
  } else {
    return response.json();
    //   throw Error(response.json() | 'error');
    //throw Error('error');
  }
};

export default { httpGet, httpPost, httpPut, httpDelete };