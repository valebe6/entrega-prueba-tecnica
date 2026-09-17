#!/bin/bash

set -e

echo "Eliminando stack AWS..."

aws cloudformation delete-stack \
  --stack-name prueba-tecnica