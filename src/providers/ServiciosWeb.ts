import {Injectable} from "@angular/core";
import {map, tap} from "rxjs/operators"
import {Response, Headers, Http} from '@angular/http';
import {timeout} from 'rxjs/operators';
import {HttpErrorResponse} from "@angular/common/http";
import * as Constantes from '../app/app-config.constants';


@Injectable()
export class ServiciosWeb  {
  MAX_SIZE: number = 20;
  MAX_CHUNK_SIZE: number = 20;
  public headers: Headers;
  loading = false;
  TAG: string = "ServiciosWeb ";

  static get parameters() {
    return [[Http]];
  }

  constructor(private http: Http) {

  }

  //http://localhost:4614/WSRest.svc/pidopwa_asociarTienda/idempresa/382/idtienda/3581/idcliente/251/email/exequielc@gmail.com/imei/null/token/null
  asociarTienda(idempresa: number, idtienda: number, idcliente: string, email: string, imei: string, token: string) {


    let url: string = Constantes.IP_SERVIDOR + Constantes.SERVICIO_LOGIN +
      "/idempresa/" + idempresa + "/idtienda/" + idtienda + "/idcliente/" + idcliente + "/email/" + email + "/imei/" + imei + "/token/" + token;

    console.log(" asociarTienda:" + url)

    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.http.get(url, {headers: headers})
      .pipe(
        map((response: Response) => response.json())
      );
  }

  obtenerTiendasPorMail(mail: any) {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.http.get(Constantes.IP_SERVIDOR + Constantes.SERVICIO_OBTENER_TIENDAS + mail, {headers: headers})
      .pipe(
        map((response: Response) => response.json())
      );
    // catchError(this.handleError);
  }

  obtenerMensajes(topico: any, token: any, uuid: any) {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.http.get(Constantes.IP_SERVIDOR + Constantes.SERVICIO_OBTENER_NOTIFICACIONES + "/topico/" + topico + "/token/" + token + "/uuid/" + uuid, {headers: headers})
      .pipe(
        map((response: Response) => response.json())
      );
    // catchError(this.handleError);
  }

