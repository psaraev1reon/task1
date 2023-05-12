function getAge(dateString) {
	const [birthDay, birthMonth, birthYear] = dateString
		.split(/[^0-9]/g)
		.map(val => parseInt(val));

	const today = new Date();
	const birthDate = new Date(birthYear, birthMonth - 1, birthDay); 
	let age = today.getFullYear() - birthDate.getFullYear();
	const month = today.getMonth() - birthDate.getMonth();
	if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}
module.exports = getAge;