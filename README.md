Dev Central
-----

[![Build Status](https://travis-ci.org/mvillis/measure-mate.svg)](https://travis-ci.org/mvillis/measure-mate)
[![Coverage Status](https://coveralls.io/repos/mvillis/measure-mate/badge.svg?branch=master&service=github)](https://coveralls.io/github/mvillis/measure-mate?branch=master)
[![Stories in Progress](https://badge.waffle.io/mvillis/measure-mate.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/mvillis/measure-mate)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Demo
-----

[Live Site (hosted on Heroku)](https://measuremate.herokuapp.com)

Setup (common to both local and prod deployments)
-----

These instructions assume that you already have *npm* installed on your workstation.
The best way to do this is to just install  [NodeJS](https://nodejs.org/en/).

These instructions also assume you have a working  python 2.7.x environment running with virtualenv, setuptools and pip installed.

Run the follow commands to set up your npm dependencies and your python virtual env:

```
$ npm install -g gulp
$ npm install
$ virtualenv .venv
```

Be aware that as part of our npm install command, a gulp build will have been executed. This is done via the postinstall option in the ```package.json``` file.

```
"scripts": {
  "postinstall": "gulp build --production"
},
```

```gulp build --production``` and in particular the ```--production``` flag has the effect of
* bundling
* minifying
* gzipping

much of the css/javascript ready for the real world. If you're looking to commence development, this will be quickly overridden by raw sources in later steps.

Now go on and activate your python virtual environment:

Linux|Windows
---|---
```source .venv/bin/activate```|```.venv\Scripts\activate```

Install the project's python dependencies using pip:

```
$ pip install -r requirements/local.txt
```

In order to install mock you may need to update your versions of pip, wheel and setuptools. After creating your virtual environment the following command will do the trick:

```
$ pip install -U pip wheel setuptools
```

And you're all done setting up the basics. Follow through one of the sections below to complete your environments:
* Test
* Check coverage
* Run locally
* Run on heroku
* Run on a production server


Testing
-------

Linux|Windows
---|---
<ul><li>```export DJANGO_SETTINGS_MODULE=measure_mate.settings```</li><li>```export DATABASE_URL=sqlite:///`pwd`/measure_mate.sqlite```</li></ul> |<ul><li>```set DJANGO_SETTINGS_MODULE=measure_mate.settings```</li><li>```set DATABASE_URL=sqlite:///C:\\your_sqlite_path\\measure-matemeasure_mate.sqlite```</li></ul>

```
$ python manage.py test
```

Coverage
-------

This assumes that the env settings from the Testing section are still in place.

```
$ coverage run manage.py test
$ coverage report -m
```

Running (locally)
-------

Firstly set up some environment variables:

Linux|Windows
---|---
<ul><li>```export DJANGO_SETTINGS_MODULE=measure_mate.settings.dev```</li><li>```export DATABASE_URL=sqlite:///`pwd`/measure_mate.sqlite```</li></ul> |<ul><li>```set DJANGO_SETTINGS_MODULE=measure_mate.settings.dev```</li><li>```set DATABASE_URL=sqlite:///C:\\your_sqlite_path\\measure-matemeasure_mate.sqlite```</li></ul>

To develop you need to have both the python django development server running
as well as gulp. Gulp will detect css/js changes and auto refresh the browser as you make changes.

Process One (aka. terminal window one)
```
$ python manage.py migrate
$ python manage.py runserver
```

Process Two (aka. terminal window two)
```
$ gulp
```

If the gulp build passes, a browser window will automatically open directing you to the site.

http://locahost:3000

Gulp and Django as integrated via static files (ie. the output of the gulp process is a folder which is configured to be included in Django's static content).

If you're running OSX a sound / notification will show should the gulp watcher detect any issues in the build (eg. lint issues).

You are now free to use, change and tinker locally on Measure Mate.


Running ( special heroku setup )
------

Some custom build packs are needed in heroku to manage the collection of bower dependencies.

```
$ heroku login
...
$ heroku buildpacks:set https://github.com/ddollar/heroku-buildpack-multi.git --app measuremate
```

This will pick up the config found in ```.buildpacks```.


Running (production)
------

Given that you've completed the steps in the *setup* section, you must firstly set up some environment variables:

Linux|Windows
---|---
<ul><li>```export DJANGO_SETTINGS_MODULE=measure_mate.settings.secure```</li><li>```export DJANGO_SECRET_KEY=r@nd0m $eT 0f Ch@r@cter$```</li><li>```export DATABASE_URL=sqlite:///location/database/hopefully/not/sql.lite```</li><li>```export DJANGO_DEBUG=False```</li></ul> |<ul><li>```set DJANGO_SETTINGS_MODULE=measure_mate.settings.dev```</li><li>```set DJANGO_SECRET_KEY=r@nd0m $eT 0f Ch@r@cter$```</li><li>```set DATABASE_URL=sqlite:///C:\\ocation\\database\\hopefully\\not\\sql.lite```</li><li>```set  DJANGO_DEBUG=False```</li></ul>

Then run the following commands to collect all the static assets, setup the database and kick off the webserver:

```
$ python manage.py collectstatic
$ python manage.py migrate
$ python manage.py runserver
```

**Note:** It is not recommended to run the Django dev server (runserver) in production.

Please use a combination of apache/nginx and gunicorn. Some requirement files with the necessary pip dependencies have been added to the repository to help.

Below is what is used for heroku:

```
$ pip install -r requirements/heroku.txt
```

There are many additional steps needed to get this setup running which is not in scope of this readme.

Contributing
-------

Please read
[CONTRIBUTING.md](https://github.com/mvillis/measure-mate/blob/master/CONTRIBUTING.md) if you wish to contribute.
