import { Image } from './images/image';
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
}