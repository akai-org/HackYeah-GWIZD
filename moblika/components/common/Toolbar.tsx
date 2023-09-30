import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import globalStyle from '../../constants/Colors';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import useSWR from 'swr';
import {
   Icon,
   IndexPath,
   MenuItem,
   OverflowMenu,
   Text,
   TopNavigation,
   TopNavigationAction,
   TopNavigationActionElement,
   TopNavigationProps,
} from '@ui-kitten/components';

import { useTranslation } from 'react-i18next';
import { useAuthState } from '../../contexts/AuthContext';
import CustomButton from './CustomButton';
import UserAvatar from './UserAvatar';

export interface ToolbarProps extends TopNavigationProps {
   title?: string;
   home?: boolean;
   transparent?: boolean;
   showLoginButton?: boolean;
   menu?: () => React.ReactElement;
   onProfilePress?: () => void;
   shouldBackToHome?: boolean;
}

export const Toolbar = (props: ToolbarProps): TopNavigationActionElement => {
   const {
      title = '',
      home = false,
      menu,
      transparent,
      showLoginButton = true,
      onProfilePress,
      shouldBackToHome = false,
      ...topNavigationProps
   } = props;
   const [menuVisible, setMenuVisible] = React.useState(false);
   const insets: EdgeInsets = useSafeAreaInsets();
   const navigation = useNavigation();
   const { t } = useTranslation();

   const {
      signOut,
      state: { authToken },
   } = useAuthState();

   const {
      data: meData,
      error: meDataError,
      mutate: refreshMe,
      isValidating: meDataLoading,
   } = useSWR('/auth/me');

   useEffect(() => {
      if (authToken) refreshMe();
   }, [authToken]);

   const onMenuSelect = (index: IndexPath) => {
      setMenuVisible(false);
   };

   const onMenuActionPress = () => {
      setMenuVisible(!menuVisible);
   };

   const renderMenuAnchorAction = (): TopNavigationActionElement => (
      <TopNavigationAction
         onPress={onMenuActionPress}
         icon={() => (
            <View style={styles.menuButtonContainer}>
               <UserAvatar user={meData} />
            </View>
         )}
      />
   );

   const renderMenuAction = (): TopNavigationActionElement => (
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
         {(!meData || !authToken) && showLoginButton && (
            <CustomButton
               size="small"
               style={styles.button}
               textStyle={{ color: '#fff' }}
               onPress={() => {
                  navigation.navigate('Login');
               }}
               loading={
                  authToken ? (!meData && !meDataError) || meDataLoading : false
               }
            >
               {t('logIn')}
            </CustomButton>
         )}
         {authToken && !meDataError && meData && (
            <OverflowMenu
               visible={menuVisible}
               anchor={renderMenuAnchorAction}
               placement="bottom end"
               onSelect={onMenuSelect}
               onBackdropPress={onMenuActionPress}
               showsVerticalScrollIndicator={true}
               style={{ maxHeight: 0 }}
            >
               <MenuItem
                  title={t('settings')}
                  onPress={() => navigation.navigate('ProfileSettings')}
                  accessoryLeft={
                     <Feather name="settings" size={20} color="#e0e0de" />
                  }
               />
               <MenuItem
                  title={t('logOut')}
                  accessoryLeft={
                     <Feather name="log-out" size={20} color="#e0e0de" />
                  }
                  onPress={() => {
                     signOut();
                     refreshMe();
                  }}
               />
            </OverflowMenu>
         )}
      </View>
   );

   const BackIcon = (props: { name: string; color: string; }) => (
      <View style={styles.icon}>
         <Icon style={{ width: 20, height: 20, color: '#FFF' }} {...props} />
      </View>
   );

   const renderBackAction = (): TopNavigationActionElement => (
      <TopNavigationAction
         onPress={shouldBackToHome ? () => navigation.navigate('Home') : () => navigation.goBack() }
         icon={() =>
            home ? <></> : <BackIcon color="#FFFFFF" name="arrow-left" />
         }
      />
   );

   return (
      <View
         style={{
            backgroundColor: transparent
               ? 'transparent'
               : globalStyle.light.primary,
            zIndex: 100,
            width: '100%',
            borderTopWidth: insets.top,
         }}
      >
         <StatusBar style="light" />

         <TopNavigation
            style={styles.toolbar}
            appearance="control"
            {...topNavigationProps}
            accessoryLeft={home ? undefined : renderBackAction}
            accessoryRight={renderMenuAction}
            title={() => (
               <Text
                  adjustsFontSizeToFit
                  category="heading-medium"
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  style={styles.title}
               >
                  {title}
               </Text>
            )}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   toolbar: {
      paddingHorizontal: 0,
      paddingRight: 5,
   },
   title: {
      color: '#FFFFFF',
      textTransform: 'uppercase',
      fontSize: 14,
      paddingRight: 10,
      marginLeft: 10,
   },
   icon: {
      paddingLeft: 5,
      paddingRight: 15,
      paddingVertical: 10,
   },
   button: {
      backgroundColor: globalStyle.light.primary,
      borderColor: 'white',
      marginRight: 20,
   },
   menuButton: {
      width: 20,
      height: 20,
      color: '#FFF',
   },
   menuButtonContainer: {
      marginLeft: 2.5,
      alignItems: 'center',
      justifyContent: 'center',
   },
   menu: {
      top: '100%',
      marginTop: -4,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   avatar: {
      marginRight: 10,
   },
   subtitle: {
      color: '#FFFFFF',
      opacity: 0.5,
      fontSize: 12,
   },
});
