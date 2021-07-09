const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export default async function checkSession(user) {
  const poolData = {
    UserPoolId: process.env.cognitoPoolId,
    ClientId: process.env.cognitoAppClientId,
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();
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
          for (let i = 0; i < result.length; i += 1) {
            const name = result[i].getName();
            const value = result[i].getValue();
            profile[name] = value;
          }
          user(profile);
          return profile;
        });
      }
      user(null);
    });
  }
  if (cognitoUser == null) {
    user(null);
  }
}
