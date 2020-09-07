import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
    children: string;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({ children, color, ...rest }) => (
    <Container {...rest}>
        <ButtonText color={color}>{children}</ButtonText>
    </Container>
);

export default Button;
