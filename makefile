.PHONY: dev build-dev bash-dev stop-dev rm-dev prod stop-prod rm-prod help
.DEFAULT_GOAL: help

default: help

help: ## Output available commands
	@echo "Available commands:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

bash-app: ## Open a bash console into the dev container
	@docker exec -ti tunebook-app bash

rebuid-app:
	@docker stop tunebook-app
	@docker rm tunebook-app
	@docker-compose -f docker/development/docker-compose.yml up -d --build client 

dev:  ## Run a development environment on port 80
	@docker-compose -f docker/development/docker-compose.yml up -d

build-dev:  ## Force building image and run a development environment on port 3001
	@docker-compose -f docker/development/docker-compose.yml up --build -d

stop-dev:  ## Stops the development environment on port 80
	@docker-compose -f docker/development/docker-compose.yml stop

rm-dev:  ## Stops and remove development environment
	@docker-compose -f docker/development/docker-compose.yml down --rmi all

prod: ## Run a production environment on port 80
	@docker-compose -f docker/production/docker-compose.yml up --build -d

stop-prod:  ## Stops the production environment on port 80
	@docker-compose -f docker/production/docker-compose.yml stop

rm-prod:  ## Stops and remove development environment
	@docker-compose -f docker/production/docker-compose.yml down --rmi all
