import React from "react";
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { useTheme } from "styled-components";

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    ReantalPeriod,
    CalendarIcon,
    DateInfo,
    DateValue,
    DateTitle,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceTotal,
    RentalPriceQuota,
    RentalPriceDetails
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";

export function SchedulingDetails() {

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const theme = useTheme();

    function handleConfirmRental(){
        navigation.navigate('SchedulingComplete')
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />

            </Header>
            <CarImages>
                <ImageSlider imagesUrl={['https://img1.gratispng.com/20171221/exw/audi-png-picture-5a3be6cf5a1238.6366876115138751513689.jpg']} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>
                <Accessories>
                    <Accessory name="380Km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800 HP" icon={forceSvg} />
                    <Accessory name="Gasolina" icon={gasolineSvg} />
                    <Accessory name="Auto" icon={exchangeSvg} />
                    <Accessory name="2 Pessoas" icon={peopleSvg} />
                </Accessories>

                <ReantalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(24)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>
                </ReantalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>


            <Footer>
                <Button
                    title="Alugar agora"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
};







