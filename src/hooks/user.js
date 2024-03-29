import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { tokenKey } from '../configuration/constants'; 
import { toastMessage } from '../utils/toastMessage';
import { inProduction } from '../configuration/constants';

export const UserContext = createContext();

function UserProvider({ children }) {

    const data = inProduction ?  undefined :
{
    nome: 'rian',
    email: 'riansm100@gmail.com',
    userID: '5',
    tipoUsuario: 1,
    pfp: "f9d20e32d01fe870da44cc00067b6dbf",
    token:null,
    expoToken:"ExponentPushToken[A5KQQwEGE2OfSFUhG7yc6N]"
}
    const [user, setUser] = useState(data ? data : null);
    
    async function modifyUser(value){
        setUser(value)
    }

    async function updateExpoToken(data, typeTeacher){
        let response;
        try {
            if (typeTeacher){
                response = await api.patch(`/user/update/expotoken/professor`, { ...data });
            } else {
                response = await api.patch(`/user/update/expotoken/aluno`,  { ...data });
            }
            
        } catch (error) {  
            console.log("ERROR add coiso lá", error);
        }
    }

    async function forgotPassword(mail, typeTeacher){
        let response;
        console.log("mail", mail);

        try {
            if (typeTeacher){
                response = await api.get(`/email/recuperarProfessor/${mail}`);
            } else {
                response = await api.get(`/email/recuperarAluno/${mail}`);
            }
            
            if (!response?.data.status) { 
                toastMessage(false, response?.data.mensagem);
                return
            }
        } catch (error) {  
            console.log("ERROR", error);
            toastMessage(false, "Erro de conexão!");
        }
    }

    async function singIn({mail, pass}, typeTeacher){
        let response;
        try {
            if (typeTeacher){
                response = await api.post('/user/login/professor', {email:mail, senha:pass});
            } else {
                response = await api.post('/user/login/aluno', {email:mail, senha:pass});
            }
            if (!response?.data.status) { 
                toastMessage(false, response?.data.mensagem);
                return
            }
            
            await AsyncStorage.setItem(tokenKey, JSON.stringify(response?.data.token));

            modifyUser({
                nome: response?.data.nome,
                email: response?.data.email,
                userID: response?.data.userID,
                tipoUsuario: response?.data.tipoUsuario,
                pfp: response?.data.pfp,
                token: response?.data.tokenNotification || '',
                expoToken: response?.data.expotoken || '',
            });
            //toastMessage(true, "Login efetuado com sucesso");
        } catch (error) {  
            console.log("ERROR", error);
            toastMessage(false, "Erro de conexão!");
        }
    }
    async function logOut() {
        setUser(null);
        await AsyncStorage.removeItem(tokenKey);
    }

    return (
        <UserContext.Provider value={{
            singIn,
            logOut,
            user,
            modifyUser,
            forgotPassword,
            updateExpoToken
        }}>

            {children}
        </UserContext.Provider>
    )
}

function useUser() {
    const context = useContext(UserContext);
    return context;
}

export { useUser, UserProvider }

