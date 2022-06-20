import React, { useState } from "react";
import { Feather } from '@expo/vector-icons';
import {
    Container,
    IconContainer,
    InputText
} from "./styles";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
};

export function Input({ iconName, value, ...rest }: Props) {

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleIsInputFocus() {
        setIsFocused(true);
    };

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    };


    const theme = useTheme();

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <InputText
                onFocus={handleIsInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                {...rest}
            />
        </Container>
    )
}



