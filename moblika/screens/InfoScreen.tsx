import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RootTabScreenProps } from '../types/navigation';
import { useTranslation } from 'react-i18next';
import { Layout } from '@ui-kitten/components';
import { Toolbar } from '../components/common/Toolbar';
import { useForm } from 'react-hook-form';
import Input from '../components/common/Input';
import CustomButton from '../components/common/CustomButton';
import { animalFetcher } from '../services/fetchers';

export default function InfoScreen({ navigation }: RootTabScreenProps<'Info'>) {
   const { t } = useTranslation();
   const { handleSubmit, control } = useForm();
   const [image, setImage] = useState(null);
   const [base64, setBase64] = useState(null);
   console.log(image);

   const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         //allowsEditing: true,
         //aspect: [4, 3],
         base64: true,
         quality: 1,
      });

      //  console.log(result);

      if (!result.canceled) {
         setImage(result.assets[0].uri);
         setBase64(result.assets[0].base64);
      }
   };

   const onSubmit = async (data: any) => {
      console.log(data);
      await animalFetcher(base64, data.name, data.description).then(res => {
          navigation.navigate('Home');
        });
   };

   return (
      <Layout style={styles.layout}>
         <Toolbar title={t('animals.report')} home />
         <View style={styles.container}>

         {image ? (
               <Image
                  source={{ uri: image }}
                  style={{ width: 300, height: 300, alignSelf: 'center' }}
               />
            ) : <Text style={{ width: 300, height: 300 }}/>}
            <CustomButton style={styles.addButton} onPress={pickImage}>
               <Text>{t('animals.addPhoto')}</Text>
            </CustomButton>
            <Input name="name" label={"Name"}  control={control}/>
            <Input name="description" label={"Description"} control={control} />
            <CustomButton
               style={styles.submit}
               variant="filled"
               onPress={handleSubmit(onSubmit)}
            >
               <Text>{t('animals.report')}</Text>
            </CustomButton>
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
      gap: 10,
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
   submit: {
      marginTop: 30,
      width: '50%',
      alignSelf: 'center',
   },
   addButton: {
      marginBottom: 10,
      width: '50%',
      alignSelf: 'center',
   },
});
