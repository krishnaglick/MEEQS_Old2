REPORTER = spec

test-w:
	./node_modules/.bin/mocha --reporter $(REPORTER) --watch --ui bdd ./tests/bootstrap.test.js ./tests/unit/**/*.test.js

.PHONY: test-w