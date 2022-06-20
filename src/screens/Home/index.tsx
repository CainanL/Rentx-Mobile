import React, { useEffect, useState } from 'react';
import {
    Alert,
    StatusBar,
    StyleSheet,
    BackHandler//para fazer modificações nos botões do voltar
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,//para pegar a localização da animação
    withSpring//para lidar com fisica -> efeito elastico
} from 'react-native-reanimated';

import {
    RectButton,
    PanGestureHandler
} from 'react-native-gesture-handler';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)//cria um RectButton animado e joga para dentor da variável.

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    MyCarsButton
} from './styled';
import { Car } from '../../components/car';
import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Ionicons } from '@expo/vector-icons';

export function Home() {

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, context: any) {//quando o usuário clica e começa a arrastar
            context.positionX = positionX.value;
            context.positionY = positionY.value;
        },
        onActive(event, context: any) {//quando o usuário está arrastando o elemento na tela
            positionX.value = context.positionX + event.translationX; //contexto que foi gerado no onStart + valor do evento de tranlationX
            positionY.value = context.positionY + event.translationY;
        },
        onEnd() {//quando o usuário soltou
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    })

    const theme = useTheme();

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

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    };

    function handleOpenMyCars(car: CarDTO) {
        navigation.navigate('MyCars');
    };

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
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true// retorna um true quando clica no backbutton do android, então ele simplesmente não faz nada e não volta para a tela de splash
        })
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
                    {
                        !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>{
                loading
                    ? <LoadAnimation />
                    : <CarList
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <Car data={item}
                                onPress={() => handleCarDetails(item)}
                            />}
                    />
            }

            <PanGestureHandler
                onGestureEvent={onGestureEvent}
            >
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleOpenMyCars}
                        style={[style.button, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons
                            name='ios-car-sport'
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    )
};

const style = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})