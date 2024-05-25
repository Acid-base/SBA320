import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import { parse } from 'csv-parse';
import NodeCache from 'node-cache';

// Load environment variables (should be in your client/.env file)
dotenv.config();

// --- Constants ---
const BASE_URL = 'https://mushroomobserver.org/api2';
const API_KEY = process.env.REACT_APP_MUSHROOM_OBSERVER_API_KEY; // Use REACT_APP_ prefix
const RATE_LIMIT_DELAY_MS = 5000;
const CSV_DATA_DIR = './csv_data'; // Directory to store downloaded CSV files

// --- Cache Setup ---
const csvCache = new NodeCache({ stdTTL: 24 * 60 * 60 }); // Cache data for 24 hours

// Exit if the API key is not found
if (!API_KEY) {
  console.error(
    'Error: REACT_APP_MUSHROOM_OBSERVER_API_KEY is missing. Check your .env file.',
  );
  process.exit(1);
}

// --- Axios Instance ---
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `API-Key ${API_KEY}`,
  },
});

// --- Rate Limiting Logic ---
let requestQueue = [];
let isRateLimited = false;

const processQueue = () => {
  if (isRateLimited || requestQueue.length === 0) return;

  const { resolve, reject, endpoint, options } = requestQueue.shift();

  axiosInstance(endpoint, options)
    .then(resolve)
    .catch((error) => {
      if (error.response && error.response.status === 429) {
        console.warn('Rate limit hit! Retrying in 5 seconds...');
        isRateLimited = true;
        requestQueue.unshift({ resolve, reject, endpoint, options });
        setTimeout(() => {
          isRateLimited = false;
          processQueue();
        }, RATE_LIMIT_DELAY_MS);
      } else {
        reject(error);
      }
    });
};

// --- CSV Data Handling ---
const downloadFile = (url, filePath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (error) => {
      fs.unlink(filePath, () => reject(error)); // Delete the file if an error occurred
    });
  });
};

const downloadFileIfModified = async (url, filePath) => {
  return new Promise((resolve, reject) => {
    https.head(url, (response) => {
      const lastModified = response.headers['last-modified'];
      const filePathExists = fs.existsSync(filePath);

      if (!filePathExists || (lastModified && fs.statSync(filePath).mtimeMs < new Date(lastModified).getTime())) {
        console.log('Downloading updated CSV file...');
        downloadFile(url, filePath)
          .then(resolve)
          .catch(reject);
      } else {
        console.log('Using cached CSV file...');
        resolve();
      }
    }).on('error', reject);
  });
};

const readMushroomObserverCSV = async (filename) => {
  const cachedData = csvCache.get(filename);
  if (cachedData) {
    console.log(`Loading ${filename} from cache...`);
    return cachedData; 
  }

  const filePath = `${CSV_DATA_DIR}/${filename}`;
  await downloadFileIfModified(`${BASE_URL}/download_observations_as_csv`, filePath);

  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        csvCache.set(filename, results);
        resolve(results);
      })
      .on('error', reject);
  });
};

// --- Mushroom Observer API Methods ---
const mushroomObserverService = {
  async get(endpoint, params = {}, detail = 'none', format = 'json') {
    return new Promise((resolve, reject) => {
      requestQueue.push({
        resolve,
        reject,
        endpoint: `/${endpoint}`,
        options: {
          method: 'GET',
          params: {
            ...params,
            detail,
            format,
          },
        },
      });
      processQueue();
    });
  },

  // ... (other API methods - POST, PATCH, DELETE -
  //     apply similar error handling to these as well) ...

  async getObservations(params = {}, detail = 'none', format = 'json') {
    try {
      // 1. Try getting data from the CSV file
      let observations = await this.getObservationsFromCSV();

      // 2. If CSV data is unavailable or there's an error, fetch from the API
      if (observations.length === 0) {
        observations = await this.get(
          'observations',
          params,
          detail,
          format,
        );
      }
      return observations;
    } catch (error) {
      // --- Enhanced Error Handling ---
      console.error(`Error fetching observations:`, error);

      // Check for common error types:
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const statusCode = error.response.status;
        const message =
          error.response.data.error || 'API request failed'; // Try to get a server message

        if (statusCode === 429) {
          // Specific handling for rate limiting
          throw new Error(
            `Rate limit exceeded. Please try again later.`,
          );
        } else {
          // More specific error based on status code
          throw new Error(
            `API request failed with status ${statusCode}: ${message}`,
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error(
          'No response from API server. Please check your network.',
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up API request. Please try again.');
      }
    }
  },

  // ... CSV Data Access Methods
  async getObservationsFromCSV() {
    try {
      // This will now try to get data from the cache or download if needed
      const observations = await readMushroomObserverCSV('observations.csv');
      return observations;
    } catch (error) {
      console.error('Error getting observations:', error);
      return [];
    }
  },

  // ... (Add other CSV-based data access functions as needed) ...
};

export default mushroomObserverService;