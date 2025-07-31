-include .env.mk

.PHONY: all build deploy stop_service start_service copy_files test local
all: local

# ── deployment settings ────────────────────────────────────────────────────────
NAS_USER     ?= user
NAS_IP       ?= 192.168.1.100
NAS_DEST     ?= /tmp/deploy
NAS_SERVICE  ?= site_service

# ── build settings ─────────────────────────────────────────────────────────────
BUILD_DIR    := build
BINARY_NAME  := resume_site

GOOS         := linux
GOARCH       := amd64
CGO_ENABLED  := 0

build:
	@echo "Building frontend..."
	go run release/frontend.go
	
	@echo "Building $(BINARY_NAME)..."
	# make sure build dir exists
	mkdir -p $(BUILD_DIR)
	# (b) compile release.go into a self‑contained Linux binary
	GOOS=$(GOOS) GOARCH=$(GOARCH) CGO_ENABLED=$(CGO_ENABLED) \
	  go build -ldflags="-s -w" \
	    -o $(BUILD_DIR)/$(BINARY_NAME) release/release.go

stop_service:
	@echo "Stopping $(NAS_SERVICE) on NAS..."
	ssh $(NAS_USER)@$(NAS_IP) "./stop_service.sh"

copy_files:
	@echo "Uploading binary..."
	scp -O $(BUILD_DIR)/$(BINARY_NAME) $(NAS_USER)@$(NAS_IP):$(NAS_DEST)

start_service:
	@echo "Starting $(NAS_SERVICE) on NAS..."
	ssh $(NAS_USER)@$(NAS_IP) "./start_service.sh"

deploy: build stop_service copy_files start_service
	@echo "✅ Deployment complete."

test:
	go test ./backend/

local:
	go run resume/local

