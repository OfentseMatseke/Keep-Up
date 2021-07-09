const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export default function Register(email, password, success) {
  const poolData = {
    UserPoolId: process.env.cognitoPoolId,
    ClientId: process.env.cognitoAppClientId,
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const attributeList = [];
  const dataEmail = {
    Name: "email",
    Value: email,
  };

  const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  );

  attributeList.push(attributeEmail);

  userPool.signUp(email, password, attributeList, null, (err, result) => {
    if (err) {
      console.log(err.message || JSON.stringify(err));
      return;
    }
    const cognitoUser = result.user;
    console.log(`user name is ${cognitoUser.getUsername()}`);
    success(result.user);
  });
}
