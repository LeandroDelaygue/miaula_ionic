import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


@Entity('tutores')
@Index(["dni_tutor"])
export class Tutores {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({nullable: false})
  dni_tutor: number;

  @Column({nullable: false})
  dni_alumno: number;

  @Column({nullable: false})
  idcurso: number;

  /**
   * Nombre
   */

  @Column({nullable: true})
  nombre: string;

  /**
   * Telefono
   */

  @Column({nullable: true})
  telefono: string;

  /**
   * Email
   */

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  direccion: string;

  /**
   * Imagen
   */

  @Column({nullable: true})
  foto: string;


  @Column({nullable: true})
  relacion: string;

  @Column({nullable: true})
  principal: boolean;


  constructor() {
  }


}


export interface Tutores {
  [prop: string]: any
}
