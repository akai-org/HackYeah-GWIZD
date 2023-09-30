import useSWR from 'swr';


export const useGetAnimals = () => {
   const {data: animalsData, isValidating: isAnimalsDataValidating, mutate: mutateAnimals} = useSWR('/animals');
   return {animalsData, isAnimalsDataValidating, mutateAnimals};
}