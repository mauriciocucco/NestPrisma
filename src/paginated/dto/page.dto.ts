import { EdgeDto } from './edge.dto';
import { PageInfoDto } from './page-info.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PageDto<Record> {
  edges: EdgeDto<Record>[];

  @ApiProperty()
  pageInfo: PageInfoDto;

  @ApiProperty()
  totalCount: number;
}
