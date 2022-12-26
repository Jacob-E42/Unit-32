process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./shoppinglist");
const items = require("./fakeDb");

let apples = { name: "apples", price: "3.00" };

beforeEach(function () {
	items.push(apples);
});

afterEach(function () {
	items.length = 0;
});

describe("GET /items", function () {
	test("gets all items in cart", async function () {
		const resp = await request(app).get("/items");
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual([apples]);
	});
});

describe("POST /items", function () {
	test("add item to cart and return new item", async function () {
		let item = { name: "cookies", price: "4.50" };
		const resp = await request(app).post("/items").send(item);
		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual({ added: { item } });
	});
});

describe("PATCH /items", function () {
	test("find and update item in items", async function () {
		const resp = await request(app).patch(`/items/${apples.name}`).send({ name: "cookies", price: "4.50" });
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({ updated: { name: "cookies", price: "4.50" } });
	});
});

describe("DELETE /items", function () {
	test("delete and item", async function () {
		const resp = await request(app).delete(`/items/${apples.name}`);
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({ message: "deleted" });
	});
});
