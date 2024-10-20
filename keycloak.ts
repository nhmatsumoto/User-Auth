import Keycloak from "keycloak-js";

const initOptions = {
    url: 'http://localhost:8080/',
    realm: 'master',
    clientId: 'user-auth',
};

const kc = new Keycloak(initOptions);

export default kc;