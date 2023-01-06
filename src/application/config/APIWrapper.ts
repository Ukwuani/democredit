import { Request, Response, NextFunction, RequestHandler } from "express";
import { Builder } from 'builder-pattern';
import {authenticate, authorize} from "application/security/Auth"
import { run } from 'application/config/Async';
import { ApiError } from "./Exception";


interface IAPIContext {
  controller: Function;
  requireAuth: boolean;
}

export interface Context {
  params: Object;
  headers: Object;
  meta: { user: Object|void };
  $action: { auth: string };
}

export  function APIContext({controller, requireAuth}: IAPIContext)  {
  console.log("plase1")

  return async function (req: Request, res: Response, next: NextFunction) {
    let context: Context= {
      params: Object.assign({}, req.params, req.body, req.query),
      headers: Object.assign({}, req.headers),
      meta: Object.assign({}),
      $action: Object.assign({}, {auth: requireAuth ? "required" : "none"})
    }

    console.log("running immediately")
    /** auth middleware */
    //authenticate user
    context.meta.user = authenticate(req, res)
    //authorized user
    authorize(context, req, res, next)
    console.log(context.meta.user)

    /** controller execution */
    const [error, data] = await run(controller(context));
    console.log(error)
    if (error) {
      return next(ApiError(error, error?.status, ` ${error}`, error?.title, req));

    }
    return res.json(data);
  }
} 
