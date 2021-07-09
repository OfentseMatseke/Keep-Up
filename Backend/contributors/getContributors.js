const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getContributors = async (event, context) => {
  const s = event.queryStringParameters.suburb;

  const params = {
    TableName: process.env.CONTRIBUTORS_TABLE,
    FilterExpression: "suburb = :sub",
    ExpressionAttributeValues: {
      ":sub": s,
    },
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
