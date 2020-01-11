import{Landingpage} from './landingpage';
import{CalificacionesProducto}from './calificacionesProducto';
import{ComentariosProducto} from './comentariosProducto';
import{ImagenesProducto} from './imagenesProducto';


export class ProductResponse{
  productos:Landingpage;
  calificacionesProducto:CalificacionesProducto[];
  comentariosProducto:ComentariosProducto[];
  imagenesProducto:ImagenesProducto[];
}
