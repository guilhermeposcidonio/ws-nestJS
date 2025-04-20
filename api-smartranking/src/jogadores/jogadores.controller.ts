import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Delete, Param, Put, UsePipes } from '@nestjs/common/decorators';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametroPipe } from '../common/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-joagador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador>{
   return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', ValidacaoParametroPipe) _id: string): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[] | Jogador> {
      return this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', ValidacaoParametroPipe) _id: string,
  ): Promise<Jogador> {
      return this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', ValidacaoParametroPipe) _id: string): Promise<void> {
    this.jogadoresService.deletarJogador(_id);
  }
}
