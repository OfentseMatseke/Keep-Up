const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getDonations = async (event) => {
  let body = "";
  let statusCode = 200;
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  if (
    event &&
    event.queryStringParameters &&
    event.queryStringParameters.suburb
  ) {
    const suburb =
      event.queryStringParameters.suburb.charAt(0).toUpperCase() +
      event.queryStringParameters.suburb.slice(1);
    console.log("The suburb is: ", suburb);
    const params = {
      TableName: process.env.DONATIONS_TABLE,
      FilterExpression: "#ref = :sub",
      ExpressionAttributeNames: {
        "#ref": "reference",
      },
      ExpressionAttributeValues: {
        ":sub": suburb,
      },
    };

    try {
      const data = await docClient.scan(params).promise();
      body = JSON.stringify(
        data.Items.sort((item1, item2) => {
          let dateA = new Date(item1.transactionDate);
          let dateB = new Date(item2.transactionDate);
          return dateA - dateB;
        })
      );
    } catch (err) {
      statusCode = err.statusCode;
    }
  } else {
    const params = {
      TableName: process.env.DONATIONS_TABLE,
    };

    try {
      const data = await docClient.scan(params).promise();
      body = JSON.stringify(
        data.Items.sort((item1, item2) => {
          let dateA = new Date(item1.transactionDate);
          let dateB = new Date(item2.transactionDate);
          return dateA - dateB;
        })
      );
    } catch (err) {
      statusCode = err.statusCode;
    }
  }

  const response = {
    statusCode,
    body,
    headers,
  };
  return response;
};
