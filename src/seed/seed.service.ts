import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService
  ) {}

  private readonly axios: AxiosInstance = axios;
  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon?limit=5';

  async executeSeed() {
    const {data} = await this.axios.get<PokeResponse>(this.url)
    
    data.results.forEach(({name, url}) => {
      const id = url.split('/').filter(Boolean).pop();
      const no = Number(id);
      try {
        const pokemon = this.pokemonService.create({no, name});
        return pokemon;
      } catch (error) {
        if (error.code === 11000) {
          throw new BadRequestException(`Pokemon already exists ${JSON.stringify(error.keyValue)}`);
        }
        throw new InternalServerErrorException(`Error creating pokemon ${JSON.stringify(error)}`);
      }
      console.log(`id: ${no}, name: ${name}`);
    });
  }
}
