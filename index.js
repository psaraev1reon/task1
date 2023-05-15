const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const getAge = require("./helpers/getAge");
const utils = require("./utils");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/contact", async (req, res) => {

	const AGE_FIELD_ID = 1024347;
	const BIRTH_DATE_ID = 1031149;
	const [user] = req.body.contacts.update || req.body.contacts.add;
	
	const birthDate = utils.getFieldValue(user.custom_fields, BIRTH_DATE_ID);
	
	if (birthDate) {
		const userAge = utils.getFieldValue(user.custom_fields, AGE_FIELD_ID);
		const updatedAge = getAge(birthDate);
		if (!updatedAge) return res.status(200);
		
		const updatedUsers = [{
			id: Number(user.id),
			custom_fields_values: [
				utils.makeField(AGE_FIELD_ID, updatedAge)
			]
		}];

		if (Number(userAge) !== updatedAge) {
			api.updateContacts(updatedUsers);
		}
	}
	
	return res.json("ok");
});

app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));