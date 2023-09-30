import 'dotenv/config';

export default ({ config }) => {
   return {
      ...config,
      extra: {
         apiUrl: process.env.API_URL,
         frontAppUrl: process.env.FRONT_APP_URL,
      },
   };
};
