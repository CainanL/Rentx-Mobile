import React, { useState } from "react";
import { Feather } from '@expo/vector-icons';
import {
    Container,
    IconContainer,
    InputText
} from "./styles";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
};

export function PasswordInput({ iconName, value, ...rest }: Props) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleIsInputFocus() {
        setIsFocused(true);
    };

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    };

    function handlePasswordVisibilityChange() {
        setIsPasswordVisible(previous => !previous);
    };

    console.log(isFilled, isFocused)

    const theme = useTheme();
    return (
        <Container>
            <IconContainer  isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <InputText
                secureTextEntry={isPasswordVisible}
                onFocus={handleIsInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                autoCorrect={false}
                {...rest}
            />
            <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <IconContainer
                     isFocused={isFocused}
                >
                    <Feather
                        name={isPasswordVisible ? "eye" : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    )
}



