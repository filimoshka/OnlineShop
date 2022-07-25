const request = require("supertest");
const app = require("../index");

describe("User registration test", () => {
    test("should return error", async () => {
        const user = {
            email:"user1",
            password: "123"
        }
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toStrictEqual("Пользователь с таким email уже существует")
    });
    test("should be successful", async () => {
        const user = {
            email:"user5",
            password: "123"
        }
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.statusCode).toBe(200);
    });
})