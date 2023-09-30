import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
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

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
   const { t } = useTranslation();

   return (
      <Layout style={styles.layout}>
         <Toolbar title={t('info')} />

         <View style={styles.container}>
            <Text style={styles.title}>{t('info')}</Text>
            <View
               style={styles.separator}
               lightColor="#eee"
               darkColor="rgba(255,255,255,0.1)"
            />
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
