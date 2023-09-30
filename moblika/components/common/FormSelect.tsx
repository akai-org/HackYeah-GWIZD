import { StyleSheet, View } from "react-native";
import {
  Input,
  Text,
  InputProps,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type FormSelectProps = {
  data: string[];
  label?: string;
  caption?: string;
  error?: boolean;
  errorText?: string;
  style?: object;
  onChange?: (value: string) => void;
};

const FormSelect = ({
  data,
  style = {},
  label,
  caption,
  error,
  errorText,
  onChange,
  ...props
}: FormSelectProps) => {

  return (
    <View style={style}>
      {label && (
        <Text style={styles.label} category="medium">
          {label}
        </Text>
      )}
      <Select
        {...props}
        onSelect={(index) => onChange?.(data[index.row])}        
      >
        {data.map((item) => (
          <SelectItem key={item} title={item} />
        ))}
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    borderRadius: 0,
  },
  label: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    paddingTop: 10,
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

export default FormSelect;
