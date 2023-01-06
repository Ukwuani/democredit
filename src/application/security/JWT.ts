import {sign, verify, Secret} from "jsonwebtoken";


export interface TokenPayload {
	data: Object
}

/**
 * 
 * @param {*} hash just user id in object
 */
export const hashToken = (hash: string) => sign(
	hash, 
	process.env.HASH_TOKEN_SECRET as Secret);

/**
 * 
 * @param {*} user just user id in object
 */
export const accessToken = (user: Object) => sign(
	user, 
	process.env.ACCESS_TOKEN_SECRET as Secret);

/**
 * 
 * @param {*} user just user id in object
 */
export const refreshToken = (user: Object) => sign(
	user, 
	process.env.REFRESH_TOKEN_SECRET as Secret);

export const validateToken = (token: string) => verify(
	token,
	process.env.ACCESS_TOKEN_SECRET as Secret
);

export const validateRefrshToken = (token: string) => verify(
	token,
	process.env.REFRESH_TOKEN_SECRET as Secret
);