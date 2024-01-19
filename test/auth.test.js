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
      password: "Testpassword8",
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "User Created Successfully");
    assert.strictEqual(typeof response.body.user, "object");
  });

  it("should return an error if the user already exists", async () => {
    const existingUser = {
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "Testpassword8",
    };

    const response = await supertest(app)
      .post("/auth/user/signup")
      .send(existingUser);

    assert.strictEqual(response.status, 409);
    assert.strictEqual(response.text, '"User already exists"');
  });
  it("should return 400 for invalid email syntax", async () => {
    const response = await supertest(app).post("/auth/user/signup").send({
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "invalid-email",
      password: "Testpassword8",
    });

    assert.strictEqual(response.status, 400);
  });

  // Assuming you have a helper function testPasswordSyntax
  it("should return 400 for invalid password syntax", async () => {
    const response = await supertest(app).post("/auth/user/signup").send({
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "weak", // Invalid password
    });

    assert.strictEqual(response.status, 400);
  });

  it("should create a new user and not include password in the response", async () => {
    const response = await supertest(app).post("/auth/user/signup").send({
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "StrongPass123",
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "User Created Successfully");
    assert.ok(response.body.user, "Response should have a user property");
    assert.ok(
      !response.body.user.hasOwnProperty("encryptedPassword"),
      "User object should not have encryptedPassword"
    );

    // Optionally, you can check other properties of the user object
    // assert.strictEqual(response.body.user.username, "testuser");
    // assert.strictEqual(response.body.user.firstName, "Test");
    // assert.strictEqual(response.body.user.lastName, "User");
    // assert.strictEqual(response.body.user.email, "testuser@example.com");

    // Check if the user is actually saved in the database
    // const savedUser = await User.findOne({ email: "testuser@example.com" });
    // assert.ok(savedUser, "User should be saved in the database");
    // assert.strictEqual(savedUser.username, "testuser");
    // Add more assertions as needed based on your schema

    User.deleteOne({ email: "test@example.com" });
    User.deleteOne({ email: "testuser@example.com" });
  });
});
