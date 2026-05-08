const request = require("supertest");
const app = require("../server");

describe("Todo API", () => {
  test("GET / should return API running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Todo API is running");
  });

  test("GET /api/todos should return todos array", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/todos should create a todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ task: "Finish Assignment 2" });

    expect(res.statusCode).toBe(201);
    expect(res.body.task).toBe("Finish Assignment 2");
  });
});