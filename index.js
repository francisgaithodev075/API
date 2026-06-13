import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


const yourUsername = "James";
const yourPassword = "2018";
const yourAPIKey = "00067fde-8000-4b9e-ab34-c2696cd7134a";
const yourBearerToken = "f24f9fa1-a540-4b2a-92fd-b9f29789cfad";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  
    try {
        const result = await axios.get(API_URL + "random");
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/basicAuth", async (req, res) => {
  
    try {
        const result = await axios.get(API_URL + "all?page=2", {
            auth: {
                username: yourUsername,
                password: yourPassword,
            }
        });
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        res.status(404).send(error.message);
    }

});

app.get("/apiKey", async(req, res) => {
  
    const apiKey = req.query.apiKey;
    try {
        const result = await axios.get(API_URL + "filter", {
            params: {
                
                score: 5,
                apiKey: yourAPIKey,
            }
        });
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        res.status(404).send(error.message);
    }
});
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
};
app.get("/bearerToken", async(req, res) => {
  
    
    try {
        const result = await axios.get(API_URL + "secrets/42", config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });

    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
