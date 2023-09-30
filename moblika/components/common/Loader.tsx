import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import globalStyle from '../../constants/Colors';

function Loader() {
   return (
      <View style={styles.container}>
         <Text style={styles.text}>One moment...</Text>
         <ActivityIndicator size="large" color={globalStyle.light.primary} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 100
   },
   text: {
      color: globalStyle.light.primaryDark,
      fontSize: 24,
      marginBottom: 30,
      fontWeight: '600',
      letterSpacing: 0.4
   }
});

export default Loader;
