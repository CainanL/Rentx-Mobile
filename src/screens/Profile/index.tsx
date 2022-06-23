import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Feather } from '@expo/vector-icons';
import { BackButton } from "../../components/BackButton";
import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section,
} from "./styled";
import { Input } from "../../components/Input";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import {
    useBottomTabBarHeight//para capturar a altura do tabBar
} from '@react-navigation/bottom-tabs'
import * as ImagePicker from 'expo-image-picker';
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";
import { database } from "../../database";
import { User as ModelUser } from "../../database/models/User";

export function Profile() {
    const { user, signOut } = useAuth();

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);
    

    const theme = useTheme();

    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    };

    function handleSignOut() {
    };

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected);
    };

    async function handleAvatarSelect() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if (result.cancelled) {
            return;
        };

        if (result.uri) {
            setAvatar(result.uri);
        };
    };

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={theme.colors.shape}
                                onPress={handleBack}
                            />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={signOut}>
                                <Feather
                                    name="power" size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                           {!!avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={handleAvatarSelect}>
                                <Feather
                                    name="camera"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dado
                                </OptionTitle>
                            </Option>
                            <Option active={option === 'passwordEdit'}>
                                <OptionTitle
                                    active={option === 'passwordEdit'}
                                    onPress={() => handleOptionChange('passwordEdit')}
                                >
                                    Trocar senha
                                </OptionTitle>
                            </Option>
                        </Options>
                        {
                            option == 'dataEdit' ?
                                <Section>
                                    <Input
                                        iconName="user"
                                        placeholder="Nome"
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                        onChangeText={setName}
                                    />
                                    <Input
                                        iconName="mail"
                                        editable={false}
                                        autoCorrect={false}
                                        defaultValue={user.email}
                                    />
                                    <Input
                                        iconName="credit-card"
                                        placeholder="CNH"
                                        keyboardType="numeric"
                                        defaultValue={user.driver_license}
                                        onChangeText={setDriverLicense}
                                    />
                                </Section>

                                : <Section>
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Senha atual"
                                    />
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Nova senha"
                                    />
                                    <PasswordInput
                                        iconName="lock"
                                        placeholder="Repetir senha"
                                    />
                                </Section>
                        }

                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};