import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ShortenerSchema } from './schemas/shortener.schema'
import { ShortenerController } from './shortener.controller'
import { ShortenerService } from './shortener.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Shortener', schema: ShortenerSchema }])],
    controllers: [ShortenerController],
    providers: [ShortenerService],
    exports: [ShortenerService],
})
export class ShortenerModule {}
