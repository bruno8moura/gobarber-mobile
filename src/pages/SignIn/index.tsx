import React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    View,
    ScrollView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
    <>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <Container>
                    <Image source={logoImg} />
                    <View>
                        <Title>Faça seu logon</Title>
                    </View>
                    <Input name="email" icon="mail" placeholder="E-mail" />
                    <Input name="password" icon="lock" placeholder="Senha" />
                    <Button
                        onPress={() => {
                            console.log('button pressed');
                        }}
                    >
                        Entrar
                    </Button>

                    <ForgotPassword
                        onPress={() => {
                            console.log('link clicked');
                        }}
                    >
                        <ForgotPasswordText>
                            Esqueci minha senha
                        </ForgotPasswordText>
                    </ForgotPassword>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>

        <CreateAccountButton
            onPress={() => {
                console.log('Create account button pressed');
            }}
        >
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
    </>
);
export default SignIn;
