import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";
import jwt_decode from "jwt-decode";
import { useSnackbar } from "notistack";
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUser = AmazonCognitoIdentity.CognitoUser;
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;

const userPoolId = process.env.NEXT_PUBLIC_USER_POOL_ID;
const userPoolClient = process.env.NEXT_PUBLIC_USER_POOL_CLIENT;
const poolData = {
  UserPoolId: userPoolId,
  ClientId: userPoolClient,
};

const userPool = new CognitoUserPool(poolData);

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const handleNotify = (msg) => {
    enqueueSnackbar(msg, { preventDuplicate: true });
  };

  const login = (emailAddress, password) => {
    handleNotify("Logging in...");
    setLoading(true);
    const authenticationData = {
      Username: emailAddress,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: emailAddress,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        handleNotify("Login successful.");
        console.log("Login success results: ", result);
        console.log("ID Token: ", result.getAccessToken().getJwtToken());
        const idTokenDecoded = jwt_decode(
          result.getAccessToken().getJwtToken()
        );
        const token = idTokenDecoded;
        console.log("Decoded token: ", idTokenDecoded);
        setAuthenticated(true);
        setUser(idTokenDecoded.username);

        setLoading(false);
        setSuccessMessage("You are logged in");
        setCookie(null, "token", result.getAccessToken().getJwtToken(), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/dashboard");
      },
      onFailure: (error) => {
        handleNotify("Login failed.");
        console.log("Login error: ", error);
        setAuthenticated(false);
        setUser(null);
        setLoading(false);
        setErrorMessage(error.message);
        destroyCookie(null, "token");
      },
    });
  };

  const checkSession = () => {
    console.log("Checking session");
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();
    // console.log("cognitoUser is", cognitoUser);
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err.message || JSON.stringify(err));
          return;
        }
        if (session.isValid()) {
          cognitoUser.getUserAttributes((error, result) => {
            if (error) {
              return error;
            }
            const profile = {};
            // console.log("This is the result", result);
            for (let i = 0; i < result.length; i += 1) {
              const name = result[i].getName();
              const value = result[i].getValue();
              profile[name] = value;
            }
            // console.log("This is the profile ", profile);

            setUser(profile);
            setAuthenticated(true);
            console.log("This is the profile ", profile);
            return profile;
          });
        }
        setUser(null);
      });
    }
    if (cognitoUser == null) {
      setUser(null);
    }
    setLoading(false);
    return authenticated;
  };

  const logout = () => {
    destroyCookie(null, "token");
    handleNotify("Signing out...");

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.signOut();
    }

    router.push("/dashboard/signin");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        authenticated,
        successMessage,
        errorMessage,
        login,
        logout,
        setLoading,
        checkSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
