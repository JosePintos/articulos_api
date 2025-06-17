/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ArticuloDto,
  CreateArticuloDto,
  GetFilteredArticulosDto,
  UpdateArticuloDto,
} from '@articulos/dto';
import { Articulo } from '@articulos/schemas';
import { IArticulosService } from '@articulos/service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '@shared/decorator';
import { ValidObjectIdPipe } from '@shared/pipes';

@Controller('articulos')
export class ArticulosController {
  constructor(
    @Inject('IArticulosService')
    private readonly articulosService: IArticulosService,
  ) {}

  @ApiOperation({ summary: 'Obtener una lista de artículos' })
  @ApiOkResponse({
    description: 'Lista filtrada de artículos',
    type: [ArticuloDto],
  })
  @Get()
  @Roles(['USER', 'ADMIN', 'MOD'])
  getFilteredArticulos(
    @Query() filters: GetFilteredArticulosDto,
  ): Promise<Articulo[]> {
    return this.articulosService.getFilteredArticulos(filters);
  }

  @ApiOperation({ summary: 'Obtener un artículo' })
  @ApiResponse({
    status: 201,
    type: Articulo,
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación',
  })
  @Get(':idArticulo')
  @Roles(['USER', 'ADMIN', 'MOD'])
  getArticuloById(
    @Param('idArticulo', ValidObjectIdPipe) idArticulo: string,
  ): Promise<Articulo | null> {
    return this.articulosService.getArticuloById(idArticulo);
  }

  @ApiOperation({ summary: 'Eliminar un artículo' })
  @ApiResponse({
    status: 201,
    type: Articulo,
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación o artículo no encontrado',
  })
  @Delete(':idArticulo')
  @Roles(['ADMIN'])
  deleteArticulo(
    @Param('idArticulo', ValidObjectIdPipe) idArticulo: string,
  ): Promise<Articulo> {
    return this.articulosService.deleteArticulo(idArticulo);
  }

  @ApiOperation({ summary: 'Crear un nuevo artículo' })
  @ApiResponse({
    status: 201,
    type: Articulo,
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación o artículo duplicado',
  })
  @Post()
  @Roles(['ADMIN', 'MOD'])
  createArticulo(
    @Body() createArticuloDto: CreateArticuloDto,
  ): Promise<Articulo> {
    return this.articulosService.createArticulo(createArticuloDto);
  }

  @ApiOperation({ summary: 'Actualizar los datos de un artículo' })
  @ApiResponse({
    status: 201,
    type: Articulo,
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación o artículo no encontrado',
  })
  @Patch(':idArticulo')
  @Roles(['ADMIN', 'MOD'])
  updateArticulo(
    @Param('idArticulo', ValidObjectIdPipe) idArticulo: string,
    @Body() updateArticuloDto: UpdateArticuloDto,
  ): Promise<Articulo> {
    return this.articulosService.updateArticulo(idArticulo, updateArticuloDto);
  }

  @ApiOperation({ summary: 'Restaurar un artículo eliminado' })
  @ApiResponse({
    status: 201,
    type: Articulo,
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación o artículo no encontrado',
  })
  @Patch(':idArticulo/restaurar')
  @Roles(['ADMIN'])
  restoreArticulo(
    @Param('idArticulo', ValidObjectIdPipe) idArticulo: string,
  ): Promise<Articulo> {
    return this.articulosService.restoreArticulo(idArticulo);
  }
}
