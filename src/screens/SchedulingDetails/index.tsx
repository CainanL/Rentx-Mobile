import React, { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { useTheme } from "styled-components";

import { getAccessory } from '../../utils/getAccessoryIcons';

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
import { CarDTO } from "../../dtos/CarDTO";
import { format } from "date-fns/esm";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { TotalCars } from "../Home/styled";
import { api } from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
    car: CarDTO;
    dates: string[];
};

interface RentalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails() {

    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    const [loading, setLoading] = useState(false);
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
    const netInfo = useNetInfo();

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentTotal = Number(dates.length * car.price);

    const theme = useTheme();

    async function handleConfirmRental() {

        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates
        ];

        await api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyy')
        })

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        }).then(() =>
            navigation.navigate('Confirmation', {
                nextScreenRoute: 'Home',
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a concecionaria da Rentx\npara pegar seu automovel.`
            })
        )
            .catch(() => {
                Alert.alert('Não foi possível confirmar o agendamento');
                setLoading(false);
            })



    };

    function handleBack() {
        navigation.goBack();
    };

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyy')
        })
    }, [])

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
            <Header>
                <BackButton onPress={handleBack} />

            </Header>
            <CarImages>
                <ImageSlider imagesUrl={
                    !!carUpdated.photos ?
                        carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                } />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
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
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(24)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>até</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </ReantalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>


            <Footer>
                <Button
                    title="Alugar agora"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
};







