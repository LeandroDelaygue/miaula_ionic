import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


@Entity('usuario_login')
@Index(["idusuario"])
export class UsuarioLogin {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * idUsuario
   */
  @Column({nullable: false})
  idusuario: number;

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
  pais: string;


  @Column({nullable: true})
  ciudad: string;


  @Column({nullable: true})
  provincia: string;


  constructor() {
  }


}


export interface UsuarioLogin {
  [prop: string]: any
}
