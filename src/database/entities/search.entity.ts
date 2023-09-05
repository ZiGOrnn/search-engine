import { Column, Entity, Index } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity({
  name: 'search',
})
export class SearchEntity extends DefaultEntity {
  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'search' })
  @Index({ fulltext: true })
  search: string;
}
