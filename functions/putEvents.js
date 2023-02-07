
const EventBrdige = require("aws-sdk/clients/eventbridge");
const EVENT_BUS_NAME = process.env.EVENT_BUS_NAME;


let eventBrdige = new EventBrdige();

module.exports.handler = async (event) => {
    let body = JSON.parse(event.body);

    // putEvents in to EventBridge
    let entry = {
        EventBusName: EVENT_BUS_NAME,
        Detail: JSON.stringify({
            vehicleNo: body.vehicleNo,
            NIC: body.nic,
        }),
        Source: "fuel-app",
        DetailType: "user-signup"
    }

    try {
        let output = await eventBrdige.putEvents({Entries: [entry]}).promise();
        return {
        statusCode: 200, 
        body: JSON.stringify(output)
    }

    } catch (err) {
        console.log(err);
    }

}