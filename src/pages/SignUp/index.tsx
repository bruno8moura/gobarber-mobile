import React, { useRef, useCallback } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    View,
    ScrollView,
    Platform,
    TextInput,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../util/getValidationErrors';

interface SignUpFormData {
    email: string;
    password: string;
    nome: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();
    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um email válido'),
                password: Yup.string()
                    .required('Senha obrigatória')
                    .min(6, 'No mínimo 6 caracteres'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            /* await api.post('/users', data);

                history.push('/');

                addToast({
                    type: 'success',
                    title: 'Cadastro realizado!',
                    description: 'Você já pode fazer seu logon no GoBarber!',
                }); */
            Alert.alert(
                'Cadastro realizado!',
                'Você já pode fazer seu logon no GoBarber!',
            );
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }

            Alert.alert(
                'Erro no cadastro',
                'Ocorreu um erro ao fazer o cadastro, cheque os dados.',
            );

            /* addToast({
                    type: 'error',
                    title: 'Erro no cadastro',
                    description:
                        'Ocorreu um erro ao fazer o cadastro, cheque os dados.',
                }); */
        }
    }, []);

    return (
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
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                            <Button
                                onPress={() => {
                                    formRef.current?.submitForm();
                                }}
                            >
                                Cadastrar
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSignIn
                onPress={() => {
                    navigation.navigate('SignIn');
                }}
            >
                <Icon name="arrow-left" size={20} color="#FFFFFF" />
                <BackToSignInText>Voltar para logon</BackToSignInText>
            </BackToSignIn>
        </>
    );
};
export default SignUp;
