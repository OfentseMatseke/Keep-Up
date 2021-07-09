const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
});

var docClient = new AWS.DynamoDB.DocumentClient();

// Update the item, unconditionally,

module.exports.updateEvent = async (e, context) => {
  var params = {
    TableName: process.env.EVENTS_TABLE,
    Key: {
      eventId: { N: "1621498315496" },
    },
    UpdateExpression:
      "set date = :date, description=:desc, location=:loc, suburb=:sub, title=:tit",
    ExpressionAttributeValues: {
      ":date": "Empty",
      ":desc": "Empty",
      ":loc": "Empty",
      ":sub": "Empty",
      ":tit": "Empty",
    },
    ReturnValues: "UPDATED_NEW",
  };

  console.log("Updating the item...");
  docClient.update(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to update item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};
