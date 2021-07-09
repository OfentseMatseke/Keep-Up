const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export default function confirmRegistration(username, code, success) {
  const poolData = {
    UserPoolId: process.env.cognitoPoolId,
    ClientId: process.env.cognitoAppClientId,
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      console.log(err.message || JSON.stringify(err));
      return;
    }
    console.log(`call result: ${result}`);
    success(result);
  });
}
