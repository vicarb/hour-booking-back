// src/catalogue/catalogue.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { CreateCatalogueDto, UpdateCatalogueDto } from './catalogue.dto';
import { Catalogue } from './catalogue.schema';

@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get()
  findAllCatalogues(): Promise<Catalogue[]> {
    return this.catalogueService.findAllCatalogues();
  }

  @Get(':id')
  findCatalogueById(@Param('id') catalogueId: string): Promise<Catalogue> {
    return this.catalogueService.findCatalogueById(catalogueId);
  }

  @Post()
  createCatalogue(@Body() catalogue: CreateCatalogueDto): Promise<Catalogue> {
    return this.catalogueService.createCatalogue(catalogue);
  }

  @Put(':id')
  updateCatalogue(
    @Param('id') catalogueId: string,
    @Body() catalogue: UpdateCatalogueDto,
  ): Promise<Catalogue> {
    return this.catalogueService.updateCatalogue(catalogueId, catalogue);
  }

  @Delete(':id')
  deleteCatalogue(@Param('id') catalogueId: string): Promise<boolean> {
    return this.catalogueService.deleteCatalogue(catalogueId);
  }
}
