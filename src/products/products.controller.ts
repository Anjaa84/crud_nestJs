import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { stringify } from "querystring";
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Post()
    addProduct
        (@Body('title') prodTitle: string,
            @Body('description') prodDesc: string,
            @Body('price') prodPrice: number,
    ) {
        const generateId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
            prodRegId
        );
        return { id: generateId };

    }


    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId)

    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,

    ) {

        return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);


    }


    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productsService.deleteProduct(prodId);
        return null;

    }





}




