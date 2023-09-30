import { Feather } from "@expo/vector-icons";
import { Avatar } from "@ui-kitten/components";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import globalStyle from "../../constants/Colors";

type AvatarProps = {
   user?: any;
   photoURL?: string;
   size?: number;
   iconSize?: number;
   style?: any;
   isProduct?: boolean;
   defaultIconColor?: string;
   defaultPhoto?: boolean;
};

const UserAvatar: React.FC<AvatarProps> = ({
   user,
   photoURL,
   size = 40,
   iconSize = 20,
   style = {},
   isProduct = false,
   defaultIconColor = globalStyle.light.primary,
   defaultPhoto = false,
}: AvatarProps) => {
   return (
      <>
         {user?.profile?.picture ? (
            <Avatar
               source={{
                  uri: `${Constants.expoConfig?.extra?.apiUrl}/uploads/${user?.profile?.picture}`,
               }}
               style={[
                  {
                     width: size,
                     height: size,
                  },
                  style,
               ]}
            />
         ) : photoURL ? (
            <Avatar
               source={{
                  uri: `${Constants.expoConfig?.extra?.apiUrl}/uploads/${photoURL}`,
               }}
               style={[
                  {
                     width: size,
                     height: size,
                  },
                  style,
               ]}
            />
         ) : (
            <View
               style={[
                  styles.iconProfile,
                  {
                     width: size,
                     height: size,
                     borderWidth: 2,
                     borderColor: defaultIconColor,
                     backgroundColor: "white",
                  },
                  style,
               ]}
            >
               <Feather
                  size={iconSize}
                  color={defaultIconColor}
                  name="user"
               />
            </View>
         )}
      </>
   );
};

const styles = StyleSheet.create({
   avatar: {
      width: 200,
      height: 200,
   },
   iconProfile: {
      borderRadius: 100,
      width: 200,
      height: 200,
      alignItems: "center",
      justifyContent: "center",
   },
});

export default UserAvatar;