  obtenerMovimientos() {
    //http://186.122.144.86:8080/RestMiddlewareDeposito/rest/moviles/modulo/dep/version/3.0/servicio/grabarMovimiento/serviciosrv/v2003/extra/%20
    let json: string = " ";// '{"ttToken":['+  JSON.stringify({imei: " " ,tienda: idtienda,token: "  "}) +']}';
    //let url= "http://186.122.144.86:8080/RestMiddlewareDeposito/rest/moviles/modulo/dep/version/3.0/servicio/grabarMovimiento/serviciosrv/v2003/extra/%20";
    //let url = "http://anegro.myq-see.com:8080/RestMiddleware/rest/moviles/modulo/pido/versionsrv/1.0/servicio/obtenerUltimaOperacion.p/serviciosrv/v2003/empresa/191/sucursal/1/fuerza/1/vendedor/8045/pass/%20";
    let url = "nextbyn.com:8090/WSRest.svc/pidopwa_obtenerUltimosMovimientos/idempresa/382/idcliente/2032";
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, json, {headers: headers})
      .pipe(
        map((response: Response) => this.extractData(response))
      );//.catch(this.handleError);
  }

  sincroniza(email: any) {


    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');


    return this.http.get(Constantes.IP_SERVIDOR + Constantes.SERVICIO_ACTUALIZAR+"email/"+email, {headers: headers})

      .pipe(
        timeout(40000),
        map((response: Response) => this.extractData(response)))

    //.catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  /*async persiste_datos(json: any, connection: any, idtienda: any): Promise<string> {
    const promises = []
    let respuesta: string = "";
    let isProcesaOk: boolean = false;

    let listaDistri: any [] = [];
    let listaArticulo: any [] = [];
    let listattFiltroRelacionado: any [] = [];
    let listattFiltro: any [] = [];
    let listaPromos: any [] = [];
    let listaDetallePromos: any [] = [];
    let listaPromosCliente: ttPromosCliente[] = [];
    let listattImagenes: any [] = [];
    let listattMovilTienda: any [] = [];
    let listattTiendaEmpresaCliente: any [] = [];
    let listattAgrupacion: any[] = [];
    let listattTipoDoc: ttTipoDoc[] = [];
    let listattVideoUrl: ttVideoUrl[] = [];

    let ttErr: any[] = [];

    let listaIbr: any [] = [];
    let listaIbrEmpresa: any [] = [];
    let listaIbrProvincia: any [] = [];

    // console.log("persiste_datos JSON: " + json);
    if (json.ttErr != null && json.ttErr[0] != null) {
      respuesta = json.ttErr[0].msj;
      return respuesta;
    }

    for (let ob  of json.ttDistribuidora) {
      ob.isAsociada = 0;
      listaDistri.push(<ttDistribuidora> ob);
    }
    for (let ob  of json.ttArticulo)
      listaArticulo.push(<ttArticulo> ob);
    for (let ob  of json.ttFiltro)
      listattFiltro.push(<ttFiltro> ob);
    for (let ob  of json.ttFiltroRelacionado)
      listattFiltroRelacionado.push(<ttFiltroRelacionado> ob);
    for (let ob  of json.ttPromos) {
      if (ob.idempresa != null)
        listaPromos.push(<ttPromos> ob);
    }
    for (let ob  of json.ttDetallePromo) {
      if (ob.idempresa != null)
        listaDetallePromos.push(<ttDetallePromo> ob);
    }
    for (let ob  of json.ttPromosXCli) {
      if (ob.idempresa != null)
        listaPromosCliente.push(<ttPromosCliente> ob);
    }

    for (let ob of json.ttAgrupacion)
      listattAgrupacion.push(<ttAgrupacion>ob);
    for (let ob  of json.ttImagenes)
      listattImagenes.push(<ttImagenes> ob);
    for (let ob  of json.ttMovilTienda)
      listattMovilTienda.push(<ttMovilTienda> ob);
    for (let ob  of json.ttTiendaEmpresaCliente)
      listattTiendaEmpresaCliente.push(<ttTiendaEmpresaCliente> ob);
    for (let ob  of json.ttIbrutos)
      listaIbr.push(<ttIbr> ob);
    for (let ob  of json.ttIbrempresas)
      listaIbrEmpresa.push(<ttIbrEmpresa> ob);
    for (let ob  of json.ttIbrxprovincia)
      listaIbrProvincia.push(<ttIbrProvincia> ob);
    for (let ob of json.ttTipoDoc)
      listattTipoDoc.push(<ttTipoDoc> ob);


    if (listaDistri != null && listaDistri.length > 0) {


      const repository_ttDetallePromo = await connection.getRepository('ttDetallePromo')as Repository<ttDetallePromo>;
      await repository_ttDetallePromo.clear();

      try {
        for (let ob of json.ttVideosUrl) {
          console.log(this.TAG + JSON.stringify(ob));
          listattVideoUrl.push(<ttVideoUrl> ob);
        }
        const repository_ttVideoUrl = connection.getRepository('ttVideoUrl')as Repository<ttVideoUrl>;
        await repository_ttVideoUrl.clear();

        await promises.push(repository_ttVideoUrl.insert(listattVideoUrl).then(() => {
        }));

      } catch (e) {
        //console.log(this.TAG + " error " + e);
      }


      const repository_ttTipoDoc = connection.getRepository('ttTipoDoc')as Repository<ttTipoDoc>;
      await repository_ttTipoDoc.clear();

      const repository = connection.getRepository('ttDistribuidora')as Repository<ttDistribuidora>;
      await repository.clear();
      const repository_art = connection.getRepository('ttArticulo')as Repository<ttArticulo>;
      await repository_art.clear();
      const repository_ttFiltroRelacionado = connection.getRepository('ttFiltroRelacionado')as Repository<ttFiltroRelacionado>;
      await repository_ttFiltroRelacionado.clear();
      const repository_ttFiltro = connection.getRepository('ttFiltro')as Repository<ttFiltro>;
      await repository_ttFiltro.clear();
      const repository_ttPromos = connection.getRepository('ttPromos')as Repository<ttPromos>;
      await repository_ttPromos.clear();
      const repository_ttPromosCli = connection.getRepository('ttPromosCliente')as Repository<ttPromosCliente>;
      await repository_ttPromosCli.clear();

      const repository_ttImagenes = connection.getRepository('ttImagenes')as Repository<ttImagenes>;
      await repository_ttImagenes.clear();
      const repository_ttMovilTienda = connection.getRepository('ttMovilTienda')as Repository<ttMovilTienda>;
      await repository_ttMovilTienda.clear();
      const repository_ttTiendaEmpresaCliente = connection.getRepository('ttTiendaEmpresaCliente')as Repository<ttTiendaEmpresaCliente>;
      await repository_ttTiendaEmpresaCliente.clear();
      const repository_ttAgrupacion = connection.getRepository('ttAgrupacion')as Repository<ttAgrupacion>;
      await repository_ttAgrupacion.clear();
      const repository_ttIbr = connection.getRepository('ttIbr')as Repository<ttIbr>;
      await repository_ttIbr.clear();
      const repository_ttIbrProvincia = connection.getRepository('ttIbrProvincia')as Repository<ttIbrProvincia>;
      await repository_ttIbrProvincia.clear();
      const repository_ttIbrEmpresa = connection.getRepository('ttIbrEmpresa')as Repository<ttIbrEmpresa>;
      await repository_ttIbrEmpresa.clear();

      try {
        let total_tablas = 15;
        let indice_avance: number = 0;

        await promises.push(repository.insert(listaDistri).then(() => {
        }));
        await promises.push(repository_ttTiendaEmpresaCliente.insert(listattTiendaEmpresaCliente).then(() => {
        }));

        console.log(this.TAG + " inserta  listaArticulo->" + listaArticulo.length);
        if (listaArticulo.length < this.MAX_SIZE) {
          await promises.push(repository_art.save(listaArticulo).then(() => {
          }));
        } else {
          let arrays = [], size = listaArticulo.length;
          arrays = this.chunkArray(listaArticulo);

          for (let arr of arrays) {
            //console.log(this.TAG + " Insertando chunk listaArticulo->" + arr.length);
            await promises.push(repository_art.insert(arr).then(() => {
            }));
          }
        }
        console.log(this.TAG + " inserta  listattFiltroRelacionado->" + listattFiltroRelacionado.length);
        await promises.push(repository_ttFiltroRelacionado.insert(listattFiltroRelacionado).then(() => {
        }));
        console.log(this.TAG + " inserta  listattFiltro->" + listattFiltro.length);
        await promises.push(repository_ttFiltro.insert(listattFiltro).then(() => {
        }));
        console.log(this.TAG + " inserta  listaPromos->" + listaPromos.length);
        await promises.push(repository_ttPromos.insert(listaPromos).then(() => {
        }));

        if (listaPromosCliente.length > 0) {
          await promises.push(repository_ttPromosCli.insert(listaPromosCliente).then(() => {
          }));
        }

        console.log(this.TAG + " inserta listaDetallePromos->" + listaDetallePromos.length);
        if (listaDetallePromos.length < this.MAX_SIZE) {
          await promises.push(repository_ttDetallePromo.insert(listaDetallePromos).then(() => {
          }));
        } else {
          let arrays = [], size = listaDetallePromos.length;
          arrays = this.chunkArray(listaDetallePromos);

          //console.log(this.TAG + " Insertando chunk listaDetallePromos->" + arrays.length);
          for (let arr of arrays) {
            // console.log(this.TAG + " Insertando chunk listaDetallePromos->" + arr.length);
            await promises.push(repository_ttDetallePromo.insert(arr).then(() => {
            }));
          }
        }

        await promises.push(repository_ttImagenes.insert(listattImagenes).then(() => {
        }));

        await promises.push(repository_ttMovilTienda.insert(listattMovilTienda).then(() => {
        }));

        console.log(this.TAG + " inserta listattAgrupacion->" + listattAgrupacion.length);
        await promises.push(repository_ttAgrupacion.insert(listattAgrupacion).then(() => {
        }));

        console.log(this.TAG + " inserta listaIbr->" + listaIbr.length);
        await promises.push(repository_ttIbr.insert(listaIbr).then(() => {
        }));

        console.log(this.TAG + " inserta listaIbrProvincia->" + listaIbrProvincia.length);
        await promises.push(repository_ttIbrProvincia.insert(listaIbrProvincia).then(() => {
        }));

        console.log(this.TAG + " inserta listaIbrEmpresa->" + listaIbrEmpresa.length);
        await promises.push(repository_ttIbrEmpresa.insert(listaIbrEmpresa).then(() => {
        }));

        console.log(this.TAG + " inserta listattTipoDoc->" + listattTipoDoc.length);
        if (listattTipoDoc.length < 20) {
          await promises.push(repository_ttTipoDoc.save(listattTipoDoc).then(() => {
          }));
        } else {
          let arrays = [], size = listattTipoDoc.length;
          arrays = this.chunkArray(listattTipoDoc);
          for (let arr of arrays) {
            //console.log(this.TAG + " Insertando chunk repository_ttTipoDoc->" + arr.length);
            await promises.push(repository_ttTipoDoc.save(arr).then(() => {
            }));
          }
        }


        isProcesaOk = true;
        respuesta = "";
      } catch (e) {
        console.log("error_e:" + e.error);
        respuesta = "Ups! encontramos el siguiente error " + e.error;
        return respuesta;
      }
    }

    return await Promise.all(promises).then(async respuesta => {
      console.log(this.TAG + "fin sincro datos -  inicio proceso precios");

    }).catch(err => {
      console.log(err);
      return err;
    });


  }
