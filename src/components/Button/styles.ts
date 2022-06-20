import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { ReactNode } from "react";

interface ButtonProps {
    color: string;
    children: ReactNode
}

interface ButtonTextProps {
    light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
    width: 100%;

    padding: 19px;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => color};
`;

export const Title = styled.Text<ButtonTextProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme, light }) => light ? theme.colors.text: theme.colors.shape}
`;