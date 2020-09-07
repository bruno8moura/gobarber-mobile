import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import Button from '../../components/Button';

const Dashboard: React.FC = () => {
    const { signOut } = useAuth();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
            }}
        >
            <Button
                color="#5636d3"
                onPress={signOut}
                style={{ backgroundColor: '#312e38' }}
            >
                Sair
            </Button>
        </View>
    );
};

export default Dashboard;
