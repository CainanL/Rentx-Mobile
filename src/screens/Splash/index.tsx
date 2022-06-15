import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button, Dimensions, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    interpolate, //
    Extrapolate,
    runOnJS//para falar que a aplicação tem que voltar para a trhead do js
} from "react-native-reanimated";

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from "./styles";

export function Splash() {

    const splashAnimation = useSharedValue(0);//definir valor inicial
    
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                splashAnimation.value,//valor
                [0, 50],//etapas da animação
                [1, 0]//valores da opacidade nos periodos acima
            ),
            transform: [
                {
                    translateX: interpolate(//fazer ele se mover no exio x
                        splashAnimation.value,
                        [0, 50],//valor dos frames
                        [0, -50]//valor da movimentação
                    )
                }
            ]
        };
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                splashAnimation.value,
                [0, 25, 50],
                [0, .3, 1],
                Extrapolate.CLAMP//impede que o limete seja extrapolado
            ),
            transform: [
                {
                    translateX: interpolate(
                        splashAnimation.value,
                        [0, 50],
                        [-500, 0],
                        Extrapolate.CLAMP
                    )
                }
            ]
        };
    });

    function startApp() {
        navigation.navigate('Home');
    }

    useEffect(() => {
        splashAnimation.value = withTiming(
            50, //até que número a animação vai
            { duration: 1000 }, //duração da animação
            () => { //função que é execultada quando a animação acaba
                'worklet';//pequena fatia de código para redirecionar o código para a trhead
                runOnJS(startApp)()
            }
        )
    }, [])

    return (
        <Container>
            <Animated.View style={[brandStyle, { position: 'absolute' }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    );
};