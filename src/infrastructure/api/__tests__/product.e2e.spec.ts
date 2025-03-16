import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
    .post("/products")
    .send({
      type: "a",
      name: "produto A",
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('produto A');
    expect(response.body.price).toBe(100);
  });

  it("should not create a product", async () => {
    const response = await request(app)
    .post("/products")
    .send({
      type: "a",
      name: "produto A",
    });

    expect(response.status).toBe(500);
  });
  it("should list all products", async () => { 

    const response = await request(app)
    .post("/products")
    .send({
      type: "a",
      name: "produto A",
      price: 100,
    });

    expect(response.status).toBe(200);
    const response2 = await request(app)
    .post("/products")
    .send({
      type: "a",
      name: "produto B",
      price: 200,
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/products").send();
    
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    expect(listResponse.body.products[0].name).toBe("produto A");
    expect(listResponse.body.products[0].price).toBe(100);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("produto B");
    expect(product2.price).toBe(200);
  });

});
