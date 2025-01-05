type InternalException = {
  status: number
  code: string | object
  log?: string
  isInternalException: boolean
}

const generic = (status: number, code: string | object, log?: string): InternalException => ({
  status,
  code,
  log,
  isInternalException: true,
})

export default {
  internalServerError: (code?: string, log?: string) =>
    generic(500, code || 'INTERNAL_SERVER_ERROR', log),
  forbidden: (code?: string, log?: string) => generic(403, code || 'FORBIDDEN', log),
  invalid: (code?: string, log?: string) => generic(400, code || 'INVALID', log),
  badRequest: (code?: string, log?: string) => generic(400, code || 'BAD_REQUEST', log),
  unauthorized: (code?: string, log?: string) => generic(401, code || 'UNAUTHORIZED', log),
  notFound: (code?: string, log?: string) => generic(404, code || 'NOT_FOUND', log),
  conflict: (code?: string, log?: string) => generic(409, code || 'ALREADY_EXISTS', log),
  validationFailed: (code?: string, log?: string) => generic(422, code || 'UNPROCESSABLE', log),
  custom: (status: number, code: string, log?: string) => generic(status, code, log),
  customJSON: (status: number, code: object, log?: string) => generic(status, code, log),
  noContent: (code?: string, log?: string) => generic(204, code || 'NO CONTENT', log),
  requestLimitExceeded: (code?: string, log?: string) =>
    generic(429, code || 'REQUEST_LIMIT_EXCEEDED', log),
}
