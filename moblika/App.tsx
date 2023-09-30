import React from 'react';
import { light, mapping } from '@eva-design/eva';
import { Feather } from '@expo/vector-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { SWRConfig } from 'swr';
import { FeatherIconsPack } from './components/FeatherIcons';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { default as customMapping } from './mapping.json';
import Navigation from './navigation';
import useStore from './stores/useStore';
import { default as theme } from './theme.json';
import { AuthStateProvider } from './contexts/AuthContext';
import { fetcher } from './services/api';
import './i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type ToastProps = {
   text1: string;
   text2: string;
};

const toastConfig = {
   success: ({ text1, text2 }: ToastProps) => (
      <View style={[styles.toast, styles.success]}>
         <Feather size={20} color="#FFF" name="check-circle" />

         <View style={styles.toastContainer}>
            <Text style={styles.toastText1}>{text1}</Text>
            {text2 && <Text style={styles.toastText2}>{text2}</Text>}
         </View>
      </View>
   ),
   error: ({ text1, text2 }: ToastProps) => (
      <View style={[styles.toast, styles.error]}>
         <Feather size={20} color="#FFF" name="alert-circle" />

         <View style={styles.toastContainer}>
            <Text style={styles.toastText1}>{text1}</Text>
            {text2 && <Text style={styles.toastText2}>{text2}</Text>}
         </View>
      </View>
   ),
   info: ({ text1, text2 }: ToastProps) => (
      <View style={[styles.toast, styles.info]}>
         <Feather size={20} color="#FFF" name="info" />

         <View style={styles.toastContainer}>
            <Text style={styles.toastText1}>{text1}</Text>
            {text2 && <Text style={styles.toastText2}>{text2}</Text>}
         </View>
      </View>
   ),
};

export default function App() {
   const isLoadingComplete = useCachedResources();
   const colorScheme = useColorScheme();
   const setAuth = useStore(state => state.setAuth);
   const auth = useStore(state => state.auth);

   //Set current user data
   React.useEffect(() => {
      const getMeData = async () => {
         const res = await axios.get('/auth/me');

         if (res.data) setAuth(res.data);
      };

      getMeData();
   }, []);

   if (!isLoadingComplete) return null;

   return (
      <>
         <IconRegistry icons={FeatherIconsPack} />

         <ApplicationProvider
            mapping={mapping}
            customMapping={customMapping}
            theme={{ ...light, ...theme }}
         >
            <SafeAreaProvider>
               <GestureHandlerRootView style={{ flex: 1 }}>
                  <SafeAreaView style={{ flex: 1 }}>
                     <SWRConfig value={{ fetcher }}>
                        <AuthStateProvider>
                           <Navigation colorScheme={colorScheme} />
                           <StatusBar style="light" />
                        </AuthStateProvider>
                     </SWRConfig>
                  </SafeAreaView>
               </GestureHandlerRootView>
            </SafeAreaProvider>
         </ApplicationProvider>

         <Toast config={toastConfig} />
      </>
   );
}

const styles = StyleSheet.create({
   toast: {
      paddingHorizontal: 12.5,
      paddingVertical: 7.5,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
   },
   success: {
      backgroundColor: '#7BE693',
   },
   error: {
      backgroundColor: '#F0826B',
   },
   info: {
      backgroundColor: '#7CCBEA',
   },
   toastContainer: {
      flex: 1,
      paddingLeft: 10,
   },
   toastText1: {
      color: '#FFFFFF',
      fontSize: 15,
   },
   toastText2: {
      color: '#ededed',
      fontSize: 13,
   },
   image: {
      width: 75,
      height: 75,
      resizeMode: 'contain',
      marginBottom: 10,
   },
});
