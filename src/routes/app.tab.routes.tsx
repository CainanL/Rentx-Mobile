import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars/Index";
import { Profile } from "../screens/Profile";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { AppStackRoutes } from "./app.stack.routes";

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import { useTheme } from "styled-components";
import { Platform } from "react-native";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.main,
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingVertical: Platform.OS == 'ios' ? 20 : 0,
                    height: 78,
                    backgroundColor: theme.colors.background_primary
                }

            }}

            initialRouteName="Home"
        >
            <Screen
                name='Home'
                component={AppStackRoutes}
                options={{
                    tabBarIcon: (({ color }) => (
                        <HomeSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
            <Screen
                name='MyCars'
                component={MyCars}
                options={{
                    tabBarIcon: (({ color }) => (
                        <CarSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
            <Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: (({ color }) => (
                        <PeopleSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
        </Navigator>
    )
}



