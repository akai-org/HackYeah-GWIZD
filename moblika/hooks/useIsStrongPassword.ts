import { useMemo } from 'react';
import validator from 'validator';

type PasswordValidation = {
   length: boolean;
   lowercase: boolean;
   uppercase: boolean;
   numbers: boolean;
   valid: boolean;
};

const useIsStrongPassword = (password: string): PasswordValidation => {
   const isStrongPassword = useMemo(() => {
      const passwordString = password ?? '';
      const emptyOptions = {
         minLength: 0,
         minLowercase: 0,
         minUppercase: 0,
         minNumbers: 0,
         minSymbols: 0,
      };

      const passwordValidation: PasswordValidation = {
         length: validator.isStrongPassword(passwordString, {
            ...emptyOptions,
            minLength: 8,
         }),
         lowercase: validator.isStrongPassword(passwordString, {
            ...emptyOptions,
            minLowercase: 1,
         }),
         uppercase: validator.isStrongPassword(passwordString, {
            ...emptyOptions,
            minUppercase: 1,
         }),
         numbers: validator.isStrongPassword(passwordString, {
            ...emptyOptions,
            minNumbers: 1,
         }),
         valid: false,
      };

      passwordValidation.valid =
         passwordValidation.length &&
         passwordValidation.lowercase &&
         passwordValidation.uppercase &&
         passwordValidation.numbers;

      return passwordValidation;
   }, [password]);

   return isStrongPassword;
};

export default useIsStrongPassword;
