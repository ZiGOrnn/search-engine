import { Injectable } from '@nestjs/common';

export interface Segmenter {
  segment: string;
  index: number;
  input: string;
  isWordLike: boolean;
}

@Injectable()
export class WordBreakerService {
  execute(text: string, join: string = ' ') {
    const segmenter = Array.from<Segmenter>(
      // @ts-expect-error
      new Intl.Segmenter('th', { granularity: 'word' }).segment(text),
    );

    const words = segmenter
      .filter((word) => word.isWordLike)
      .map((word) => word.segment)
      .join(join);

    return words;
  }
}
