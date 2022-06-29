import React, { useState, useEffect } from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

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
    Footer,
    OffilineInfo
} from "./styles";
import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessory } from "../../utils/getAccessoryIcons";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StyleSheet } from "react-native";
import { Car as ModelCar } from '../../database/models/Car';
import { api } from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
    car: ModelCar;
};

export function CarDetails() {

    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
    const netInfo = useNetInfo();

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const theme = useTheme();
    const { car } = route.params as Params;


    const scrollY = useSharedValue(0);

    const scrollHandle = useAnimatedScrollHandler(event => {//função que devolve o evento de scroll
        scrollY.value = event.contentOffset.y;
        console.log(event.contentOffset.y);
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car })
    };

    function handleBack() {
        navigation.goBack();
    };

    useEffect(() => {
        async function fetchCarUpdate() {
            const response = await api.get(`/cars/${car.id}`);
            setCarUpdated(response.data);
        };
        if (netInfo.isConnected === true) {
            fetchCarUpdate();
        };
    }, [netInfo.isConnected]);

    return (
        <Container>

            <Animated.View
                style={[
                    headerStyleAnimation,
                    style.header,
                    { backgroundColor: theme.colors.background_secondary }
                ]}
            >
                <Header>
                    <BackButton onPress={handleBack} />

                </Header>
                <Animated.View style={[sliderCarsStyleAnimation]}>
                    <CarImages>
                        <ImageSlider imagesUrl={
                            !!carUpdated.photos ?
                                carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                        } />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandle}
                scrollEventThrottle={16}//quantos frames por segundo na hora do scroll -> o 16 é porque 1000/16 = 60 frams por segundo
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {netInfo.isConnected == true ? car.price : '...'}</Price>
                    </Rent>
                </Details>
                {
                    carUpdated.accessories &&
                    <Accessories>
                        {
                            carUpdated.accessories.map(accessory => (
                                <Accessory
                                    key={accessory.type}
                                    name={accessory.name}
                                    icon={getAccessory(accessory.type)}
                                />
                            ))
                        }
                    </Accessories>
                }


                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button
                    title="Escolher período do aluguel"
                    onPress={handleConfirmRental}
                    enabled={netInfo.isConnected === true}
                />

                {
                    netInfo.isConnected === false &&
                    <OffilineInfo>
                        Conecte-se a Internet para ver mais detalhes e agendar seu carro!
                    </OffilineInfo>
                }
            </Footer>
        </Container>
    );
};

const style = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1//para sempre ficar na frente
    },
    back: {
        marginTop: 24
    }
})