*/

 /* async eliminarTablas(connection) {
    const repository_ttDetallePromo = await
    connection.getRepository('ttDetallePromo')as Repository<ttDetallePromo>;
    await
    repository_ttDetallePromo.clear();

    const repository_ttVideoUrl = connection.getRepository('ttVideoUrl')as Repository<ttVideoUrl>;
    await
    repository_ttVideoUrl.clear();


    const repository_ttTipoDoc = connection.getRepository('ttTipoDoc')as Repository<ttTipoDoc>;
    await
    repository_ttTipoDoc.clear();

    const repository = connection.getRepository('ttDistribuidora')as Repository<ttDistribuidora>;
    await
    repository.clear();
    const repository_art = connection.getRepository('ttArticulo')as Repository<ttArticulo>;
    await
    repository_art.clear();
    const repository_ttFiltroRelacionado = connection.getRepository('ttFiltroRelacionado')as Repository<ttFiltroRelacionado>;
    await
    repository_ttFiltroRelacionado.clear();
    const repository_ttFiltro = connection.getRepository('ttFiltro')as Repository<ttFiltro>;
    await
    repository_ttFiltro.clear();
    const repository_ttPromos = connection.getRepository('ttPromos')as Repository<ttPromos>;
    await
    repository_ttPromos.clear();
    const repository_ttPromosCli = connection.getRepository('ttPromosCliente')as Repository<ttPromosCliente>;
    await
    repository_ttPromosCli.clear();

    const repository_ttImagenes = connection.getRepository('ttImagenes')as Repository<ttImagenes>;
    await
    repository_ttImagenes.clear();
    const repository_ttMovilTienda = connection.getRepository('ttMovilTienda')as Repository<ttMovilTienda>;
    await
    repository_ttMovilTienda.clear();
    const repository_ttTiendaEmpresaCliente = connection.getRepository('ttTiendaEmpresaCliente')as Repository<ttTiendaEmpresaCliente>;
    await
    repository_ttTiendaEmpresaCliente.clear();
    const repository_ttAgrupacion = connection.getRepository('ttAgrupacion')as Repository<ttAgrupacion>;
    await
    repository_ttAgrupacion.clear();
    const repository_ttIbr = connection.getRepository('ttIbr')as Repository<ttIbr>;
    await
    repository_ttIbr.clear();
    const repository_ttIbrProvincia = connection.getRepository('ttIbrProvincia')as Repository<ttIbrProvincia>;
    await
    repository_ttIbrProvincia.clear();
    const repository_ttIbrEmpresa = connection.getRepository('ttIbrEmpresa')as Repository<ttIbrEmpresa>;
    await
    repository_ttIbrEmpresa.clear();

    const repository_ttCabecera = connection.getRepository('ttCabecera')as Repository<ttCabecera>;
    await
      repository_ttCabecera.clear();
    const repository_ttLinea = connection.getRepository('ttLineaPedido')as Repository<ttLineaPedido>;
    await
      repository_ttLinea.clear();
  }*/


