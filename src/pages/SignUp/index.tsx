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

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
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
                        <Title>Crie sua conta</Title>
                    </View>
                    <Input name="name" icon="user" placeholder="Nome" />
                    <Input name="email" icon="mail" placeholder="E-mail" />
                    <Input name="password" icon="lock" placeholder="Senha" />
                    <Button
                        onPress={() => {
                            console.log('button pressed');
                        }}
                    >
                        Cadastrar
                    </Button>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>

        <BackToSignIn
            onPress={() => {
                console.log('Create account button pressed');
            }}
        >
            <Icon name="arrow-left" size={20} color="#FFFFFF" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
    </>
);
export default SignUp;
