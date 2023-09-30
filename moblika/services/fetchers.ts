import axios from 'axios';

export const matchingPlacesFetcher = async ({
   url,
   userAnswers,
}: {
   url: string;
   userAnswers: number[][];
}) => {
   return axios
      .post(url, { answerTags: userAnswers })
      .then(resp => resp.data)
      .catch(err => {
         throw new Error(err);
      });
};
