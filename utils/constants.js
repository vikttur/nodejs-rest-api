const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEXP = /^\(\d{3}\)\s\d{3}-\d{4}$/;
const SUBSCRIPTIONS = ['starter', 'pro', 'business']; 

module.exports = {
	EMAIL_REGEXP,
	PHONE_REGEXP,
	SUBSCRIPTIONS,
}