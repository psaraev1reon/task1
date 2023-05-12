function getAge(dateString) {
	const date = dateString.split('.').map(val => parseInt(val))

	const today = new Date();
	const birthDate = new Date(date[2], date[1] - 1, date[0]); // 'month - 1' т.к. нумерация месяцев начинается с 0
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}
module.exports = getAge;