import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Load } from '../Load';

import {
    Container,
    Title
} from './styles';

interface Props {
    title: string;
    color?: string;
    enabled?: boolean;
    onPress: () => void;
    loading?: boolean;
}

export function Button({
    title,
    color,
    onPress,
    loading = false,
    enabled = true
}: Props) {
    const theme = useTheme();
    return (
        <Container
            color={color ? color : theme.colors.main}
            onPress={onPress}
            enabled={enabled}
            style={{ opacity: (enabled === false || loading === true) ? 0.5 : 1 }}
        >
            {
                loading ? <Load /> :
                    <Title>{title}</Title>
            }


        </Container>
    )
}




