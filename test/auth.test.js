const assert = require("assert");
const supertest = require("supertest");
const app = require("../app"); // Replace this with the path to your Express app file
const User = require("../schemas/User"); // Replace this with the path to your User model file

const request = supertest(app);

// Helper function to create a new user
async function createUser(userData) {
  return request.post("/auth/user/signup").send(userData);
}

// Helper function to perform user login
async function loginUser(credentials) {
  return request.post("/auth/user/login").send(credentials);
}

describe("User Signup and Login API", () => {
  // ...

  afterEach(async () => {
    // Cleanup logic to delete users created during tests
    await User.deleteMany({});
  });

  after(async () => {
    // Additional cleanup if needed after the entire test suite
    // Example: Disconnecting from the database
    // await mongoose.connection.close();
  });
});
describe("User Signup API", () => {
  it("should create a new user", async () => {
    const response = await createUser({
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

    const response = await createUser(existingUser);

    assert.strictEqual(response.status, 409);
    assert.strictEqual(response.text, '"User already exists"');
  });

  // ... other signup tests ...

  it("should create a new user and not include password in the response", async () => {
    const response = await createUser({
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
  });
});

describe("User Login API", () => {
  it("should return a token on successful login", async () => {
    const response = await loginUser({
      email: "test@example.com",
      password: "Testpassword8",
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, "Login successful");
    assert.strictEqual(typeof response.body.user, "object");
    assert.strictEqual(response.body.user.email, "test@example.com");
    assert.ok(response.body.hasOwnProperty("token"));
  });

  it("should return a 404 status if the user does not exist", async () => {
    const response = await loginUser({
      email: "nonexistent@example.com",
      password: "testpassword",
    });

    assert.strictEqual(response.status, 404);
    assert.deepStrictEqual(response.body, { message: "User does not exists" });
  });

  it("should return a 401 status if the password is incorrect", async () => {
    const response = await loginUser({
      email: "test@example.com",
      password: "wrongpassword",
    });

    assert.strictEqual(response.status, 401);
    assert.deepStrictEqual(response.body, { message: "Incorrect password" });
  });
});

describe("User Signup and Login API", async () => {
  await User.deleteOne({ email: "test@example.com" });
  await User.deleteOne({ email: "testuser@example.com" });
});
