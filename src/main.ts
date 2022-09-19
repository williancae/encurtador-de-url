import { ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { NestFactory } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import { AppModule } from './app.module'
async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule)
    app.enableShutdownHooks()

    //CORS

    const options: CorsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: true,
        optionsSuccessStatus: 204,
        credentials: true,
    }
    app.enableCors(options)

    // BodyParser
    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ extended: true, limit: '50mb' }))

    // Helmet
    app.use(helmet())

    // Compression
    app.use(compression())

    // Global pipelines
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidUnknownValues: true,
        }),
    )

    // Global exception filter
    // app.useGlobalFilters(new AllExceptionsFilter())

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('Encurtador de URL')
        .setDescription('Aplicação encurtadora de links.')
        .setVersion('1.0')
        .setContact('Repositorio do Projeto', 'https://github.com/williancae/encurtador-de-url', undefined)
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)

    await app.listen(process.env.APP_PORT || 3000, '0.0.0.0', (): void =>
        console.log(`Server running on port ${process.env.APP_PORT || 3000}`),
    )
}
bootstrap()
