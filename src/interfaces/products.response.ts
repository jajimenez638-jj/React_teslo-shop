import type { Product } from "./product.interfaces";

export interface ProductsResponse {
    count: number;
    pages: number;
    products: Product[];
}

