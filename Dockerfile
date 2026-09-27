FROM nginx:stable-alpine

# OpenSSL is only used at container startup to create a local TLS certificate.
RUN apk add --no-cache openssl \
    && rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.d/15-local-tls.sh /docker-entrypoint.d/15-local-tls.sh
RUN chmod +x /docker-entrypoint.d/15-local-tls.sh

COPY site/ /usr/share/nginx/html/

EXPOSE 80 443

HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
