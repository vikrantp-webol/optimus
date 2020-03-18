FROM docker.eloquent.co/optixsolutions/laravel-docker-image:7.2

WORKDIR /home/app

COPY . /home/app

RUN rm -rf /var/www/html \
    && ln -s /home/app/public /var/www/html \
    && chown -R www-data:www-data ./storage ./bootstrap/cache
