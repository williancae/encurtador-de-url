import { Module } from '@nestjs/common'
import { ShortenerModule } from 'src/modules/shortener/shortener.module'
import { CronService } from './crons.service'

@Module({
    imports: [ShortenerModule],
    providers: [CronService],
})
export class CronModule {}
