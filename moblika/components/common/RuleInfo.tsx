import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";

type RuleInfoProp = {
  caption: string;
  valid: boolean;
};

const RuleInfo = ({ caption, valid }: RuleInfoProp): React.ReactElement => (
  <View style={styles.rule}>
    <View style={[styles.icon, valid && styles.iconSuccess]}>
      <Feather
        size={12}
        color={valid ? "#32911D" : "#000"}
        name={valid ? "check" : "x"}
      />
    </View>
    <Text style={[styles.rulesText, valid && styles.rulesTextSuccess]}>
      {caption}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  rule: {
    flexDirection: "row",
    marginBottom: 4,
  },
  iconSuccess: {
    borderColor: "#32911D",
  },
  icon: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  rulesText: {
    fontSize: 12,
  },
  rulesTextSuccess: {
    color: "#32911D",
  },
});

export default RuleInfo;
