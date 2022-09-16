import { Injectable } from '@nestjs/common'
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'
import { ShortenerService } from 'src/modules/shortener/shortener.service'

@Injectable()
export class CronService {
    constructor(private readonly shortenerService: ShortenerService, private schedulerRegistry: SchedulerRegistry) {}

    @Cron(CronExpression.EVERY_4_HOURS, {
        name: 'disableUrls',
        timeZone: 'America/Sao_Paulo',
    })
    async disableShortener() {
        await this.shortenerService.disableShortenerSevenDays()
    }
}
