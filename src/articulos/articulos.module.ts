import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticulosController } from './controller';
import { ArticulosService } from './service';
import { ArticuloSchema } from './schemas';
import { ArticulosRepository } from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Articulo', schema: ArticuloSchema }]),
  ],
  controllers: [ArticulosController],
  providers: [
    {
      provide: 'IArticulosService',
      useClass: ArticulosService,
    },
    { provide: 'IArticulosRepository', useClass: ArticulosRepository },
  ],
  exports: ['IArticulosRepository'],
})
export class ArticulosModule {}
