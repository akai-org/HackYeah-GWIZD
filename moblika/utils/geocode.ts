import axios from "axios";
import Constants from "expo-constants";

const GOOGLE_GEOCODE_API_KEY = Constants.expoConfig?.extra?.googleGeocodeApiKey;

const geocode = (): {
  searchAddress: (address: string) => Promise<{
    lat: number;
    lng: number;
    address: string;
  } | null>;
  searchLatLng: (latLng: {
    lat: number;
    lng: number;
  }) => Promise<string | null>;
} => {
  return {
    searchAddress: async (address) => {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address?.trim()}&key=${GOOGLE_GEOCODE_API_KEY}&language=pl`
      );

      return {
        lat: parseFloat(data?.results?.[0]?.geometry?.location?.lat),
        lng: parseFloat(data?.results?.[0]?.geometry?.location?.lng),
        address: data?.results?.[0]?.formatted_address,
      };
    },
    searchLatLng: async (latLng) => {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=${GOOGLE_GEOCODE_API_KEY}&language=pl`
      );

      return data?.results?.[0]?.formatted_address;
    },
  };
};

export default geocode;
