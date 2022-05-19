import React, { useState } from "react";
import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";
import { useNavigation, NavigationProp, ParamListBase, useRoute } from "@react-navigation/native";
import { format } from "date-fns";

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
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateInterval, MarkedDateProps } from "../../components/Calendar";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriod{
    startFormatted: string;
    endFormatted: string; 
};

interface Params  {
    car: CarDTO
};

export function Scheduling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const { car } = route.params as Params;
    
    function handleConfirmRental(){
        if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
            Alert.alert('Selecione o intervalo para alugar.');
        }else{
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            })
        };        
    };

    function handleBack(){
        navigation.goBack();
    };

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp){
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];


        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyy')
        })
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
                    onPress={handleBack}
                />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RentPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RentPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    )
}





