/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus'

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(private readonly health: HealthCheckService, private readonly database: MongooseHealthIndicator) {}

    @Get('/database')
    @HealthCheck()
    checkDatabase() {
        return this.health.check([async () => this.database.pingCheck('mongodb')])
    }
}
