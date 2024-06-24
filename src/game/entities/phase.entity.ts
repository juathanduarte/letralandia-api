import { Word } from './word.entity';

export class Phase {
  id: number;
  gameType: string;
  words: Word[];
}
