import { Injectable } from '@nestjs/common';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ability } from './entities/armor.entity';

@Injectable()
export class ArmorService {

  constructor(
    @InjectRepository(Ability)
    private readonly abilityRepository: Repository<Ability>
  ) {}

  async create(createArmorDto: CreateArmorDto) {
    createArmorDto.name = createArmorDto.name.toLowerCase();
    const newAbility = this.abilityRepository.create(createArmorDto); 
    await this.abilityRepository.save(newAbility);
    return createArmorDto;
  }

  async findAll() {
    return await this.abilityRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} armor`;
  }

  async update(id: number, updateArmorDto: UpdateArmorDto) {
    return `This action updates a #${id} armor`;
  }

  async remove(id: number) {
    return `This action removes a #${id} armor`;
  }
}
