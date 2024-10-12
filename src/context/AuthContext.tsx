import React, { createContext, useState, ReactNode, useEffect } from "react";
import KeycloakJS from 'keycloak-js';

interface AuthContextType {
    keycloak: any | null;
    authenticated: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider : React.FC<AuthProviderProps> = ({children}) => {

    const [keycloak, setKeycloak] = useState<any | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {

    const Keycloak = new KeycloakJS({
        url: 'http://localhost:8080/',
        realm: 'master',
        clientId: 'my-react-app',
    });

    Keycloak
        .init({ 
            onLoad: 'login-required',
            checkLoginIframe: true,
            pkceMethod: 'S256' 
        })
        .then((auth) => {

            setKeycloak(Keycloak);
            setAuthenticated(authenticated);
            

            if(!auth){
                window.location.reload();
            }else {
                console.log(JSON.stringify(Keycloak.authenticated));
            }
        })
        .catch((err) => {
            console.error('Keycloak initialization failed', err);
           
      });
    }, []);

    return (
        <AuthContext.Provider value={{ keycloak, authenticated }}>
            {children}
        </AuthContext.Provider>
    ); 
}
