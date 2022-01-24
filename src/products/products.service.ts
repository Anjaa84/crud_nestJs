import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model'

@Injectable()
export class ProductsService {

    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {


        const id = Math.random().toString();
        const newProduct = new Product(id, title, desc, price);
        this.products.push(newProduct);
        return id;
    }


    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {

        const product = this.findProduct(productId)[0];
        return { ...product }
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        console.log(title)
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.desc = desc;
        }

        if (price) {
            updatedProduct.price = 2000;
        }
        this.products[index] = updatedProduct;

        return { ...updatedProduct }




    }


    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }


    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Could not and never be founded');
        }

        return [product, productIndex];

    }
}