const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    // res.send("Server is running");
});

app.post("/", function(req, res){
    const FirstName = req.body.fname;
    const LastName = req.body.lname;
    const Email = req.body.Email;

    const data = {
        email_address : Email,
        status : "subscribed",
        merge_fields : {
            FName : FirstName,
            LName : LastName
        }

    };

    const jsonFormat = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/d8c082cd73";

    const options = {
        method: "POST",
        headers : {
            Authorization: "705c62bed4b73ff9291298a0b83d15ed-us21",
        }
        
    }

    const request  = https.request(url, options, function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonFormat);
    request.end();

});

app.listen(3000, function(){
    console.log("Port: " + 3000)
}); 




// Mailchimp Key: 705c62bed4b73ff9291298a0b83d15ed-us21
// d8c082cd73