import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

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
    About,
    Accessories,
    Footer
} from "./styles";
import { Button } from "../../components/Button";

export function CarDetails() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleConfirmRental() {
        navigation.navigate('Scheduling')
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

                <About>
                    Esté é automóvel desportivo. Surgiu do lendário touro de lide indultado
                    na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de celerar.
                </About>
            </Content>

            <Footer>
                <Button
                    title="Escolher período do aluguel"
                    onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
};







