import { Image } from './images/image';
import {ProductComment} from './productComments';
import { ProductCategory } from './productCategory';
export class Product{
    productId: number;
    productName: string;
    productBrand: string;
    productModel: string;
    productDescription: string;
    productPrice: number;
    productQuantity: number;
    productDate: string;
    productImage: Image[] = [];
    productComments: ProductComment[] = [];
    productCategory: ProductCategory;
}