import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";

const Message = ({ style = {}, message, status = "info", ...rest }) => {
  return (
    <View
      style={[
        styles.message,
        style,
        status == "error"
          ? styles.error
          : status == "success"
          ? styles.success
          : status == "warning"
          ? styles.warning
          : null,
      ]}
      {...rest}
    >
      <Feather
        size={20}
        color="#FFF"
        name={
          status == "error"
            ? "alert-circle"
            : status == "success"
            ? "check-circle"
            : status == "warning"
            ? "alert-circle"
            : "info"
        }
      />
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    backgroundColor: "#7CCBEA",
    paddingHorizontal: 12.5,
    paddingVertical: 7.5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  success: {
    backgroundColor: "#7BE693",
  },
  error: {
    backgroundColor: "#F0826B",
  },
  warning: {
    backgroundColor: "#7CCBEA",
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 14,
    paddingLeft: 10,
    flex: 1,
    lineHeight: 22,
  },
});

export default Message;
