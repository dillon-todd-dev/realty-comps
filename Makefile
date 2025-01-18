.PHONY: build-development
build-development:
	docker compose -f docker/development/compose.yaml build

.PHONY: start-development
start-development:
	docker compose -f docker/development/compose.yaml up

.PHONY: stop-development
stop-development:
	docker compose -f docker/development/compose.yaml down

.PHONY: build-production
build-production:
	docker compose -f docker/production/compose.yaml build

.PHONY: start-production
start-production:
	docker compose -f docker/production/compose.yaml up

.PHONY: stop-production
stop-production:
	docker compose -f docker/production/compose.yaml down
