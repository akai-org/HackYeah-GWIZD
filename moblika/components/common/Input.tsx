import { Input, InputProps, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Control, Controller } from 'react-hook-form';

interface FormInputProps extends InputProps {
   name: string;
   control: Control<T>;
   rules?: Record<string, any>;
   error?: string | boolean;
   required?: boolean;
   theme?: 'dark' | 'light';
}

const FormInput = ({
   error,
   name,
   control,
   rules,
   label = '',
   defaultValue = '',
   style = {},
   required = false,
   theme = 'dark',
   ...props
}: FormInputProps): React.ReactElement => {
   const fieldProps: Partial<InputProps> = {
      status: error ? 'danger' : undefined,
   };

   return (
      <Controller
         name={name}
         rules={rules}
         control={control}
         defaultValue={defaultValue}
         render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ display: 'flex', flexDirection: 'column' }}>
               {!!label && (
                  <Text style={[styles.label, styles[theme]]} category="bold">
                     {`${label}`}
                     {required ? <Text status="danger">*</Text> : <></>}
                  </Text>
               )}
               <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  caption={typeof error === 'string' ? error : ''}
                  {...props}
                  {...fieldProps}
                  textStyle={styles[theme]}
                  style={[
                     styles.input,
                     style,
                     theme === 'light'
                        ? { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                        : null,
                  ]}
               />
            </View>
         )}
      />
   );
};

const styles = StyleSheet.create({
   input: {
      marginBottom: 10,
      borderRadius: 5,
   },
   label: {
      marginBottom: 5,
      fontSize: 14,
   },
   dark: { color: '#000' },
   light: { color: '#FFF' },
});

export default FormInput;
