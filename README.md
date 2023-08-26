[wake.lol][site]
================

This repo contains the [wake.lol][site] Vite project source files as well as a
[Docker][docker] file [fly.io][fly] deployment configuration.

Installing
----------

    $ npm i

Development server
------------------

    $ npm run dev

Build + export
--------------

    $ npm run build

Docker build
------------

    $ docker build -t wake.lol .

Deploy
------

Will build and deploy remotely. A local Docker build is not required.

    $ fly deploy

[site]: https://wake.lol/
[docker]: https://www.docker.com/
[fly]: https://fly.io/
