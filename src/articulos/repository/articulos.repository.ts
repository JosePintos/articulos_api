/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { CreateArticuloDto, UpdateArticuloDto } from '@articulos/dto';
import { Articulo } from '@articulos/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface IArticulosRepository {
  getFilteredArticulos(query: Record<string, any>): Promise<Articulo[]>;
  getArticuloById(idArticulo: string): Promise<Articulo | null>;
  deleteArticulo(idArticulo: string): Promise<Articulo | null>;
  createArticulo(createArticuloDto: CreateArticuloDto): Promise<Articulo>;
  updateArticulo(
    idArticulo: string,
    updateArticuloDto: UpdateArticuloDto,
  ): Promise<Articulo | null>;
  restoreArticulo(idArticulo: string): Promise<Articulo | null>;
}

@Injectable()
export class ArticulosRepository implements IArticulosRepository {
  constructor(
    @InjectModel('Articulo') private articuloModel: Model<Articulo>,
  ) {}

  async getFilteredArticulos(query: Record<string, any>): Promise<Articulo[]> {
    return this.articuloModel.find(query).exec();
  }

  async getArticuloById(idArticulo: string): Promise<Articulo | null> {
    return this.articuloModel.findById(idArticulo).exec();
  }

  async deleteArticulo(idArticulo: string): Promise<Articulo | null> {
    return this.articuloModel
      .findByIdAndUpdate(
        idArticulo,
        {
          $set: { activo: false, fechaModificacion: new Date() },
        },
        { new: true },
      )
      .exec();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async createArticulo(
    createArticuloDto: CreateArticuloDto,
  ): Promise<Articulo> {
    return new this.articuloModel(createArticuloDto).save();
  }

  async updateArticulo(
    idArticulo: string,
    updateArticuloDto: UpdateArticuloDto,
  ): Promise<Articulo | null> {
    return this.articuloModel
      .findByIdAndUpdate(idArticulo, updateArticuloDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async restoreArticulo(idArticulo: string): Promise<Articulo | null> {
    return this.articuloModel
      .findByIdAndUpdate(
        idArticulo,
        {
          $set: {
            activo: true,
            fechaModificacion: new Date(),
          },
        },
        { new: true },
      )
      .exec();
  }
}
