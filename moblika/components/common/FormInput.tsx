import { StyleSheet, View } from "react-native";
import { Input, Text, InputProps } from "@ui-kitten/components";

type FormInputProps = {
   label?: string;
   caption?: string;
   error?: boolean;
   errorText?: string;
};

const FormInput = ({
   style = {},
   label,
   caption,
   error,
   errorText,
   ...props
}: FormInputProps & InputProps) => {
   const renderCaption = () => {
      return (
         <View style={styles.captionContainer}>
            <Text style={[styles.captionText, error && styles.errorText]}>
               {error ? errorText : caption}
            </Text>
         </View>
      );
   };
   return (
      <View style={style}>
         {label && (
            <Text style={styles.label} category="medium">
               {label}
            </Text>
         )}
         <Input
            style={styles.input}
            status={error ? "danger" : "basic"}
            caption={caption ?? error ? renderCaption : undefined}
            {...props}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   input: {
      borderRadius: 5,
   },
   label: {
      paddingHorizontal: 5,
      paddingBottom: 5,
      fontSize: 14,
   },
   errorText: {
      color: "#813531",
   },
   captionContainer: {
      paddingTop: 4,
      paddingHorizontal: 5,
   },
   captionText: {
      fontSize: 12,
      color: "#813531",
   },
});

export default FormInput;
