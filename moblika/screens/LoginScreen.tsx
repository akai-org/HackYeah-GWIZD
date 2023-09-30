import { StyleSheet, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Text, View } from '../components/Themed';
import { Toolbar } from '../components/common/Toolbar';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Message from '../components/common/Message';
import { useAuthState } from '../contexts/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import FormInput from '../components/common/FormInput';
import CustomButton from '../components/common/CustomButton';
import { RootTabScreenProps } from '../navigation';

interface LoginInputs {
   email: string;
   password: string;
}

export default function LoginScreen({
   navigation,
}: RootTabScreenProps<'Login'>) {
   const { t } = useTranslation();
   const [error, setError] = useState();
   const { signIn } = useAuthState();
   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<LoginInputs>();

   const onSubmit = (data: LoginInputs) =>
      axios
         .post('/auth/login', {
            email: data?.email?.trim(),
            password: data?.password,
         })
         .then(res => {
            const { refreshToken, accessToken } = res?.data;
            if (accessToken && refreshToken) {
               signIn(accessToken, refreshToken);
               navigation.navigate('Home');
            }
         })
         .catch(err => {
            setError(err?.message || true);
         });

   const errorKeys = {
      WrongCredentials: t('wrongCredentials'),
      NotActivated: t('notActivated'),
   };

   //  todo: show login status, loader or sth

   return (
      <Layout style={styles.layout}>
         <Toolbar title={t('log')} showLoginButton={false} />

         <View style={styles.container}>
            <Image
               source={require('../assets/images/COOKLY.png')}
               style={[styles.logoImage, { marginBottom: 5 }]}
            />
            <Text style={styles.title}>{t('log')}</Text>
            {error && (
               <Message
                  message={errorKeys[error] || t('signIn.error')}
                  status="error"
               />
            )}
            <View style={styles.box}>
               <Controller
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: t('emailRequired'),
                     },
                  }}
                  name="email"
                  render={({ field: { onChange, value, onBlur } }) => (
                     <FormInput
                        label={t('email')}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        error={!!errors.email}
                        errorText={errors?.email?.message}
                     />
                  )}
               />
            </View>

            <View style={styles.box}>
               <Controller
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: t('passwordRequired'),
                     },
                  }}
                  name="password"
                  render={({ field: { onChange, value, onBlur } }) => (
                     <FormInput
                        label={t('password')}
                        secureTextEntry={true}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        error={!!errors.password}
                        errorText={errors?.password?.message}
                     />
                  )}
               />
            </View>

            <CustomButton
               onPress={handleSubmit(onSubmit)}
               style={styles.button}
               loading={isSubmitting}
            >
               {t('logIn')}
            </CustomButton>

            <CustomButton
               variant="ghost"
               onPress={() => navigation.navigate('Register')}
               style={{ alignSelf: 'center', marginTop: 40 }}
            >
               <Text>{t('register')}</Text>
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
   },
   title: {
      marginTop: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
   },
   box: {
      marginVertical: 10,
   },
   button: {
      marginTop: 30,
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
   listButton: {
      paddingHorizontal: 24,
      paddingVertical: 16,
   },
});
