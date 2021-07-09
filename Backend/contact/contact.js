var aws = require("aws-sdk");
var ses = new aws.SES({ region: "eu-central-1" });

exports.handler = async function (event) {
  const eventBody = JSON.parse(event.body);

  let statusCode = "200";
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,DELETE,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers":
      "access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,Access-Control-Allow-Origin,authorization,content-type",
    "Content-Type": "application/json",
  };
  let body = "";
  try {
    var params = {
      Template: "KeepUp-ContactUs",
      Destination: {
        ToAddresses: ["apfiwaho@gmail.com"],
      },
      Source: "Keep Up <admin@turati.co.za>", // use the SES domain or email verified in your account
      ReplyToAddresses: [eventBody.email],
      TemplateData: JSON.stringify({
        name: eventBody.name,
        subject: "Contact via Keep Up",
        message: eventBody.message,
      }),
    };

    await ses.sendTemplatedEmail(params).promise();
  } catch (error) {
    body = JSON.stringify(error);
    statusCode = "500";
    console.log(error);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
