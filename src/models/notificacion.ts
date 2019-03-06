import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


@Entity('notificacion')
export class Notificacion {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({nullable: true})
  idmunicipio: number;

  @Column({nullable: true})
  notificacion_id: number;

  @Column({nullable: true})
  idevento: number;

  @Column({nullable: true})
  idchat: number;

  @Column({nullable: true})
  idusuario: number;

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
  tipo: string;


  @Column({nullable: true})
  titulo: string;

  @Column({nullable: true})
  descripcion: string;

  @Column({nullable: true})
  url: string;

  @Column({nullable: true})
  fecha: string;

  @Column({nullable: true})
  visto: boolean;

  constructor() {
  }


}


export interface Notificacion {
  [prop: string]: any
}
