#!/bin/bash

set -e

echo "Construyendo aplicación SAM..."

sam build --template-file infra/template.yaml

echo "Iniciando despliegue..."

sam deploy \
  --guided \
  --template-file .aws-sam/build/template.yaml