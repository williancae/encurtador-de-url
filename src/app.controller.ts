/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { Shortener } from './modules/shortener/schemas/shortener.schema'
import { ShortenerService } from './modules/shortener/shortener.service'
@Controller()
export class AppController {
    constructor(private readonly service: ShortenerService) {}

    @Get(':code')
    async redirectToOriginalUrl(@Param('code') code: string, @Res() res: Response) {
        const data: Shortener = await this.service.findByCode(code)
        if (!data) {
            res.redirect('/app/not-found')
        }

        res.redirect(301, data.url)
    }

    @Get('/app/not-found')
    async notFound(@Res() res: Response) {
        res.render(__dirname + '/templates/notfound.hbs')
    }
}
