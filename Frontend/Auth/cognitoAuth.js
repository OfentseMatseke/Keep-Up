import * as aws from "aws-sdk/global";
import {
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const Region = "eu-central-1";

// Should add this as secrets loaded with environment

class Auth {
  constructor(pool_data) {
    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(pool_data);
  }

  login(username, password, onSuccess, onFailure) {
    console.log("Logging In");
    console.log(this.userPool);

    let AuthenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      { Username: username, Password: password }
    );
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    cognitoUser.authenticateUser(AuthenticationDetails, {
      onSuccess: onSuccess,
      onFailure: onFailure,
    });
  }

  getCognitoUserAttributes() {
    //user must be authenticated otherwise error is thrown
    const cognitoUser = this.userPool.getCurrentUser();
    cognitoUser.getUserAttributes(function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      for (i = 0; i < result.length; i++) {
        // console.log(
        //     'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
        // );
      }
    });
  }

  getUserPool() {
    return this.userPool;
  }

  confirmUser(username, verificationCode, onSuccess, onFailure) {
    // console.log("USER POOL", this.userPool);
    var userData = {
      Username: username,
      Pool: this.userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(
      verificationCode,
      true,
      function (err, result) {
        if (err) {
          onFailure(err);
          return;
        }
        onSuccess();
      }
    );
  }

  resendConfirmationCode(username, onSuccess, onFailure) {
    var userData = {
      Username: username,
      Pool: this.userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        onFailure(error);
        return;
      }
      onSuccess();
      return;
    });
  }

  register(user, password, onSuccess, onFailure) {
    // console.log("Entering Registration Pocess");
    // console.log(onSuccess);
    let attributeList = [];

    let dataFirstName = {
      Name: "name",
      Value: user.firstName,
    };

    let dataLastName = {
      Name: "family_name",
      Value: user.lastName,
    };

    let dataEmail = {
      Name: "email",
      Value: user.emailAddress,
    };

    let dataUserID = {
      Name: "user_id",
      Value: user.userId,
    };

    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
    );
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute(dataFirstName)
    );
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute(dataLastName)
    );
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataUserID));

    // console.log(user.emailAddress);

    this.userPool.signUp(
      user.emailAddress,
      password,
      attributeList,
      null,
      function registrationCallback(err, result) {
        if (!err) {
          onSuccess(result, user);
        } else {
          onFailure(err);
          //   console.log(err.message);
        }
      }
    );
  }

  signOut(username) {
    var userData = {
      Username: username,
      Pool: this.userPool,
    };
    let user = this.userPool.getCurrentUser();
    // console.log(user);
    // cognitoUser.signOut();
    // console.log("SigningOut");
  }

  inititateForgotPasswordSession(
    email,
    onSuccess,
    onFailure,
    inputVerificationCode
  ) {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    // console.log("Forgot Password Session");

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: onSuccess,
      onFailure: onFailure,
      inputVerificationCode: inputVerificationCode,
    });
  }

  changePasswordSession(user, onFailure) {
    const userData = {
      Username: user.email,
      Pool: this.userPool,
    };

    // console.log("Change Password Session");

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmPassword(user.verificationCode, user.newPassword, {
      onSuccess() {
        // console.log("Password confirmed!");
      },
      onFailure: onFailure,
    });
  }
}

export { Auth };
