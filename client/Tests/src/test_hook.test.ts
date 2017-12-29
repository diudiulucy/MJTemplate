describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
    console.log("before");
  });

  after(function() {
    // runs after all tests in this block
     console.log("after");
  });

  beforeEach(function() {
    // runs before each test in this block
    console.log("beforeEach");
  });

  afterEach(function() {
    // runs after each test in this block
    console.log("afterEach");
  });

  // test cases
});