import{Landingpage} from './landingpage';
import{CalificacionesProducto}from './calificacionesProducto';
import{ComentariosProducto} from './comentariosProducto';
import{ImagenesProducto} from './imagenesProducto';


export class ProductResponse{
  productos:Landingpage;
  productRate:CalificacionesProducto[];
  productComment:ComentariosProducto[];
  productImage:ImagenesProducto[];
}
