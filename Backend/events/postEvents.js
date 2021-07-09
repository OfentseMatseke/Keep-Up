// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-central-1",
});
//Create the DocumentClient service object
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });
console.log("This is the date now", Date.now());
module.exports.postEvents = async (e, ctx, callback) => {
  const { date, description, location, suburb, title } = JSON.parse(e.body);

  var params = {
    TableName: process.env.EVENTS_TABLE,
    Item: {
      date,
      description,
      eventId: Date.now(),
      location,
      suburb,
      title,
    },
  };

  let responseBody = "";
  let statusCode = 0;

  // Call DynamoDB to add the item to the table
  try {
    const data = await docClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (err) {
    responseBody = JSON.stringify({
      message: err,
    });
    statusCode = 403;
  }

  const response = {
    statusCode,
    headers: {},
    body: responseBody,
  };

  return response;
};
