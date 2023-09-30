import { View, Text, StyleSheet } from 'react-native';
import globalStyle from '../constants/Colors';

interface Props {
   message: string;
}

function ErrorScreen({ message }: Props) {
   return (
      <View style={styles.container}>
         <Text style={styles.text}>Ooops...</Text>
         <Text style={styles.message}>{message}</Text>
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
   },
   message: {
      color: globalStyle.light.primaryDark,
      fontSize: 18,
   }
});

export default ErrorScreen;
