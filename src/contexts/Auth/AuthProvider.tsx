import { useContext, useState, ReactNode } from 'react'
import { AuthContext } from './AuthContext';
import { User } from '../../types/User';
import Keycloak from 'keycloak-js';

export const AuthProvider = ({children} : {children: ReactNode }) => {
    
    const initOptions = {
        url: 'http://localhost:8080/',
        realm: 'master',
        clientId: 'my-react-app',
    };

    const kc = new Keycloak(initOptions);

    const [user, setUser] = useState<User | null>(null);
  
    const signin = async () => {

        try {
            const authenticated = await kc.init({ 
                onLoad: 'login-required',
                checkLoginIframe: true,
                pkceMethod: 'S256' 
            });

            if(authenticated){
                return true;
            }else {
                return false;
            }

        }catch(error){
            console.log(error);
        };
    }

    const signout = () => {

        setUser(null);

        kc.logout(
             // {
            //     //URL base da applicação react;
            //     redirectUri: ''
            // }
        );
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {

    const context = useContext(AuthContext);
    
    if (!context) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
};