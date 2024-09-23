import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

  // Lấy toàn bộ danh sách category
  async getAllCategories() {
    return this.prisma.category.findMany();
  }
}
