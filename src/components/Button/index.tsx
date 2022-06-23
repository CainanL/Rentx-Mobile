import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Load } from '../Load';

import {
    Container,
    Title
} from './styles';

interface Props extends RectButtonProps {
    title: string;
    color?: string;
    loading?: boolean;
    light?: boolean;
}

export function Button({
    title,
    color,
    onPress,
    loading = false,
    enabled = true,
    light = false,
    ...rest
}: Props) {
    const theme = useTheme();
    return (
        <Button
            color={color ? color : theme.colors.main}
            onPress={onPress}
            enabled={enabled}
            style={{ opacity: (enabled === false || loading === true) ? 0.5 : 1 }}
            {...rest}
        >
            {
                loading ? <ActivityIndicator /> :
                    <Title light={light}>{title}</Title>
            }


        </Button>
    )
}




