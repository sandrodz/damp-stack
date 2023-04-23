FROM php:7.2-fpm-alpine
RUN apk add --no-cache \
        freetype-dev libpng-dev libjpeg-turbo-dev gettext-dev \
        freetype libpng libjpeg-turbo gettext && \
    docker-php-ext-configure gd \
        --with-freetype-dir=/usr/include/ \
        --with-png-dir=/usr/include/ \
        --with-jpeg-dir=/usr/include/ && \
    docker-php-ext-install gd mysqli pdo_mysql gettext opcache iconv && \
    apk del --no-cache \
        freetype-dev libpng-dev libjpeg-turbo-dev gettext-dev
RUN { \
    echo 'access.format = "%f %{HTTP_X_REAL_IP}e - [%t] %m %s %{HTTP_USER_AGENT}e"'; \
} > /usr/local/etc/php-fpm.d/error.conf
# wp cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp
RUN apk add --update --no-cache less # Fixes error with wp cli, less: unrecognized option: r.
# composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Fix https://github.com/docker-library/php/issues/240
RUN apk add --upgrade gnu-libiconv
ENV LD_PRELOAD /usr/lib/preloadable_libiconv.so
