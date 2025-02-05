import { PartialType } from '@nestjs/mapped-types';
import { CreateRedisDto } from './create-redi.dto';

export class UpdateRediDto extends PartialType(CreateRedisDto) {}
