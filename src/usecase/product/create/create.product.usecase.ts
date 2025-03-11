import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import { v4 as uuid } from "uuid";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import ProductFactory from '../../../domain/product/factory/product.factory';
import Product from '../../../domain/product/entity/product';

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(
      input.type,
      input.name,
      input.price
    );

    var entity = new Product(product.id, product.name, product.price);
    
    await this.productRepository.create(entity);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