/*

  async procesar_datos_sincro(idtienda: number) {

    // console.log("procesar_datos_sincro->dis(paso 0):");

    const repository_ttdistribuidora = await this.connection.getRepository('ttDistribuidora')as Repository<ttDistribuidora>;
    const repository_ttTiendaEmpresaCliente = await this.connection.getRepository('ttTiendaEmpresaCliente')as Repository<ttTiendaEmpresaCliente>;

    // console.log("procesar_datos_sincro->dis(paso 1):");

    await repository_ttdistribuidora.find().then(async (distris) => {
      //console.log("procesar_datos_sincro->distribuidoras:" + JSON.stringify(distris));
      if (distris != null) {
        for (let dis of distris) {
          dis.isAsociada = 0;

          // console.log("procesar_datos_sincro->dis(paso 2):" + dis.iddistribuidora);

          await repository_ttTiendaEmpresaCliente.findOne({iddistribuidora: dis.iddistribuidora, idtienda: idtienda})
            .then((res) => {

              if (res != null) {

                //   console.log("procesar_datos_sincro->repository_ttTiendaEmpresaCliente:" + JSON.stringify(res));
                //repository_ttdistribuidora.save(dis);

                repository_ttdistribuidora
                  .createQueryBuilder()
                  .update(ttDistribuidora)
                  .set({isAsociada: 1})
                  .printSql()
                  .where("id = :id", {id: dis.id})
                  .execute();
              }


            });
        }
      }
    });
    //console.log("procesar_datos_sincro->findOne->isAsociada:");

    await repository_ttdistribuidora.findOne({isAsociada: 1}).then(async distri => {

      // console.log("procesar_datos_sincro->dis(paso 2):" + distri.iddistribuidora);


      //PROCESO DE PRECIO UNITARIO DE ARTICULOS
      //1- calcula el precio de los articulos y los almacena en un arreglo
      try {
        let tiendaempresacliente = await repository_ttTiendaEmpresaCliente.findOne({iddistribuidora: distri.iddistribuidora});
        let listaarticulos = await this.repo_ttArticulos.find({iddistribuidora: distri.iddistribuidora});
        let listaarticulos_procesado = [];

        for (let art of listaarticulos) {
          //console.log("llama_calcula_precio");
          await  this.calcularPrecioUnitario(art, distri, tiendaempresacliente, null).then((value) => {
            //console.log("llama_recupera_precio");
            art.preciounitario = <number> value;
            listaarticulos_procesado.push(art);
          });
        }
        //2-LIMPIA LA TABLA ARTICULOS de esa distri
        await this.repo_ttArticulos.createQueryBuilder('ttArticulos')
          .delete()
          .from(ttArticulo)
          .where("iddistribuidora = :iddistribuidora", {iddistribuidora: distri.iddistribuidora})
          .execute();

        //3-INSERTAMOS LOS ARTICULOS DEL ARREGLO DE ESA DISTRI.

        if (listaarticulos_procesado.length < this.MAX_SIZE) {
          this.repo_ttArticulos.insert(listaarticulos_procesado).then(() => {
          });
        } else {
          let arrays = [], size = listaarticulos_procesado.length;
          arrays = this.chunkArray(listaarticulos_procesado);
          console.log(this.TAG + "procesar_datos_sincro: Insertando chunk listaArticulo->" + arrays.length);
          for (let arr of arrays) {
            //console.log(this.TAG + "procesar_datos_sincro: Insertando chunk listaArticulo->" + arr.length);
            await this.repo_ttArticulos.insert(arr).then(() => {
            });
          }
        }
        console.log("procesar_datos_sincro: procesar_datos_sincro - proceso completo!");
      } catch (e) {
        console.log(this.TAG + "procesar_datos_sincro:  error - " + e);
      }

    });


  }
*/





  enviarPedidoPortal(json: any, idempresa: any, idsucursal: any, idfuerzaventa: any, cod_cliente: any,storage){//: Promise<string> {

    ///{servicio}/{metodo}/imei/{imei}/empresa/{empresa}/vendedor/{vendedor}/version/{version}")

    let headers: Headers = new Headers();
    let response: any;

    headers.append("Content-Type", "application/json");

    let version ="1.0";
    storage.ready().then(
      () => {
        storage.get('version_app').then((data) => {
          if (data != null) {
            version = data;

          }
        });
      });

    let url= Constantes.IP_SERVIDOR + Constantes.SERVICIO_ENVIAR_PEDIDO_PORTAL + "/empresa/" + idempresa + "/sucursal/" + idsucursal + "/fuerzaventa/" + idfuerzaventa + "/cliente/" + cod_cliente + "/origen/" + "pidoweb"+ "/version/" + version;


    return this.http.post(url
      , json, {headers: headers})
      .pipe(
        timeout(14000),
        map((response: Response) => {

            return response.json();
          }
        )

      );
  }



  procesaErrores(mensaje){


    if (mensaje != null && mensaje.includes("error_servicio")) {
      mensaje = "Lo sentimos, ocurrió un error al enviar el pedido, puede que el servidor se encuentre en mantenimiento. Error cod:(ERROR_SERVICIO) ";
    } else if (mensaje != null && mensaje.includes("error_al_guardar_pedido")) {
      mensaje = "Lo sentimos, ocurrió un error al enviar el pedido, puede que el servidor se encuentre en mantenimiento. Error cod:(error_al_guardar_pedido) ";
    } else if (mensaje != null && mensaje.includes("cliente_no_existe_o_inactivo")) {
      mensaje = "Lo sentimos, Ud. no se encuentra habilitado o no está registrado en el sistema. Error cod:(vendedor_o_imei_invalido) ";
    } else if (mensaje != null && mensaje.includes("no_se_puede_editar")) {
      mensaje = "Ups!, Su pedido no fué grabado en el sistema. Modifique o elimine las lineas con error y vuelva a enviar el pedido.";
    } else if (mensaje != null && mensaje.includes("El comprobante ya fue grabado.")) {
      mensaje = "El comprobante ya fue grabado.";

    }else if (mensaje != null && mensaje.includes("error_conexion")) {
      mensaje = "No podemos conectarnos. \\r\\n Verifique la conexión a internet y la señal de su dispositivo. Si sigue sin poder conectarse, aguarde unos minutos y vuelva a intentarlo.";

    }else if(mensaje != null && mensaje.includes("error_estructura")){
      mensaje = "Existe un error en la estructura de los datos enviados por el Portal.";
    }

    return mensaje;

  }

}
