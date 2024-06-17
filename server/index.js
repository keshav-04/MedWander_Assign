const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Form = require("./models/forms");
const dotenv = require('dotenv');

dotenv.config();
const { google } = require("googleapis");

const connect = mongoose
.connect("mongodb://localhost:27017/forms")
.then(() => console.log("Connected to database"))
.catch((e) => console.log(e));

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const credentials = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

app.post("/refresh", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    // keyFile: "credentials.json",
    credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  try {
    const data = req.body;
    // console.log(data);

    const rows = [["Form Type", "Name", "Country code", "Phone number"]];
    
    data.map((item) => {
      rows.push([item.form_type, item.name, item.country_code, item.phone_number])
    });

    console.log(rows);

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "18speQlfLpswRqUveP219LxsGQkDY0Z5uCrAkBGUTMFk";

    const updateData = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: "Sheet1!A:D",
      valueInputOption: "RAW",
      resource: {
        values: rows,
      },
    });
    res.status(200).json(updateData.data);
  } catch (err) {
    console.log(`Spreadsheet update failed, error - ${err}`);
  }
});

app.post("/form", async (req, res) => {
  try {
    const {
      formType: form_type,
      userName: name,
      countryCallingCode: country_code,
      phoneNumber: phone_number,
    } = req.body;

    const form = await Form.create({
      form_type,
      name,
      country_code,
      phone_number,
    });
    res.status(200).json("");
  } catch (error) {
    res.status(500).json({ error: `Internal server error - ${error}` });
  }
});

app.get("/form", async (req, res) => {
  try {
    const data = await Form.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: `Internal server error - ${err}` });
  }
});

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
