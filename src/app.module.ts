import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { HealthModule } from './health/health.module'
import { CronModule } from './jobs/crons/crons.module'
import { ShortenerModule } from './modules/shortener/shortener.module'
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}/nest`),
        EventEmitterModule.forRoot(),
        ScheduleModule.forRoot(),
        HealthModule,
        CronModule,

        // Aplication modules
        ShortenerModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
