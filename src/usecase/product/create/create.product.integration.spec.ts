import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create a product use case", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();

    const createUseCase = new CreateProductUseCase(productRepository);
    
    const input = {
        type: "a",
        name: "Product",
        price: 123
    };
    
    const result = await createUseCase.execute(input);
    
    const output = {
        id : result.id,
        name: "Product",
        price: 123,
    };

    expect(result).toEqual(output);
  });
});
