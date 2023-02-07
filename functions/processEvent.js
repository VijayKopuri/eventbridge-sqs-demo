module.exports.handler = async (event) => {
    let records = event.Records;
    let batcjItemFailures = [];

    if (records.length) {
        for (const record of records) {
            try {
                 const parsedBody = JSON.parse(record.body);
                 if(typeof parsedBody.detail.vehicleNo != 'string' ){
                    throw new Error(" Vehicle number must be a String " + parsedBody.detail.vehicleNo);
                 }
                 console.log("Processing vechicle details " + parsedBody.detail.vehicleNo);
                 console.log("Processing is successful " + record.messageId);
            } catch (err) {
                batcjItemFailures.push({
                    itemIdentifier: record.messageId,
                });
            }
        }
    }
    return { batcjItemFailures };
}