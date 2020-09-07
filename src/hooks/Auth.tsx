import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
    token: string;
    user: User;
}

interface SigningCredentials {
    email: string;
    password: string;
}

interface User {
    name: string;
    email: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SigningCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const storageTokenKey = '@GoBarber:token';
    const storageUserKey = '@GoBarber:user';
    const [data, setData] = useState<AuthState>({} as AuthState);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [[token], [user]] = await AsyncStorage.multiGet([
                storageTokenKey,
                storageUserKey,
            ]);

            if (token && user) {
                setData({ token, user: JSON.parse(user) });
            }
        }

        loadStorageData();
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        await AsyncStorage.multiSet([
            [storageTokenKey, token],
            [storageUserKey, JSON.stringify(user)],
        ]);

        setData({ token, user });
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove([storageUserKey, storageTokenKey]);
        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
