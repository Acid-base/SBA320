import axios from 'axios';

// Set the base URL for the API requests
axios.defaults.baseURL = 'https://mushroomobserver.org/api/v2/';

// Set the API key in the authorization header
axios.defaults.headers.common['Authorization'] = 'YOUR_API_KEY';

export default axios;
