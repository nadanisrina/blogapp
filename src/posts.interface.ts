import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
//To use these decorators, we must first change our interface to a class
export class PostModel {
  @ApiPropertyOptional({ type: Number })
  id?: number;
  //date-time for date format
  @ApiProperty({ type: String, format: 'date-time' })
  date: Date;
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: String })
  body: string;
  @ApiProperty({ type: String })
  category: string;
}
