import { Document } from 'mongoose';
export interface Jogador extends Document {
  //readonly _id: string; sera gerado pelo banco
  readonly telefoneCelular: string;
  readonly email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
