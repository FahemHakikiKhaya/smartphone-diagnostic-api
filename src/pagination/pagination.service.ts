import { Injectable } from '@nestjs/common';
import { PaginationMeta } from './types';

@Injectable()
export class PaginationService {
  generatePaginationMeta(
    total: number,
    page: number,
    take: number,
  ): PaginationMeta {
    const totalPages = Math.ceil(total / take);

    return {
      page,
      take,
      totalPages: totalPages,
    };
  }
}
