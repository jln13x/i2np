gen:
	rm -rf ./src/generated
	npx @openapitools/openapi-generator-cli generate
	mkdir -p ./src/generated/api/interfaces
	cp -r ./generated-tmp/interfaces ./src/generated/api
	rm -rf ./generated-tmp