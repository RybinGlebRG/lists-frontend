DOCKER_REGISTRY?=registry.example.com:443


.PHONY: all clean build

all: clean build

clean:
	touch ./build && rm -r ./build
	touch ./node_modules && rm -r ./node_modules

build:
	./build.sh "$(DOCKER_REGISTRY)"

