import React, { useEffect, useState } from "react";
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import {
    KeyboardAvoidingView,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import theme from "../../styles/theme";
import { Container, Footer, Form, Header, SubTitle, Title } from "./styles";
import { useAuth } from "../../hooks/auth";
import { database } from "../../database";

export function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { signIn } = useAuth();

    async function handleSignIn() {

        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
                password: Yup.string().required('Senha é obrigatória')
            });
            await schema.validate({ email, password });            
            signIn({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Erro na authenticação', 'Ocorreu um erro ao fazer login, verifique as credenciasi')
            }
        }


    };

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep')
    }

    return (
        <KeyboardAvoidingView /* Para subir a tela quando o teclado for ativado */
            behavior="position"
            enabled
        >{/* tem que tirar o flex: 1; do container para não zoar a tela */}
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}//fecha o teclado
            >{/* Captura um evento de clique sem efeito visual -> vou utilizar para fechar o teclado */}
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <Header>
                        <Title>
                            Estamos{'\n'}
                            quase lá.
                        </Title>
                        <SubTitle>
                            Faça seu login para começar {'\n'}
                            uma experiência incrível.
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />
                        <Button
                            title="Criar conta gratúita"
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            light
                            color={theme.colors.background_secondary}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}