import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from './styled';
import { Car } from '../../components/car';

export function Home() {

    const carData = {
        brand: "Audi",
        name: "RS 5 Coupé",
        rent: {
            period: "Ao dia",
            price: 120,
        },
        thumbnail: "https://img1.gratispng.com/20171221/exw/audi-png-picture-5a3be6cf5a1238.6366876115138751513689.jpg"
    }

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleCarDetails(){
        navigation.navigate('CarDetails')
    }

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'//a status bar fica transparente
                translucent //a barra fica por cima e não desconta
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            <CarList
                data={[1, 2, 3, 4, 5, 6]}
                key={item => String(item)}
                renderItem={({ item }) => 
                <Car data={carData}
                onPress={handleCarDetails} 
                />}
            />
        </Container>
    )
}