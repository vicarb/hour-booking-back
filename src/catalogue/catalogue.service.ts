// src/catalogue/catalogue.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalogue } from './catalogue.schema';
import { CreateCatalogueDto, UpdateCatalogueDto } from './catalogue.dto';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectModel(Catalogue.name) private readonly catalogueModel: Model<Catalogue>,
  ) {}

  async findAllCatalogues(): Promise<Catalogue[]> {
    return this.catalogueModel.find().exec();
  }

  async findCatalogueById(catalogueId: string): Promise<Catalogue> {
    return this.catalogueModel.findById(catalogueId).exec();
  }

  async createCatalogue(catalogue: CreateCatalogueDto): Promise<Catalogue> {
    const newCatalogue = new this.catalogueModel(catalogue);
    return newCatalogue.save();
  }

  async updateCatalogue(
    catalogueId: string,
    catalogue: UpdateCatalogueDto,
  ): Promise<Catalogue> {
    return this.catalogueModel.findByIdAndUpdate(catalogueId, catalogue, {
      new: true,
    }).exec();
  }

  async deleteCatalogue(catalogueId: string): Promise<boolean> {
    const result = await this.catalogueModel.findByIdAndDelete(catalogueId).exec();
    return result != null;
  }
}
