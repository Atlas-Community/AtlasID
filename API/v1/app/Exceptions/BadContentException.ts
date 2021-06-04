import { Exception } from '@poppinss/utils'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new BadContentException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class BadContentException extends Exception {
    constructor() {
        super("Bad Content", 400)
    }
    
    public async handle (error, ctx) {
        return ctx.response.status(error.status).json({ error: error.message })
    }
}