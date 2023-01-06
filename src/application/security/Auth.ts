import {TokenPayload, validateToken} from "./JWT";
import { Request, Response, NextFunction } from "express";
import { Unauthorized } from 'application/config/Exception';
import { JwtPayload } from "jsonwebtoken";
import { Context } from "../config/APIWrapper";

export const authenticate = (req: Request, res: Response): TokenPayload|void => {
    //verify token
    let token: string = "token";
    let auth = req.headers["authorization"];
    if (auth && auth.startsWith("Bearer")) {
        token = auth.split(" ")[1];
    } 

    try {
        //validate token
        const decodedData = validateToken(token) as TokenPayload;
        console.log(decodedData);
        
        if (decodedData.data) {
            return decodedData;
        }
    } catch (exception) {
    }
}


export const authorize = (context: Context, req: Request, res: Response, next: NextFunction) => {
    // Get the authenticated user.
    const user = context.meta.user;
    //if the endpoints don't require authorization, allow them
    //Ensure this more:: Security
    if (context.$action.auth == "required" && !user) {
        // throw Unauthorized("NO_RIGHTS");
        next(Unauthorized("NO_RIGHTS"))
    }
}