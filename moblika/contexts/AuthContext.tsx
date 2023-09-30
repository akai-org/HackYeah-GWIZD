import axios from "axios";
import React from "react";
import useSWR, { mutate } from "swr";
import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

const fetcher = (url: string) => axios.get(url).then((res) => res?.data);

const AuthStateContext = React.createContext({
   signIn: async (accessToken: string, refreshToken: string) => { },
   signOut: async () => { },
   state: {
      isLoading: true,
      isSignout: false,
      authToken: null,
   },
});

export function AuthStateProvider(props) {
   const [state, dispatch] = React.useReducer(
      (prevState, action) => {
         switch (action.type) {
            case "RESTORE_TOKEN":
               return {
                  ...prevState,
                  authToken: action.token,
                  isLoading: false,
               };
            case "SIGN_IN":
               return {
                  ...prevState,
                  isSignout: false,
                  authToken: action.token,
               };
            case "SIGN_OUT":
               return {
                  ...prevState,
                  isSignout: true,
                  authToken: null,
               };
         }
      },
      {
         isLoading: true,
         isSignout: false,
         authToken: null,
      }
   );

   React.useEffect(() => {
      const bootstrapAsync = async () => {
         let authToken;

         try {
            authToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
         } catch (e) {
            // Restoring token failed
         }

         dispatch({ type: "RESTORE_TOKEN", token: authToken });
      };

      bootstrapAsync();
   }, []);

   const authContext = React.useMemo(
      () => ({
         signIn: async (accessToken: string, refreshToken: string) => {
            await SecureStore.setItemAsync(REFRESH_TOKEN, refreshToken);
            await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken);

            dispatch({ type: "SIGN_IN", token: accessToken });
            mutate("/auth/me");
         },
         signOut: async () => {
            await SecureStore.deleteItemAsync(ACCESS_TOKEN);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN);

            dispatch({ type: "SIGN_OUT" });
            mutate("/auth/me");
         },
         state,
      }),
      [state]
   );

   return <AuthStateContext.Provider value={authContext} {...props} />;
}

export function useAuthState() {
   const context = React.useContext(AuthStateContext);

   if (!context) {
      throw new Error("useAuthState must be used within a AuthStateProvider");
   }

   return context;
}
