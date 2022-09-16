import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsBoolean, IsDefined, IsString, IsUrl } from 'class-validator'
import { now } from 'mongoose'
import generateId from 'src/utils/uuids'

@Schema({ timestamps: true, collection: 'shortener' })
export class Shortener {
    @Prop({
        primary: true,
        unique: true,
        default: (): string => generateId(),
    })
    @IsDefined()
    @IsString()
    id: string = generateId()

    @Prop({ unique: true, required: true })
    @IsDefined()
    @IsUrl()
    url: string

    @Prop({ required: true, unique: true })
    @IsString()
    @IsDefined()
    code: string

    @Prop({ required: true, default: true })
    @IsBoolean()
    @IsDefined()
    active: boolean

    @Prop({ default: now(), name: 'created_at' })
    createdAt: Date

    @Prop({ default: now(), name: 'updated_at' })
    updatedAt: Date
}
export const ShortenerSchema = SchemaFactory.createForClass(Shortener)
