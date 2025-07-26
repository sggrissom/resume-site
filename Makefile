-include .env.mk

NAS_USER ?= user
NAS_IP ?= 192.168.1.100
NAS_DEST ?= /tmp/deploy
NAS_SERVICE ?= site_service

SRC_DIR := src
BUILD_DIR := build
BINARY_NAME := resume_site
HTML_DIR := html
STATIC_DIR := static

GOOS := linux
GOARCH := amd64
CGO_ENABLED := 0

.PHONY: all build deploy stop_service start_service copy_files

all: deploy

build:
	@echo "Building $(BINARY_NAME)..."
	mkdir -p $(BUILD_DIR)
	cd $(SRC_DIR) && GOOS=$(GOOS) GOARCH=$(GOARCH) CGO_ENABLED=$(CGO_ENABLED) \
		go build -ldflags="-X main.isProd=true" -o ../$(BUILD_DIR)/$(BINARY_NAME)

stop_service:
	@echo "Stopping $(NAS_SERVICE) on NAS..."
	ssh $(NAS_USER)@$(NAS_IP) "./stop_service.sh"

start_service:
	@echo "Starting $(NAS_SERVICE) on NAS..."
	ssh $(NAS_USER)@$(NAS_IP) "./start_service.sh"

copy_files:
	@echo "Copying binary..."
	scp -O $(BUILD_DIR)/$(BINARY_NAME) $(NAS_USER)@$(NAS_IP):$(NAS_DEST)/
	@echo "Copying HTML..."
	scp -O -r $(HTML_DIR) $(NAS_USER)@$(NAS_IP):$(NAS_DEST)/
	@echo "Copying static..."
	scp -O -r $(STATIC_DIR) $(NAS_USER)@$(NAS_IP):$(NAS_DEST)/

deploy: build stop_service copy_files start_service
	@echo "✅ Deployment complete."

