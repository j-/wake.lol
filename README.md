[wake.lol][site]
================

This repo contains the [wake.lol][site] Vite project source files as well as a
[Docker][docker] file [fly.io][fly] deployment configuration.

wake.lol is a utility website for keeping your screen awake. It requires zero
installation and uses web technologies to prevent the screen from sleeping.

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

Features
--------

* Uses [screen wake lock API][wake-lock] if available
* Falls back to using invisible video if wake lock is unavailable
* CI/CD via GitHub Actions and fly.io
* Offline support via service workers
* Support for saving locally as HTML file
* Open in new window to remove browser chrome
* Themes

[site]: https://wake.lol/
[docker]: https://www.docker.com/
[fly]: https://fly.io/
[wake-lock]: https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
