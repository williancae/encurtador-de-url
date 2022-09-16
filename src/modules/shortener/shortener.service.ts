/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { isUrl } from 'src/utils/urls'
import { Shortener } from './schemas/shortener.schema'

@Injectable()
export class ShortenerService {
    constructor(
        @InjectModel(Shortener.name)
        private readonly shortenerModel: Model<Shortener>,
    ) {}

    async generateCode(): Promise<string> {
        const code = Math.random().toString(36).substring(3, 7)
        const exists = await this.findByCode(code)
        if (exists) {
            return this.generateCode()
        }
        return code
    }

    async create(url: string): Promise<object> {
        if (!isUrl(url)) {
            throw new BadRequestException('Url inválida')
        }
        const exists = await this.findByUrl(url)
        if (exists) {
            return {
                url: exists.url,
                code: exists.code,
                active: exists.active,
                full_url: `${process.env.APP_URL}/${exists.code}`,
            }
        }
        const code = await this.generateCode()
        const shortener = new this.shortenerModel({ url, code })
        await shortener.save()
        return {
            ...shortener.toObject(),
            full_url: `${process.env.APP_URL}/${shortener.code}`,
        }
    }

    async findByCode(code: string): Promise<Shortener> {
        return this.shortenerModel.findOne({ code })
    }

    async findByUrl(url: string): Promise<Shortener> {
        if (!isUrl(url)) {
            throw new BadRequestException('Url inválida')
        }
        return this.shortenerModel.findOne({ url })
    }

    async updateActive(active: boolean, id?: string, url?: string): Promise<Shortener> {
        if (id) {
            return this.shortenerModel.findByIdAndUpdate(id, {
                active,
            })
        }

        return this.shortenerModel.findOneAndUpdate({ url }, { active })
    }

    async findById(id: string): Promise<Shortener> {
        return this.shortenerModel.findById(id)
    }

    async findAll(id?: string, url?: string, code?: string): Promise<Shortener[]> {
        const filtros: object = {
            ...(id && { id }),
            ...(url && { url }),
            ...(code && { code }),
        }
        return this.shortenerModel.find(filtros).exec()
    }

    async disableShortenerSevenDays(): Promise<boolean> {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        await this.shortenerModel.updateMany({ createdAt: { $lt: sevenDaysAgo } }, { active: false })
        return true
    }

    async deleteById(id: string): Promise<Shortener> {
        return this.shortenerModel.findByIdAndDelete(id)
    }
}
