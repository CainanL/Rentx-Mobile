import React from "react";

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage
} from './styles';

import GasolineSvg from '../../assets/gasoline.svg';
import { RectButtonProps } from "react-native-gesture-handler";
import { Car as ModelCar } from "../../database/models/Car";
import { getAccessory } from "../../utils/getAccessoryIcons";
import { useNetInfo } from "@react-native-community/netinfo";

interface Props extends RectButtonProps {
    data: ModelCar;
}
export function Car({ data, ...rest }: Props) {
    const netInfo = useNetInfo();
    const MotorIcon = getAccessory(data.fuel_type);

    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data?.period}</Period>
                        <Price>R$ {netInfo.isConnected === true ? data?.price : '...'}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon />
                    </Type>
                </About>
            </Details>

            <CarImage
                source={{ uri: data.thumbnail }}
                resizeMode="contain"
            />
        </Container>
    )
}





