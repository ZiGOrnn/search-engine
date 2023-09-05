import { ApiProperty } from '@nestjs/swagger';

export class CreateSearchDto {
  @ApiProperty()
  content: string;
}
