import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':search')
  findOne(@Param('search') search: string) {
    return this.pokemonService.findOne(search);
  }

  @Patch(':search')
  update(@Param('search') search: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(search, updatePokemonDto);
  }

  @Delete(':search')
  remove(@Param('search', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
