import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Catalogue extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: number;
}

export const CatalogueSchema = SchemaFactory.createForClass(Catalogue);
