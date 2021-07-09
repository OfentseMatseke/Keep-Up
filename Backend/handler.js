"use strict";
var querystring = require("querystring");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-central-1",
});
const docClient = new AWS.DynamoDB.DocumentClient();

const transactionsTable = "keep-up-dev-donations";
const entityId = "8ac7a4c76facf3c7016fb3142fef0ede";
const peachAPIKey =
  "Bearer OGFjN2E0Yzc2ZmFjZjNjNzAxNmZiMzE0MWU4MjBlZDh8dGs4UTNiM1dZNA=="; //TEST API KEY
const peachHost = "test.oppwa.com"; //TEST API Host

module.exports.createCheckout = (event, callback) => {
  if (event.queryStringParameters) {
    var date = new Date();
    var merchantTransactionId = date.getTime().toString();
    var emailAddress = "" + event.queryStringParameters.emailAddress;
    var name = "" + event.queryStringParameters.name;
    var amount = "" + event.queryStringParameters.amount;
    var transactionDate = "" + event.queryStringParameters.transactionDate;
    var phoneNumber = "" + event.queryStringParameters.phoneNumber;
    var reference = "" + event.queryStringParameters.reference;
    var http = require("https");
    var path = "/v1/checkouts";
    var data = querystring.stringify({
      //'entityId':'8ac7a4ca69c329cc0169c97fa3a90f0a',//TEST entity ID
      entityId: entityId,
      amount: event.queryStringParameters.amount,
      currency: "ZAR",
      paymentType: "DB",
      merchantTransactionId: merchantTransactionId,
    });
    var options = {
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
    var req = http.request(options, function (res) {
      res.setEncoding("utf8");
      let jsonRes = {};
      res.on("data", function (chunk) {
        console.log("in on");
        jsonRes = JSON.parse(chunk);
        console.log("res: " + jsonRes.result.description);
        var transactionID = "" + jsonRes.id;
        //console.log("rec: " + isRecurringDonation);
        var templateId = "d-3734c6df60e948ea8bb03101fed6d40b";
        if (reference.substring(0, 3) === "702") {
          templateId = "d-8f8f7d677ff54c62ae02d5ab3b2cb32b";
        }
        //Put phone number into valid format
        if (phoneNumber[0] === "0") {
          var temp = phoneNumber;
          temp = temp.slice(1);
          phoneNumber = "27" + temp;
        }
        if (phoneNumber[0] === "+") {
          phoneNumber = phoneNumber.slice(1);
        }
        if (phoneNumber[0] != "0") {
          phoneNumber = "27" + phoneNumber;
        }
        let params = {
          Item: {
            donationId: transactionID,
            emailAddress: emailAddress,
            name: name,
            amount: amount,
            transactionDate: transactionDate,
            phoneNumber: phoneNumber,
            reference: reference,
          },
          TableName: transactionsTable,
        };
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            message: "checkout created",
            res: jsonRes,
          }),
        };
        callback(null, response);
      });
    });
    req.write(data);
    req.end();
  } else {
    const response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Invalid or missing query string parameters.",
      }),
    };
    callback(null, response);
  }
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

  //Put phone number into valid format
  // if (phoneNumber[0] === "0") {
  //   var temp = phoneNumber;
  //   temp = temp.slice(1);
  //   phoneNumber = "27" + temp;
  // }
  // if (phoneNumber[0] === "+") {
  //   phoneNumber = phoneNumber.slice(1);
  // }

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
      if (response.result.code === "000.100.110") {
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
          resolve(.
            );
        } catch (error) {
          reject(error);
        }
      });
    });
    postRequest.on("error", reject);
    postRequest.end();
  });
};
