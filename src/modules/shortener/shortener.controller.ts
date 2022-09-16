/*
https://docs.nestjs.com/controllers#controllers
*/

import { BadRequestException, Body, Controller, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { CreateDTO, UpdateDTO } from './dtos/shortener.dto'
import { Shortener } from './schemas/shortener.schema'
import { ShortenerService } from './shortener.service'
@ApiTags('Shortener')
@Controller('shortener')
export class ShortenerController {
    constructor(private readonly service: ShortenerService) {}

    @Post('')
    async create(@Body() body: CreateDTO): Promise<object> {
        if (!body.url) {
            throw new BadRequestException('Url é um campo obrigatório')
        }
        return this.service.create(body.url)
    }

    @Patch('disable')
    async disable(@Body() body: UpdateDTO) {
        if (!body.id && !body.url) {
            throw new BadRequestException('Id ou Url precisa ser informado')
        }
        return this.service.updateActive(body.active, body.id, body.url)
    }

    @Get()
    @ApiQuery({ name: 'id', required: false })
    @ApiQuery({ name: 'code', required: false })
    @ApiQuery({ name: 'url', required: false })
    async getUrls(
        @Query('id') id?: string,
        @Query('code') code?: string,
        @Query('url') url?: string,
    ): Promise<Shortener[]> {
        return await this.service.findAll(id, url, code)
    }
}
