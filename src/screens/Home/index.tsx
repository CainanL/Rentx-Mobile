import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from './styled';
import { Car } from '../../components/car';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';

export function Home() {

    const [cars, setCars] = useState<CarDTO>();
    const [loading, setLoading] = useState(true);

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

    function handleCarDetails() {
        navigation.navigate('CarDetails')
    }

    useEffect(() => {
        async function fetchCar() {
            try {
                const response = await api.get('/cars');
                setCars(response.data)
            } catch (error) {
                console.log(error);
                Alert.alert('Erro ao listar carros');
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [])

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
            </Header>{
                loading
                    ? <Load />
                    : <CarList
                        data={cars}
                        key={item => String(item.id)}
                        renderItem={({ item }) =>
                            <Car data={item}
                                onPress={handleCarDetails}
                            />}
                    />
            }

        </Container>
    )
}