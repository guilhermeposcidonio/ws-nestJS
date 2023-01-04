import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto) {
    const { email } = criarJogadorDto;
    /*  const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    ); */
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado) {
      await this.atualizar(criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    //return await this.jogadores;
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com o email ${email} não encontrado !`,
      );
    }
    return jogadorEncontrado;
  }

  private criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return jogadorCriado.save();
    /* const { nome, telefoneCelular, email } = criaJogadorDto
     const jogador: Jogador = {
      //_id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.jogadores.push(jogador); */
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    /*   const { nome } = criaJogadorDto;
    jogadorEncontrado.nome = nome; */
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
  }

  async deletarJogador(email): Promise<any> {
    /*     const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email == email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    ); */
    return await this.jogadorModel.remove({ email }).exec();
  }
}
