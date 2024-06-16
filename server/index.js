const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Form = require('./models/forms');

const connect = mongoose
  .connect("mongodb://localhost:27017/forms")
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(e));

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.post("/form", async (req, res) => {
  try {
	const { formType:form_type, userName:name , countryCallingCode:country_code, phoneNumber:phone_number } = req.body;

	const form = await Form.create({form_type, name, country_code, phone_number});
	res.status(200).json('');
  } catch (error) {
    res.status(500).json({ error: `Internal server error - ${error}` });
  }
});

app.get('/form', async (req, res) => {
	try{
		const data = await Form.find();
		res.status(200).json(data);
	} catch(err) { 
		res.status(500).json({error: `Internal server error - ${err}`})
	}
})

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
