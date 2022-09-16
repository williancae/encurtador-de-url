/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Render, Res } from '@nestjs/common'
import { Response } from 'express'
import { ShortenerService } from './modules/shortener/shortener.service'

@Controller()
export class AppController {
    constructor(private readonly service: ShortenerService) {}

    @Get('r/:code')
    async redirectToOriginalUrl(@Param('code') code: string, @Res() res: Response) {
        const data = await this.service.findByCode(code)
        if (!data) {
            res.redirect(302, 'http://localhost:3000/not-found')
        }

        return res.redirect(301, data.url)
    }

    @Get('/not-found')
    @Render('notfound')
    async notFound(@Res() res: Response): Promise<void> {}
}
