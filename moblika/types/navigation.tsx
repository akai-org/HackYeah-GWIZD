import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
   CompositeScreenProps,
   NavigatorScreenParams,
} from '@react-navigation/native';

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList { }
   }
}

export type RootStackParamList = {
   Root: NavigatorScreenParams<RootTabParamList> | undefined;
   Modal: undefined;
   NotFound: undefined;
   Searching: { userAnswers: number[][]; };
   SearchingIntro: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
   NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
   Home: undefined;
   Restaurant: { id: string; };
   Info: undefined;
   Login: undefined;
   Register: undefined;
   Images: any;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
   CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList, Screen>,
      NativeStackScreenProps<RootStackParamList>
   >;
