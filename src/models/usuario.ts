import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


@Entity('usuario')
@Index(["idusuario","idcolegio"])
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * idUsuario
   */
  @Column({nullable: false})
  idusuario: number;

  @Column({nullable: false})
  idmunicipio: number;

  @Column({nullable: false})
  idcolegio: number;

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
  contrasena: string;

  /**
   * Imagen
   */

  @Column({nullable: true})
  foto: string;


  @Column({nullable: true})
  cargo: string;




  constructor() {
  }


}


export interface Usuario {
  [prop: string]: any
}
