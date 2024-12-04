import { Module } from '@nestjs/common';
import { ArmorService } from './armor.service';
import { ArmorController } from './armor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ability } from './entities/armor.entity';

@Module({
  controllers: [ArmorController],
  providers: [ArmorService],
  imports: [TypeOrmModule.forFeature([Ability]),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', // Cambia según tu configuración
    port: 5432, // Puerto por defecto de PostgreSQL
    username: 'postgres',
    password: 'postgres',
    database: 'pokemon-db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Define dónde están tus entidades
    synchronize: true, // Cambia a false en producción
  })],
})
export class ArmorModule {}
