import axios from 'axios';

const defaultBaseUrl = 'http://127.0.0.1';

export const api = (baseUrl = defaultBaseUrl) => ({
  getHealth: () =>
    axios.get(`${baseUrl}/health`).then((response) => response.data.status),
  /* other endpoints here */
});