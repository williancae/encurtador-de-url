import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateDTO {
    @IsString()
    @IsUrl()
    @ApiPropertyOptional()
    url?: string
}

export class UpdateDTO {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    id?: string

    @IsBoolean()
    @ApiPropertyOptional()
    active?: boolean

    @IsString()
    @IsUrl()
    @ApiPropertyOptional()
    url?: string
}
