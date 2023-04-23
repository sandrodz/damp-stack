FROM php:7.0-fpm-alpine
RUN apk add --no-cache \
        freetype-dev libpng-dev libjpeg-turbo-dev libmcrypt-dev gettext-dev \
        freetype libpng libjpeg-turbo libmcrypt gettext && \
    docker-php-ext-configure gd \
        --with-freetype-dir=/usr/include/ \
        --with-png-dir=/usr/include/ \
        --with-jpeg-dir=/usr/include/ && \
    docker-php-ext-install gd mcrypt mysqli pdo_mysql gettext opcache iconv && \
    apk del --no-cache \
        freetype-dev libpng-dev libjpeg-turbo-dev libmcrypt-dev gettext-dev
RUN { \
    echo 'access.format = "%f %{HTTP_X_REAL_IP}e - [%t] %m %s %{HTTP_USER_AGENT}e"'; \
} > /usr/local/etc/php-fpm.d/error.conf
# Fix https://github.com/docker-library/php/issues/240
RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.12/community/ gnu-libiconv=1.15-r2
ENV LD_PRELOAD /usr/lib/preloadable_libiconv.so
