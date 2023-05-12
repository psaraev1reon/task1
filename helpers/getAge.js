function getAge(dateString) {
	const [birthDay, birthMonth, birthYear] = dateString
		.split(/[^0-9]/g)
		.map(Number);

	const today = new Date();
	const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

	if (!isNaN(birthDate.getTime())) {
		let age = today.getFullYear() - birthDate.getFullYear();
		const month = today.getMonth() - birthDate.getMonth();
		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age < 0 ? 0 : age;
	}
	return undefined;
}
module.exports = getAge;