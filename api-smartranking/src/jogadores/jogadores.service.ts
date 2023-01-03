import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto) {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email == email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com o email ${email} não encontrado !`,
      );
    }
    return jogadorEncontrado;
  }

  private criar(criaJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criaJogadorDto;

    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.jogadores.push(jogador);
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criaJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criaJogadorDto;
    jogadorEncontrado.nome = nome;
  }

  async deletarJogador(email): Promise<void> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email == email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }
}
