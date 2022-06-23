import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import { useTheme } from "styled-components";
import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from "./styles";
import { Bullet } from "../../../components/Bullet";
import { PasswordInput } from "../../../components/PasswordInput";
import { Button } from "../../../components/Button";
import { api } from "../../../services/api";

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SignUpSecondStep() {

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const theme = useTheme();

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();

    const { user } = route.params as Params;

    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        if (!password || !password) {
            return Alert.alert('Informe a senha e a confirmação.');
        };

        if (password != password) {
            return Alert.alert('As senhas não são iguais');
        };

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password,
        }).then(()=> {
            navigation.navigate('Confirmation', {
                nextScreenRoute: 'SignIn',
                title: 'Conta criada',
                message: `Agora é só fazer login\ne aproveitar`
            })
        }).catch((err)=> {
            console.log(err)
            Alert.alert('Opa', 'Não foi possivel cadastrar!')
        })

        
    }

    return (
        <KeyboardAvoidingView
            behavior="position"
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton
                            onPress={handleBack}
                        />
                        <Steps>
                            <Bullet active={false} />
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>
                        Crie sua {'\n'}
                        conta
                    </Title>
                    <Subtitle>
                        Faça seu cadastro de {'\n'}
                        forma rápida e fácil
                    </Subtitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir senha"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>

                    <Button
                        title="Cadastrar"
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

