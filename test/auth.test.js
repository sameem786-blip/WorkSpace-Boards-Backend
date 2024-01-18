const assert = require("assert");
const supertest = require("supertest");
const app = require("../app"); // Replace this with the path to your Express app file
const User = require("../schemas/User"); // Replace this with the path to your User model file

//signup
describe("User Signup API", () => {
  it("should create a new user", async () => {
    const response = await supertest(app).post("/auth/user/signup").send({
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "testpassword",
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "User Created Successfully");
    assert.strictEqual(typeof response.body.user, "object");
  });

  it("should return an error if the user already exists", async () => {
    const existingUser = {
      username: "existinguser",
      firstName: "Existing",
      lastName: "User",
      email: "existing@example.com",
      encryptedPassword: "existingpassword",
    };

    // Create an existing user
    await User.create(existingUser);

    const response = await supertest(app)
      .post("/auth/user/signup")
      .send(existingUser);

    assert.strictEqual(response.status, 409);
    assert.strictEqual(response.text, '"User already exists"');
  });
});
