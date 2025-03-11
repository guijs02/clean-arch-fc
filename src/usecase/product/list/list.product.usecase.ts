import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputListProductDto,
  OutputListProductDto,
} from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.productRepository = ProductRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDto {
    return {
      products: products.map((customer) => ({
        id: customer.id,
        name: customer.name,
        price: customer.price
      })),
    };
  }
}
