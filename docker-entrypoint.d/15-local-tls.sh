#!/bin/sh
set -eu

# Certificates are generated per container, never baked into the Docker image.
cert_dir=/etc/nginx/certs
mkdir -p "$cert_dir"

if [ ! -s "$cert_dir/localhost.crt" ] || [ ! -s "$cert_dir/localhost.key" ]; then
    umask 077
    openssl req -x509 -nodes -newkey rsa:2048 -sha256 -days 365 \
        -keyout "$cert_dir/localhost.key" \
        -out "$cert_dir/localhost.crt" \
        -subj '/CN=localhost' \
        -addext 'subjectAltName=DNS:localhost,IP:127.0.0.1,IP:::1'
    echo 'Local HTTPS certificate created for localhost.'
fi
