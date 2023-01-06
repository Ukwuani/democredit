import bcrypt from "bcryptjs"; 
const salt = process.env.SALT;

/**
 * @param {String} passkey
 */
export const encryptPasskey = (passKey: string) => {
	return  bcrypt.hashSync(passKey, salt);
};

/**
 * @param {String} checkedKey 
 * @param {String} passKey 
 */
export const validatePassKey = (checkedKey: string, passKey: string) => {
	return bcrypt.compare(checkedKey, passKey);
};
