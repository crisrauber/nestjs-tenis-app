import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      return await this.atualizar(jogadorEncontrado, criarJogadorDto);
    }

    await this.criar(criarJogadorDto);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { nome, email, celular } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      celular,
      email,
      ranking: 'A',
      posicaoRankin: 1,
      urlFoto: '',
    };

    this.jogadores.push(jogador);
  }

  private async atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<void> {
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
  }
}
