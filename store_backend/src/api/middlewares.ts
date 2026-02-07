import {
  defineMiddlewares,
  errorHandler,
  type MedusaNextFunction,
  type MedusaRequest,
  type MedusaResponse,
} from "@medusajs/framework/http"

const originalErrorHandler = errorHandler()

export default defineMiddlewares({
  errorHandler: (
    error: unknown,
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
  ) => {
    // Log the real error so 500 "unknown error" from add-line-item etc. can be debugged
    const err = error instanceof Error ? error : new Error(String(error))
    console.error("[Medusa API Error]", err.message)
    if (err.stack) console.error(err.stack)
    return originalErrorHandler(error, req, res, next)
  },
})
