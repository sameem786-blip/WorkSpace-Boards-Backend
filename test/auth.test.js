const assert = require("assert");
const supertest = require("supertest");
const app = require("../app"); // Replace this with the path to your Express app file
const User = require("../schemas/User");
const sinon = require("sinon");
const helpers = require("../helpers/index");

const request = supertest(app);

// Helper function to create a new user
async function createUser(userData) {
  return request.post("/auth/user/signup").send(userData);
}

// Helper function to perform user login
async function loginUser(credentials) {
  return request.post("/auth/user/login").send(credentials)
}

// describe("User Signup and Login API", () => {
//   // ...

//   afterEach(async () => {
//     // Cleanup logic to delete users created during tests
//     await User.deleteMany({});
//   });

//   after(async () => {
//     // Additional cleanup if needed after the entire test suite
//     // Example: Disconnecting from the database
//     // await mongoose.connection.close();
//   });
// });
// describe("User Signup API", () => {
//   it("should create a new user", async () => {
//     const response = await createUser({
//       username: "testuser",
//       firstName: "Test",
//       lastName: "User",
//       email: "test@example.com",
//       password: "Testpassword8",
//     });

//     assert.strictEqual(response.status, 200);
//     assert.strictEqual(response.body.message, "User Created Successfully");
//     assert.strictEqual(typeof response.body.user, "object");
//   });

//   it("should return an error if the user already exists", async () => {
//     const existingUser = {
//       username: "testuser",
//       firstName: "Test",
//       lastName: "User",
//       email: "test@example.com",
//       password: "Testpassword8",
//     };

//     const response = await createUser(existingUser);

//     assert.strictEqual(response.status, 409);
//     assert.strictEqual(response.text, '"User already exists"');
//   });

//   // ... other signup tests ...

//   it("should create a new user and not include password in the response", async () => {
//     const response = await createUser({
//       username: "testuser",
//       firstName: "Test",
//       lastName: "User",
//       email: "testuser@example.com",
//       password: "StrongPass123",
//     });

//     assert.strictEqual(response.status, 200);
//     assert.strictEqual(response.body.message, "User Created Successfully");
//     assert.ok(response.body.user, "Response should have a user property");
//     assert.ok(
//       !response.body.user.hasOwnProperty("encryptedPassword"),
//       "User object should not have encryptedPassword"
//     );
//   });
// });

// describe("User Login API", () => {
//   it("should return a token on successful login", async () => {
//     const response = await loginUser({
//       email: "test@example.com",
//       password: "Testpassword8",
//     });

//     assert.strictEqual(response.status, 200);
//     assert.strictEqual(response.body.message, "Login successful");
//     assert.strictEqual(typeof response.body.user, "object");
//     assert.strictEqual(response.body.user.email, "test@example.com");
//     assert.ok(response.body.hasOwnProperty("token"));
//   });

//   it("should return a 404 status if the user does not exist", async () => {
//     const response = await loginUser({
//       email: "nonexistent@example.com",
//       password: "testpassword",
//     });

//     assert.strictEqual(response.status, 404);
//     assert.deepStrictEqual(response.body, { message: "User does not exists" });
//   });

//   it("should return a 401 status if the password is incorrect", async () => {
//     const response = await loginUser({
//       email: "test@example.com",
//       password: "wrongpassword",
//     });

//     await User.deleteOne({ email: "test@example.com" });
//     await User.deleteOne({ email: "testuser@example.com" });

//     assert.strictEqual(response.status, 401);
//     assert.deepStrictEqual(response.body, { message: "Incorrect password" });
//   });
// });

describe("sendOTP", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should send OTP and return success message", async () => {
    // Mocking User.findOne response
    const findOneStub = sandbox.stub(User, "findOne");
    const userResponse = {
      email: "sameembbs@gmail.com",
      firstName: "Tester",
      OTP: null,
      resetPasswordExpires: null,
      save: sandbox.stub().resolves(), // Mock the save method
    };
    findOneStub
      .withArgs({ email: "sameembbs@gmail.com" })
      .resolves(userResponse);

    // Mocking generateOTP function
    const generateOTPStub = sandbox
      .stub(helpers, "generateOTP")
      .returns("1234");

    // Mocking generateEmail function
    const generateEmailStub = sandbox.stub(helpers, "generateEmail").resolves();

    // Supertest to test the endpoint
    const response = await request
      .post("/auth/user/forgetPassword/sendOTP")
      .send({ email: "sameembbs@gmail.com" });

    assert.equal(response.status, 200);
    assert.deepStrictEqual(response.body, { message: "OTP sent to email." });

    // Assertions for the function calls
    assert.ok(findOneStub.calledOnceWith({ email: "sameembbs@gmail.com" }));
    assert.ok(generateOTPStub.calledOnce);
    assert.ok(generateEmailStub.calledOnce);

    // Additional assertions based on your requirements
    // For example, check the content of the email, etc.

    // Verify that the save method was called on the userResponse object
    assert.ok(userResponse.save.calledOnce);
  });

  it("should handle the case where the user does not exist", async () => {
    // Mocking User.findOne response
    const findOneStub = sandbox.stub(User, "findOne");
    findOneStub.withArgs({ email: "nonexistent@example.com" }).resolves(null);

    // Supertest to test the endpoint
    const response = await request
      .post("/auth/user/forgetPassword/sendOTP") // Replace with the actual endpoint path
      .send({ email: "nonexistent@example.com" });

    assert.equal(response.status, 404);
    assert.deepStrictEqual(response.body, { message: "User does not exist" });

    // Assertions for the function calls
    assert.ok(findOneStub.calledOnce);
  });

  // Add more test cases as needed
});
