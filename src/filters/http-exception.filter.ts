import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name)

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const message = exception instanceof HttpException ? exception.getResponse() : exception

        const { url, headers, body, query } = request

        const logData = {
            request: {
                url,
                headers,
                body,
                query,
            },
            message,
            timestamp: new Date().toISOString(),
        }

        this.logger.error(JSON.stringify(logData))

        response.status(status).json({
            ...message,
            timestamp: new Date().toISOString(),
            path: request.url,
        })
    }
}
