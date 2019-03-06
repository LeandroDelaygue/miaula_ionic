import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


@Entity('respuesta')
@Index(["idevento","dni_alumno"])
export class Respuesta {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({nullable: true})
  idmunicipio: number;

  @Column({nullable: true})
  idrespuesta: number;

  @Column({nullable: true})
  idevento: number;

  @Column({nullable: true})
  dni_alumno: number;

  @Column({nullable: true})
  dni_tutor: number;
  /**
   * Nombre
   */

  @Column({nullable: true})
  firma: string;

  /**
   * Telefono
   */

  @Column({nullable: true})
  respuesta: string;


  @Column({nullable: true})
  lectura: boolean;

  @Column({nullable: true})
  confirma: boolean;

  @Column({nullable: true})
  enviado: boolean;


  constructor() {
  }


}


export interface Respuesta {
  [prop: string]: any
}
