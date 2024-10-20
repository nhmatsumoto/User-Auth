import { createContext } from "react";

import { User } from "../../types/User";

export type AuthContextType = {
    user: User | null;
    signin: () => Promise<boolean>;
    sigout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = () => {

    return ; 
}
