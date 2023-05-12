/**
 * Основной модуль приложения - точка входа. 
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const getAge = require('./helpers/getAge')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/contact', async (req, res) => {

	const ageFieldId = 1024347
	const birgthFiledId = 1031149
	const users = req.body.contacts.update || req.body.contacts.add
	const user = users[0]
	
	const birthDate = user.custom_fields.find(field => field.id == birgthFiledId)
	
	if (birthDate) {
		const userAge = user.custom_fields.find(field => field.id == ageFieldId)?.values[0].value
		const updatedAge = getAge(birthDate.values[0].value)
		
		const updatedUsers = []
		updatedUsers.push({
			id: parseInt(user.id),
			custom_fields_values: [{
				field_id: ageFieldId,
				values: [{value: updatedAge}]
			}]
		})

		if (userAge != updatedAge) {
			const response = await api.updateContacts(updatedUsers)
		}
	}
	
	return res.json('ok')
})

app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));