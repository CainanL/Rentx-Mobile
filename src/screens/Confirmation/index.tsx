import React from "react";
import { useWindowDimensions } from "react-native";//para pegar as dimensões da tela
//dimensions -> usado em styled components ou outras coisas que não podem usar hooks;
//useWindowDimessions -> usado em todos os locais onde pode ser usado hooks;

import { useNavigation, NavigationProp, ParamListBase, useRoute } from "@react-navigation/native";

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg'

import {
    Container,
    Content,
    Title,
    Message,
    Footer
} from './styles';
import { ConfirmButton } from "../../components/ConfirmButton";
import { StatusBar } from "react-native";

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;
}

export function Confirmation() {

    const route = useRoute();

    const {
        message,
        nextScreenRoute,
        title
    } = route.params as Params;


    const { width } = useWindowDimensions();

    const navigation = useNavigation<NavigationProp<ParamListBase>>()

    function handleConfirm(){
        navigation.navigate(nextScreenRoute)
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={86} height={86}/>
                <Title>{title}</Title>

                <Message>
                    {message}
                </Message>
            </Content>
            <Footer>
                <ConfirmButton 
                title="OK"
                onPress={handleConfirm}
                />
            </Footer>
        </Container>
    );
};