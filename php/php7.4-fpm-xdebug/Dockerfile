FROM php:7.4-fpm-alpine
RUN apk add --no-cache \
        freetype-dev libpng-dev libjpeg-turbo-dev gettext-dev \
        freetype libpng libjpeg-turbo gettext libxml2-dev autoconf gcc g++ make && \
    docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg && \
    docker-php-ext-install gd mysqli pdo_mysql gettext opcache soap && \
    apk del --no-cache \
        freetype-dev libpng-dev libjpeg-turbo-dev gettext-dev
RUN pecl install xdebug-3.1.6 && docker-php-ext-enable xdebug
RUN { \
    echo 'access.format = "%f %{HTTP_X_REAL_IP}e - [%t] %m %s %{HTTP_USER_AGENT}e"'; \
} > /usr/local/etc/php-fpm.d/error.conf
# ioncube
RUN curl -o ioncube.tar.gz http://downloads3.ioncube.com/loader_downloads/ioncube_loaders_lin_aarch64.tar.gz && \
    tar -xvvzf ioncube.tar.gz && \
    mv ioncube/ioncube_loader_lin_7.4.so `php-config --extension-dir` && \
    rm -Rf ioncube.tar.gz ioncube && \
    docker-php-ext-enable ioncube_loader_lin_7.4
# wp cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp
RUN apk add --update --no-cache less # Fixes error with wp cli, less: unrecognized option: r.
# composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

