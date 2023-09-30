import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { View } from '../components/Themed';
import { Toolbar } from '../components/common/Toolbar';
import { useTranslation } from 'react-i18next';
import Message from '../components/common/Message';
import { useAuthState } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import CustomButton from '../components/common/CustomButton';
import useIsStrongPassword from '../hooks/useIsStrongPassword';
import Toast from 'react-native-toast-message';
import RuleInfo from '../components/common/RuleInfo';
import validator from 'validator';
import Input from '../components/common/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootTabScreenProps } from '../navigation';

interface RegisterInputs {
   email: string;
   password: string;
   confirmPassword: string;
}

const errorKeys = {
   EmailTaken: 'signUp.emailTaken',
};

export default function RegisterScreen({
   navigation,
}: RootTabScreenProps<'Register'>) {
   const { t } = useTranslation();
   const [error, setError] = useState();
   const { signIn } = useAuthState();
   const {
      handleSubmit,
      control,
      watch,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<RegisterInputs>({
      mode: 'onChange',
      criteriaMode: 'all',
   });

   const password = watch('password');
   const isStrongPassword = useIsStrongPassword(password);

   const onSubmit = (data: RegisterInputs) => {
      const dataToSend = {
         email: data?.email,
         password: data?.password,
      };
      axios
         .post('/user', dataToSend)
         .then(() => {
            navigation.navigate('Login');
         })
         .catch((err: Error) => {
            Toast.show({
               type: 'error',
               text1: t(errorKeys[err?.message]) || 'unknown error',
            });
         });
   };

   return (
      <Layout style={styles.layout}>
         <Toolbar title={t('register')} />
         <KeyboardAwareScrollView style={styles.container}>
            <Image
               source={require('../assets/images/COOKLY.png')}
               style={[styles.logoImage, { marginBottom: 5 }]}
            />
            <Text style={styles.title}>{t('register')}</Text>
            {error && (
               <Message
                  message={errorKeys[error] || t('signIn.error')}
                  status="error"
               />
            )}
            <Input
               control={control}
               name="email"
               label="E-mail"
               keyboardType="email-address"
               rules={{
                  required: { value: true, message: t('signUp.emailRequired') },
                  validate: (value: string) =>
                     validator.isEmail(value) || t('signUp.wrongEmail'),
               }}
               error={errors?.email?.message}
               autoCapitalize="none"
            />
            <Text style={{ marginTop: 20 }}>{t('signUp.createPassword')}</Text>
            <Text style={styles.headerText}>{t('signUp.passwordRules')}</Text>
            <Input
               control={control}
               name="password"
               label={t('password')}
               autoCapitalize="none"
               secureTextEntry
               rules={{
                  required: {
                     value: true,
                     message: t('signUp.passwordRequired'),
                  },
                  validate: () =>
                     isStrongPassword.valid ? true : t('signUp.wrongPassword'),
               }}
            />

            <View style={styles.rules}>
               <RuleInfo
                  valid={isStrongPassword.length}
                  caption={t('signUp.passwordRule1')}
               />
               <RuleInfo
                  valid={isStrongPassword.numbers}
                  caption={t('signUp.passwordRule2')}
               />
               <RuleInfo
                  valid={isStrongPassword.lowercase}
                  caption={t('signUp.passwordRule3')}
               />
               <RuleInfo
                  valid={isStrongPassword.uppercase}
                  caption={t('signUp.passwordRule4')}
               />
            </View>

            <Input
               control={control}
               name="confirmPassword"
               label={t('signUp.confirmPassword')}
               autoCapitalize="none"
               secureTextEntry
               rules={{
                  required: {
                     value: true,
                     message: t('signUp.passwordRequired'),
                  },
                  validate: (value: string) =>
                     value === password || t('signUp.wrongPasswords'),
               }}
               error={errors?.confirmPassword?.message}
            />
            <CustomButton
               onPress={handleSubmit(onSubmit)}
               style={styles.button}
               loading={isSubmitting}
            >
               {t('signUp.sign')}
            </CustomButton>
         </KeyboardAwareScrollView>
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
      alignContent: 'center',
   },
   title: {
      marginTop: 30,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
   },
   box: {
      marginVertical: 10,
   },
   button: {
      marginTop: 30,
      marginBottom: 5,
   },
   separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
   },
   logoImage: {
      height: 120,
      resizeMode: 'contain',
      alignSelf: 'center',
   },
   headerText: {
      marginTop: 4,
      marginBottom: 8,
      fontSize: 13,
   },
   rules: {
      marginTop: 5,
      marginBottom: 8,
   },
});
