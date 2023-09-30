import axios from 'axios';

export const animalFetcher = async ({
   img,
   name, 
   description,
}: {
   img: string;
   name: string;
   description: string;
}) => {
   return axios
      .post('animals', { image: img, name, description })
      .then(resp => resp.data)
      .catch(err => {
         throw new Error(err);
      });
};
