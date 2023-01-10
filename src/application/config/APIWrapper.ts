import { Request, Response, NextFunction, RequestHandler } from "express";
import { Builder } from 'builder-pattern';
import {authenticate, authorize} from "application/security/Auth"
import { run } from 'application/config/Async';
import { APIError } from "./Exception";


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
  console.log(`${controller.name} is live`)

  return async function (req: Request, res: Response, next: NextFunction) {
    /**payload parser */
    let context: Context= {
      params: Object.assign({}, req.params, req.body, req.query),
      headers: Object.assign({}, req.headers),
      meta: Object.assign({}),
      $action: Object.assign({}, {auth: requireAuth ? "required" : "none"})
    }
    /** auth middleware */
    //authenticate user
    context.meta.user = authenticate(req, res)
    //authorized user
    authorize(context, req, res, next)

    /** controller execution */
    const [error, data] = await run(controller(context));
    if (error) {
      return (error instanceof APIError) ? next(error) : next(new APIError(error, error?.status, ` ${error}`, error?.title, req));
    }
    return res.json(data);
  }
} 
