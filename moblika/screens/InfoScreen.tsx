import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Toolbar } from '../components/common/Toolbar';
import { useTranslation } from 'react-i18next';
import { RootTabScreenProps } from '../navigation';

export default function InfoScreen({ navigation }: RootTabScreenProps<'Info'>) {
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
            <EditScreenInfo path="/screens/InfoScreen.tsx" />
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
      padding: 20,
      justifyContent: 'center',
      alignContent: 'center',
   },
   title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
   },
   separator: {
      marginVertical: 30,
      height: 1,
      width: '100%',
   },
});
