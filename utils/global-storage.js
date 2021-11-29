const CryptoJS = require('crypto-js');

export const setVars = (id, Value) => {
	const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(Value), 'c273ncriPt0*-#').toString();

	sessionStorage.setItem(id, ciphertext);

	const bytes = CryptoJS.AES.decrypt(ciphertext, 'c273ncriPt0*-#');
	const originalText = bytes.toString(CryptoJS.enc.Utf8);

	return originalText;
};

export const getVars = (id, defaultvar = {}) => {
	const data = sessionStorage.getItem(id);

	const originalText = null;
	if (data !== null) {
		const bytes = CryptoJS.AES.decrypt(data, 'c273ncriPt0*-#');
		originalText = bytes.toString(CryptoJS.enc.Utf8);
	}

	return originalText !== null ? JSON.parse(originalText) : defaultvar;
};