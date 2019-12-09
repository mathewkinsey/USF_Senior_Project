const CSVtoJSON = require("csvtojson");
const FileSystem = require("fs");

CSVtoJSON().fromFile("./ticket_data.csv").then(data=>{
    let jsonData = JSON.stringify(data);
    FileSystem.writeFileSync("./TicketData.json", jsonData);
});