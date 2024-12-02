import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Result } from '../../dist/seed/interfaces/poke-response';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon?limit=650';

  async executeSeed() {
    const {data} = await this.axios.get<PokeResponse>(this.url)
    
    data.results.forEach(({name, url}) => {
      const id = url.split('/').filter(Boolean).pop();
      console.log(`id: ${id}, name: ${name}`);
    });
  }
}
