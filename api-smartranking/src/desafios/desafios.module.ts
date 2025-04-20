import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriasModule } from 'src/categorias/categorias.module';

import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';
import { PartidaSchema } from './interfaces/partida.schema';

/*
Desafio
*/

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Desafio', schema: DesafioSchema},
      {name: 'Partida', schema: PartidaSchema}]),
    JogadoresModule,
    CategoriasModule],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class DesafiosModule {}
