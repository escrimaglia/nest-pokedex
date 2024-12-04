import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ability {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    url: string;
  
    @Column()
    no: number;
  }