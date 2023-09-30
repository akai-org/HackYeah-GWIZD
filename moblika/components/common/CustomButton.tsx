import React, { ReactElement } from 'react';
import { Button, Text } from '@ui-kitten/components';
import globalStyle from '../../constants/Colors';
import {
   StyleSheet,
   Text as ReactText,
   TextStyle,
   View,
   ActivityIndicator,
   Animated,
   Easing,
} from 'react-native';

interface Props {
   children: ReactElement;
   style?: TextStyle;
   textStyle?: TextStyle;
   loading?: boolean;
   icon?: ReactElement | null;
   iconPlacement?: 'left' | 'right';
   size?: 'small' | 'medium' | 'large';
   variant?: 'filled' | 'outlined' | 'ghost';
   onPress: () => void;
}

const CustomButton = ({
   style = {},
   textStyle = {},
   loading = false,
   icon = null,
   iconPlacement = 'right',
   size = 'medium',
   variant = 'outlined',
   onPress,
   children,
}: Props) => {
   const animatedButtonScale = new Animated.Value(1);

   const onPressIn = () => {
      Animated.timing(animatedButtonScale, {
         toValue: variant === 'ghost' ? 0.95 : 0.97,
         useNativeDriver: true,
         duration: 100,
         easing: Easing.linear,
      }).start();
   };

   const onPressOut = () => {
      Animated.timing(animatedButtonScale, {
         toValue: 1,
         useNativeDriver: true,
         duration: 100,
         easing: Easing.linear,
      }).start();
   };

   const animatedScaleStyle = {
      transform: [{ scale: animatedButtonScale }],
   };

   return (
      <View style={buttonStyles.wrapper}>
         <Button
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => {
               // back to main event loop, allows to finish animation
               setTimeout(() => {
                  onPress();
               }, 0);
            }}
            style={[
               buttonStyles[size],
               buttonStyles[variant],
               animatedScaleStyle,
               style,
            ]}
         >
            {evaProps => (
               <Text {...evaProps}>
                  {loading ? (
                     <ActivityIndicator
                        color={globalStyle.light.primary}
                        size="small"
                     />
                  ) : icon ? (
                     iconPlacement === 'right' ? (
                        <View style={buttonStyles.iconContainer}>
                           <ReactText
                              style={[textStyles[size], textStyles[variant], textStyle]}
                           >
                              {children}
                           </ReactText>
                           {icon}
                        </View>
                     ) : (
                        <View style={buttonStyles.iconContainer}>
                           {icon}
                           <ReactText
                              style={[textStyles[size], textStyles[variant], textStyle]}
                           >
                              {children}
                           </ReactText>
                        </View>
                     )
                  ) : (
                     <ReactText style={[textStyles[size], textStyles[variant], textStyle]}>
                        {children}
                     </ReactText>
                  )}
               </Text>
            )}
         </Button>
      </View>
   );
};

const buttonStyles = StyleSheet.create({
   wrapper: {
      overflow: 'hidden',
      paddingBottom: 3,
   },
   small: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      minHeight: 30,
   },
   medium: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 8,
      minHeight: 36,
   },
   large: {
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 10,
      height: 46,
   },
   filled: {
      alignItems: 'center',
      backgroundColor: globalStyle.light.primaryLight,
      borderWidth: 0,
      // ios
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      // android
      shadowColor: '#171717',
      elevation: 3,
   },
   outlined: {
      backgroundColor: 'transparent',
      borderColor: globalStyle.light.primary,
      borderWidth: 2,
   },
   ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: 0,
   },
   iconContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
   },
});

const textStyles = StyleSheet.create({
   small: {
      fontSize: 14,
      marginHorizontal: 2,
      letterSpacing: 0.3,
   },
   medium: {
      fontSize: 16,
      marginHorizontal: 3,
      letterSpacing: 0.3,
   },
   large: {
      fontSize: 18,
      marginHorizontal: 4,
      letterSpacing: 0.4,
   },
   filled: {
      color: '#fff',
      fontWeight: '600',
   },
   outlined: {
      color: globalStyle.light.primary,
      fontWeight: '700',
   },
   ghost: {
      color: globalStyle.light.primary,
      fontWeight: '700',
   },
});

export default CustomButton;
