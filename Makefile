.PHONY: all build deploy test local
all: local

# ── deployment settings ────────────────────────────────────────────────────────
APP_NAME     := resume
DEPLOY_HOST  := vps

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
	mkdir -p $(BUILD_DIR)
	GOOS=$(GOOS) GOARCH=$(GOARCH) CGO_ENABLED=$(CGO_ENABLED) \
	  go build -tags=release -ldflags="-s -w" \
	    -o $(BUILD_DIR)/$(BINARY_NAME) release/release.go

deploy: build
	deploy $(APP_NAME) $(DEPLOY_HOST) $(BUILD_DIR)/$(BINARY_NAME)

test:
	go test ./backend/

local:
	go run resume/local

