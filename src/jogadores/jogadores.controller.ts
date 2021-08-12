import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<Jogador | Jogador[]> {
    if (email) {
      return await this.jogadoresService.consultarJogadoresPeloEmail(email);
    }
    return this.jogadoresService.consultarTodosJogadores();
  }

  @Delete()
  async deletarJogadores(@Query('email') email: string): Promise<void> {
    return this.jogadoresService.deletarJogador(email);
  }
}
