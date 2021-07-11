const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getEvents = async (event) => {
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
    const params = {
      TableName: process.env.EVENTS_TABLE,
      FilterExpression: "suburb = :sub",
      ExpressionAttributeValues: {
        ":sub": event.queryStringParameters.suburb,
      },
    };

    try {
      const data = await docClient.scan(params).promise();
      body = JSON.stringify(
        data.Items.sort((item1, item2) => {
          let dateA = new Date(item1.date);
          let dateB = new Date(item2.date);
          return dateA - dateB;
        })
      );
    } catch (err) {
      statusCode = err.statusCode;
    }
  } else {
    const params = {
      TableName: process.env.EVENTS_TABLE,
    };

    try {
      const data = await docClient.scan(params).promise();
      body = JSON.stringify(
        data.Items.sort((item1, item2) => {
          let dateA = new Date(item1.date);
          let dateB = new Date(item2.date);
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
