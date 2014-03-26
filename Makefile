TESTS = $(shell find test -type f -name "*.test.js" | sort)
REPORTER = tap
TIMEOUT = 30000
MOCHA_OPTS = --check-leaks

node_modules:
	@npm install

jshint:
	@-./node_modules/.bin/jshint ./

eslint:
	@-./node_modules/.bin/eslint ./controllers

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--harmony-generators \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)
	@-$(MAKE) check-coverage

check-coverage:
	@./node_modules/.bin/istanbul check-coverage \
		--statements 100 \
		--functions 100 \
		--branches 100 \
		--lines 100

web:
	@DEBUG=koa:*,bit:* node --harmony \
		servers/web.js

.PHONY: test jshint eslint web
