import {
   useNavigation,
   useRoute,
} from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import ImageView from 'react-native-image-viewing';
import * as React from 'react';
import { RootTabScreenProps } from '../types/navigation';
import { Layout } from '@ui-kitten/components';

export const ImagesScreen = ({ navigation }: RootTabScreenProps<'Images'>) => {
   const { goBack } = useNavigation();
   const { params } = useRoute() as { params: { images: any[]; index: number } };

   return (
      <Layout style={styles.layout}>
         <View style={styles.container}>
            <ImageView
               images={params?.images.map(img => ({ uri: img.uri }))}
               imageIndex={params?.index}
               visible={true}
               onRequestClose={() => goBack()}
               FooterComponent={({ imageIndex }) => (
                  <View style={styles.footer}>
                     <Text style={styles.text}>
                     {params?.images[imageIndex].date}
                     </Text>
                     <Text style={styles.text}>
                        {imageIndex + 1} / {params?.images.length}
                     </Text>
                  </View>
               )}
            />
         </View>
      </Layout>
   );
};

const styles = StyleSheet.create({
   layout: {
      height: '100%',
   },
   container: {
      flex: 1,
   },
   footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 30,
   },
   text: {
      fontSize: 20,
      color: 'white',
   },
});
