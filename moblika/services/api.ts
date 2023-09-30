import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { LogBox } from 'react-native';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const UNAUTHORIZED = 401;

axios.defaults.baseURL = Constants.expoConfig?.extra?.apiUrl;
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

axios.interceptors.request.use(async config => {
   const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
   if (!accessToken) return config;

   config.headers = {
      ...config.headers,
      Authorization: accessToken,
      'Content-Type': 'application/json',
   };

   return config;
});

axios.interceptors.response.use(
   async response => {
      return response;
   },
   async error => {
      const originalRequest = error.config;

      if (error?.response?.status === UNAUTHORIZED && !originalRequest._retry) {
         originalRequest._retry = true;

         const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN);

         if (!refreshToken || originalRequest.url === '/auth/refresh') {
            await SecureStore.deleteItemAsync(ACCESS_TOKEN);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN);
         } else {
            return axios
               .post('/auth/refresh', { refreshToken })
               .then(async res => {
                  const { accessToken, refreshToken } = res?.data;
                  if (accessToken) {
                     await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken);
                     await SecureStore.setItemAsync(
                        REFRESH_TOKEN,
                        refreshToken
                     );
                     return axios(originalRequest);
                  }
               })
               .catch(async () => {
                  await SecureStore.deleteItemAsync(ACCESS_TOKEN);
                  await SecureStore.deleteItemAsync(REFRESH_TOKEN);
               });
         }
      }
      const message =
         (error.response && error.response.data) ||
         error.message ||
         error.toString();

      return Promise.reject(message);
   }
);

export const fetcher = (url: string, dataBody: any) =>
   axios
      .get(url, {
         data: dataBody,
      })
      .then(res => res?.data);
