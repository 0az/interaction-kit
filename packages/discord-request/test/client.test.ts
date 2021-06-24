describe("rate limits", () => {
	test.todo("should throttle global rate limits");

	test.todo("should respond to immediate 429 global limits");

	test.todo("should clear global timeouts based on headers");

	test.todo("should limit all buckets for global rate limit");

	test.todo("should throttle bucket rate limits");

	test.todo("should respond to immediate 429 local limits");

	test.todo("should clear local timeout based on headers");

	test.todo("should only limit local bucket for rate limit");
});

describe("buckets", () => {
	test.todo("should alert to unknown HTTP status");

	test.todo("should alert to incorrect bucket assignment");
});

describe("client", () => {
	test.todo("should require bucket information");

	test.todo("should return a singleton");

	test.todo("should expose HTTP methods");

	test.todo("should lazily initialize buckets");

	test.todo("should accept fetch parameters in HTTP methods");
});
