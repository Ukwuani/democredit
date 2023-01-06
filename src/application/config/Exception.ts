import { Builder } from 'builder-pattern';

export interface ApiErrorType {
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

export function ApiError(error: ApiErrorType | Error | undefined, statusCode?: string | number, message?: string, title?: string, ctx?: any): ApiErrorType {
  // @ts-ignore
  if ((error as ApiErrorType)?.source && !ctx) return error as ApiErrorType;

  let apiError = Builder<ApiErrorType>()
  .status(Number(statusCode || (error as ApiErrorType)?.status) || 500)
  .message(message || error?.message || error?.toString() || "something went wrong")
  .title(title || (error as ApiErrorType)?.title || (error as Error)?.name)
  .code((error as ApiErrorType)?.code || 'DMC')
  .build()

  if (isPrintableEnv()) console.error(JSON.stringify(apiError), ctx);

  return apiError;
}

ApiError.prototype = Error.prototype;

export function Forbidden(message: string, context?: any, parentError?: ApiErrorType | Error): ApiErrorType {
  return ApiError(parentError, 403, message, 'Forbidden', context);
}

export function BadRequest(message: string, context?: any, parentError?: ApiErrorType | Error): ApiErrorType {
  return ApiError(parentError, 400, message, 'Bad Request', context);
}

export function Conflict(message: string, context?: any, parentError?: ApiErrorType | Error): ApiErrorType {
  return ApiError(parentError, 409, message, 'Conflict', context);
}

export function NotFound(message: string, context?: any, parentError?: ApiErrorType | Error): ApiErrorType {
  return ApiError(parentError, 404, message, 'Not Found', context);
}

export function Unauthorized(message: string, context?: any, parentError?: ApiErrorType | Error): ApiErrorType {
  return ApiError(parentError, 401, message, 'Unauthorized', context);
}

export function InternalError(message: string, context?: any, parentError?: ApiErrorType | Error): ApiErrorType {
  return ApiError(parentError, 500, message, 'Internal Server Error', context);
}