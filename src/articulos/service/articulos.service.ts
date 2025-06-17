/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CreateArticuloDto,
  GetFilteredArticulosDto,
  UpdateArticuloDto,
} from '@articulos/dto';
import { IArticulosRepository } from '@articulos/repository';
import { Articulo } from '@articulos/schemas/articulo.schema';
import { Inject, Injectable } from '@nestjs/common';
import {
  ConflictDomainException,
  NotFoundDomainException,
} from '@shared/exception';

export interface IArticulosService {
  getFilteredArticulos(filters: GetFilteredArticulosDto): Promise<Articulo[]>;
  getArticuloById(idArticulo: string): Promise<Articulo | null>;
  deleteArticulo(idArticulo: string): Promise<Articulo>;
  createArticulo(createArticuloDto: CreateArticuloDto): Promise<Articulo>;
  updateArticulo(
    idArticulo: string,
    updateArticuloDto: UpdateArticuloDto,
  ): Promise<Articulo>;
  restoreArticulo(idArticulo: string): Promise<Articulo>;
}

@Injectable()
export class ArticulosService implements IArticulosService {
  constructor(
    @Inject('IArticulosRepository')
    private readonly articulosRepository: IArticulosRepository,
  ) {}

  async getFilteredArticulos(
    filters: GetFilteredArticulosDto,
  ): Promise<Articulo[]> {
    const query: Record<string, any> = {};

    if (filters.nombre) {
      query.nombre = { $regex: filters.nombre, $options: 'i' };
    }

    if (filters.marca) {
      query.marca = filters.marca;
    }

    if (filters.activo !== undefined) {
      query.activo = filters.activo === 'true';
    }

    return await this.articulosRepository.getFilteredArticulos(query);
  }

  async getArticuloById(idArticulo: string): Promise<Articulo | null> {
    return await this.articulosRepository.getArticuloById(idArticulo);
  }

  async deleteArticulo(idArticulo: string): Promise<Articulo> {
    const deletedArticulo =
      await this.articulosRepository.deleteArticulo(idArticulo);

    if (!deletedArticulo) {
      throw new NotFoundDomainException('Artículo', 'ARTICULO');
    }

    return deletedArticulo;
  }

  async createArticulo(
    createArticuloDto: CreateArticuloDto,
  ): Promise<Articulo> {
    const articulos = await this.getFilteredArticulos(createArticuloDto);

    if (articulos.length > 0) {
      throw new ConflictDomainException(
        `El artículo ${createArticuloDto.nombre} de la marca ${createArticuloDto.marca} ya existe.`,
      );
    }

    return await this.articulosRepository.createArticulo(createArticuloDto);
  }

  async updateArticulo(
    idArticulo: string,
    updateArticuloDto: UpdateArticuloDto,
  ): Promise<Articulo> {
    const updatedArticulo = await this.articulosRepository.updateArticulo(
      idArticulo,
      updateArticuloDto,
    );

    if (!updatedArticulo) {
      throw new NotFoundDomainException('Artículo', 'ARTICULO');
    }

    return updatedArticulo;
  }

  async restoreArticulo(idArticulo: string): Promise<Articulo> {
    const restoredArticulo =
      await this.articulosRepository.restoreArticulo(idArticulo);

    if (!restoredArticulo) {
      throw new NotFoundDomainException('Artículo', 'ARTICULO');
    }

    return restoredArticulo;
  }
}
