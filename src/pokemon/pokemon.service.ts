import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}
  
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    return this.pokemonModel.find().exec();
  }

  async findOne(search: string): Promise<Pokemon> {
    let pokemon: Pokemon | null = null;
    if (isValidObjectId(search)) {
      pokemon = await this.pokemonModel.findById(search).exec();
    } else if (isNaN(Number(search))) {
      pokemon = await this.pokemonModel.findOne({ name: search.toLowerCase() }).exec();
    } else {
      pokemon = await this.pokemonModel.findOne({ no: search }).exec();
    }
    
    if (!pokemon) {
      throw new NotFoundException(`Pokemon not found with search ${ search }`);
    }

    return pokemon;
  }

  async update(search: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(search);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      Object.assign(pokemon, updatePokemonDto);
      await pokemon.save();
    } catch (error) {
      this.handleError(error);
    }

    return pokemon;
  }

  async remove(search: string) {
    const {deletedCount} = await this.pokemonModel.deleteOne({ _id: search });
    if (deletedCount === 0) {
      throw new NotFoundException(`Pokemon not found with id ${ search }`);
    }
    return {"result": `Pokemon id "${search}" deleted`};
  }

  private handleError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exists ${JSON.stringify(error.keyValue)}`);
    }
    throw new InternalServerErrorException(`Error creating pokemon ${JSON.stringify(error)}`);
  }
}
