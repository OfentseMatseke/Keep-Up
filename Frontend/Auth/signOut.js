const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export default function auth() {
  const poolData = {
    UserPoolId: process.env.cognitoPoolId,
    ClientId: process.env.cognitoAppClientId,
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.signOut();
  }
}
