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
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessory } from "../../utils/getAccessoryIcons";

interface Props extends RectButtonProps {
    data: CarDTO;
}

export function Car({ data, ...rest }: Props) {
    const MotorIcon = getAccessory(data.fuel_type);
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>R$ {data.rent.price}</Price>
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





