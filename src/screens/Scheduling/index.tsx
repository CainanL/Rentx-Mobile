import React from "react";
import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

import ArrowSvg from '../../assets/arrow.svg';

import {
    Header,
    Title,
    Container,
    RentPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer
} from './styles';
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

export function Scheduling() {

    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleConfirmRental(){
        navigation.navigate('SchedulingDetails')
    }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor='transparent'
                />
                <BackButton
                    color={theme.colors.shape}
                    onPress={() => { }}
                />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RentPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>
                </RentPeriod>
            </Header>

            <Content>
                <Calendar/>
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    )
}





