// src/catalogue/catalogue.dto.ts

import { PickType, PartialType } from '@nestjs/swagger';
import { Catalogue } from './catalogue.schema';

export class CreateCatalogueDto extends PickType(Catalogue, [
  'name',
  'description',
  'duration',
] as const) {}

export class UpdateCatalogueDto extends PartialType(
  CreateCatalogueDto,
) {}
