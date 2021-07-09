"use strict";
var querystring = require("querystring");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-central-1",
});
const docClient = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({ region: "eu-central-1" });

const transactionsTable = process.env.DONATIONS_TABLE;
const entityId = "8ac7a4c76facf3c7016fb3142fef0ede";
const peachAPIKey =
  "Bearer OGFjN2E0Yzc2ZmFjZjNjNzAxNmZiMzE0MWU4MjBlZDh8dGs4UTNiM1dZNA=="; //TEST API KEY
const peachHost = "test.oppwa.com"; //TEST API Host

module.exports.createCheckout = (event, callback) => {
  const https = require("https");
  const querystring = require("querystring");
  const {
    emailAddress,
    name,
    amount,
    transactionDate,
    phoneNumber,
    reference,
  } = event.queryStringParameters;

  var date = new Date();
  var merchantTransactionId = date.getTime().toString();

  const request = async () => {
    const path = "/v1/checkouts";
    const data = querystring.stringify({
      entityId: entityId,
      amount,
      currency: "ZAR",
      paymentType: "DB",
      merchantTransactionId,
    });
    const options = {
      port: 443,
      host: peachHost,
      path: path,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": data.length,
        Authorization: peachAPIKey,
      },
    };
    return new Promise((resolve, reject) => {
      const postRequest = https.request(options, function (res) {
        const buf = [];
        res.on("data", (chunk) => {
          buf.push(Buffer.from(chunk));
        });
        res.on("end", () => {
          const jsonString = Buffer.concat(buf).toString("utf8");
          console.log("JsonString ", jsonString);
          try {
            const resp = {
              statusCode: 200,
              headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true,
              },
              body: jsonString,
            };
            resolve(resp);
          } catch (error) {
            reject(error);
          }
        });
      });
      postRequest.on("error", reject);
      postRequest.write(data);
      postRequest.end();
    });
  };

  return request().then(callback).catch(callback);
};

module.exports.recordPayment = (event, context, callback) => {
  const {
    id,
    transactionDate,
    emailAddress,
    name,
    amount,
    phoneNumber,
    reference,
  } = event.queryStringParameters;

  let params = {
    Item: {
      donationId: id,
      emailAddress: emailAddress,
      name: name,
      amount: amount,
      transactionDate: transactionDate,
      phoneNumber: phoneNumber,
      reference: reference,
    },
    TableName: transactionsTable,
  };

  request(id)
    .then((response) => {
      if (response.body.result.code === "000.100.110") {
        params.Item.merchantTransactionId = response.body.merchantTransactionId;
        console.log(response);
        docClient.put(params, function (err, data) {
          if (err) {
            console.log("failed put");
            const response = {
              statusCode: 500,
              headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true,
              },
              body: JSON.stringify({
                message: "Transaction not logged.",
                error: err,
              }),
            };
            callback(null, response);
          } else {
            console.log("complete put");
            var params = {
              Template: "KeepUp-ThankYou",
              Destination: {
                ToAddresses: [emailAddress],
              },
              Source: "apfiwaho@turati.co.za", // use the SES domain or email verified in your account
              TemplateData: JSON.stringify({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                subject: "Thank you",
              }),
            };

            ses.sendTemplatedEmail(params, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(200);
              }
            });
            const resp = {
              statusCode: 200,
              headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true,
              },
              body: JSON.stringify({
                message: "Transaction logged.",
                res: response,
              }),
            };
            callback(null, resp);
          }
        });
      } else {
        const resp = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            code: 500,
            message: "Transaction failed.",
            res: response,
          }),
        };
        callback(null, resp);
      }
    })
    .catch(console.error);
  // return response;
};

const request = async (id) => {
  var path = `/v1/checkouts/${id}/payment`;
  path += "?entityId=8ac7a4c76facf3c7016fb3142fef0ede";
  const options = {
    port: 443,
    host: "test.oppwa.com",
    path: path,
    method: "GET",
    headers: {
      Authorization:
        "Bearer OGFjN2E0Yzc2ZmFjZjNjNzAxNmZiMzE0MWU4MjBlZDh8dGs4UTNiM1dZNA==",
    },
  };
  return new Promise((resolve, reject) => {
    var http = require("https");
    const postRequest = http.request(options, function (res) {
      const buf = [];
      res.on("data", (chunk) => {
        buf.push(Buffer.from(chunk));
      });
      res.on("end", () => {
        const jsonString = Buffer.concat(buf).toString("utf8");
        try {
          const resp = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials": true,
            },
            body: JSON.parse(jsonString),
          };
          resolve(resp);
        } catch (error) {
          reject(error);
        }
      });
    });
    postRequest.on("error", reject);
    postRequest.end();
  });
};
