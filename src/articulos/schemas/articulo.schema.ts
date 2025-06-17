import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticuloDocument = Articulo & Document;

@Schema({ timestamps: true })
export class Articulo {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  marca: string;

  @Prop({ default: true })
  activo: boolean;
}

export const ArticuloSchema = SchemaFactory.createForClass(Articulo);
