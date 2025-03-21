import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Test list products use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product = new Product("123", "Product", 123);
    const product2 = new Product("250", "Product A", 400);

    await productRepository.create(product);

    await productRepository.create(product2);

    const output = {
      products: [
        {
          id: "123",
          name: "Product",
          price: 123,
        },
        {
          id: "250",
          name: "Product A",
          price: 400,
        },
      ],
    };

    const result = await usecase.execute(product);

    expect(result).toEqual(output);
  });
});
