const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-central-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteEvent = (event, callback) => {
  const { id } = event.body;

  const params = {
    TableName: process.env.EVENTS_TABLE,
    Key: {
      eventId: Number(id),
    },
  };

  let responseBody = "";
  let statusCode = 0;

  try {
    const data = docClient.delete(params);
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
      "Access-Control-Allow-Credentials": true,
    },
    body: responseBody,
  };

  callback(null, response);
};
