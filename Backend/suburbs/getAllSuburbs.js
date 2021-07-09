const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getAllSuburbs = async (event, context) => {
  const params = {
    TableName: process.env.SUBURBS_TABLE,
  };

  let responseBody = "";
  let statusCode = 0;

  try {
    const data = await docClient.scan(params).promise();
    responseBody = JSON.stringify(data.Items);
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to get user data`;
    statusCode = 403;
  }

  const response = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: responseBody,
  };

  return response;
};
