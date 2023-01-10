import { Builder } from 'builder-pattern';

export interface APIErrorType {
  code: string
  message: string
  status: number
  title: string
}

const isPrintableEnv = (): boolean => process.env.NODE_ENV == "development";

const trimSecure = (headers: any) => {
  if (headers.authorization) {
    if (headers.authorization.indexOf('Bearer ') > -1) return { ...headers, authorization: `${headers.authorization.slice(0, 11)}...${headers.authorization.slice(-4)}` };
    return { ...headers, authorization: 'invalid token' };
  }
  return headers;
};

export class APIError extends Error implements APIErrorType {
  readonly code: string;
  readonly message: string;
  readonly status: number;
  readonly title: string;
  constructor(error: APIErrorType | Error | undefined, statusCode?: string | number, message?: string, title?: string, ctx?: any) {
    super();
  this.code = (error as APIErrorType)?.code || 'DMC'
  this.title = title || (error as APIErrorType)?.title || (error as Error)?.name
  this.message = message || error?.message || error?.toString() || "something went wrong"
  this.status = Number(statusCode || (error as APIErrorType)?.status) || 500


  if (isPrintableEnv()) console.error(JSON.stringify(this), ctx);
  }

}


export function Forbidden(message: string, context?: any, parentError?: APIErrorType | Error): APIErrorType {
  return new APIError(parentError, 403, message, 'Forbidden', context);
}

export function BadRequest(message: string, context?: any, parentError?: APIErrorType | Error): APIErrorType {
  return new APIError(parentError, 400, message, 'Bad Request', context);
}

export function Conflict(message: string, context?: any, parentError?: APIErrorType | Error): APIErrorType {
  return new APIError(parentError, 409, message, 'Conflict', context);
}

export function NotFound(message: string, context?: any, parentError?: APIErrorType | Error): APIErrorType {
  return new APIError(parentError, 404, message, 'Not Found', context);
}

export function Unauthorized(message: string, context?: any, parentError?: APIErrorType | Error): APIErrorType {
  return new APIError(parentError, 401, message, 'Unauthorized', context);
}

export function InternalError(message: string, context?: any, parentError?: APIErrorType | Error): APIErrorType {
  return new APIError(parentError, 500, message, 'Internal Server Error', context);
}