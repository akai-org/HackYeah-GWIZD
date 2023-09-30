import { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Text, View } from '../components/Themed';
import { Toolbar } from '../components/common/Toolbar';
import { RootTabScreenProps } from '../navigation';
import globalStyle from '../constants/Colors';
import {
   IndexPath,
   Layout,
} from '@ui-kitten/components';
import { useGetAnimals } from '../services/hooks';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
   const { t } = useTranslation();
   const {animalsData, isAnimalsDataValidating} = useGetAnimals();

   console.log(animalsData);

   return (
      <Layout style={styles.layout}>
         <Toolbar title={t('animals.home')} home />
         <View style={styles.container}>
         {isAnimalsDataValidating ? <View style={styles.spinner}>
                        <ActivityIndicator color={globalStyle.light.primary} />
                     </View> :

        animalsData?.map((animal, index) => (
            <View key={index}>
               <Text>{animal.name}</Text>
               <Text>{animal.description}</Text>
               <Image
                  source={{ uri: animal.image }}
                  style={{ width: 300, height: 300, alignSelf: 'center' }} />
            </View>))
          }
          </View>
      </Layout>
   );
}

const styles = StyleSheet.create({
   layout: {
      flex: 1,
   },
   container: {
      flex: 1,
   },
   headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      margin: 20,
      marginBottom: 0,
   },
   title: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: globalStyle.light.black,
   },
   info: {
      marginTop: 10,
      textAlign: 'center',
   },
   separator: {
      marginVertical: 30,
      height: 1,
      width: '100%',
   },
   spinner: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '50%',
   },
   filtersWrapper: {
      paddingBottom: 4,
      overflow: 'hidden',
   },
   filtersContainer: {
      paddingBottom: 10,
      paddingHorizontal: 20,
      // ios
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      // android
      shadowColor: '#171717',
      elevation: 3,
   },
   listContainer: {
      flex: 1,
      marginTop: 16,
      marginHorizontal: 20,
   },
   button: {
      marginRight: 20,
   },
   filter: { marginTop: 10 },
});
