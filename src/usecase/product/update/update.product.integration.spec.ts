import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test update a product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const updateUseCase = new UpdateProductUseCase(productRepository);

    const createUseCase = new CreateProductUseCase(productRepository);

    const {id} = await createUseCase.execute({type: "a", name: "Lego", price: 123});

    const result = await updateUseCase.execute({id: id, name: "Caneca bonita", price: 300});

    const output = {
      id: id,
      name: "Caneca bonita",
      price: 300,
    };

    expect(result).toEqual(output);
  });
});
