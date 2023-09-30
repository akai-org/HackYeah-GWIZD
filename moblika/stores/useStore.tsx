import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
   auth: any;
   setAuth(auth: any): void;
}

const useStore = create<AppState>()(
   persist(
      set => ({
         auth: null,
         setAuth: auth => set({ auth }),
      }),
      {
         name: 'app-storage',
         getStorage: () => AsyncStorage,
      }
   )
);

export default useStore;
