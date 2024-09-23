import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
