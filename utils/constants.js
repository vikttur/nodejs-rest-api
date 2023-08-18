// const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const EMAIL_REGEXP = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
const PHONE_REGEXP = /^\(\d{3}\)\s\d{3}-\d{4}$/; 

module.exports = {
	EMAIL_REGEXP,
	PHONE_REGEXP,
}