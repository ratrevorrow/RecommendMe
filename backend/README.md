# Steps to reproduce project from scratch on macOS using python3

Using [this](https://www.enterprisedb.com/postgres-tutorials/how-use-postgresql-django) as a reference.

``Note: Ensure you are using python3``

1. Install virtualenv: `sudo pip install virtualenv`.
2. Create virtual environment files and folders: `virtualenv env`.
3. To switch to the virtual environment, run: `source env/bin/activate`. Ensure you are running python3 by running `python --version`.
4. Google how to install ``pg_config``, then export necessary path. `which pg_config` to confirm.
5. Install psycopg2 to link python with postgresql: `pip install psycopg2`.
6. Install django: `pip install django`.
7. `django-admin.py startproject main .`.
8. Edit your DATABASES variable inside main/settings.py to look like the following:

    ```DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': ‘<db_name>’,
            'USER': '<db_username>',
            'PASSWORD': '<password>',
            'HOST': '<db_hostname_or_ip>',
            'PORT': '<db_port>',
        }
    }
    ```

9. add XYZ to INSTALLED_APPS in main/settings.py
10. Run `python manage.py makemigrations` to see if any changes have been detected. (There shouldn't be any for now)
11. Run `python manage.py migrate`. May or may not see changes. I didn't.
12. Run `python manage.py createsuperuser` and follow the steps to create user for database.
13. Run `python manage.py runserver 0.0.0.0:5000` and navigate to ``http://localhost:5000/`` and ensure a successful UI appears in your browser.
14. Ensure your user is connected by going to ``http://localhost:5000/admin``. Enter in the username and password used to create superuser.
15. Create the users package with `python manage.py startapp users`.
16. Add ``users`` to ``INSTALLED_APPS`` in ``main/settings.py``.
17. Repeat steps 10 and 11.
18. Google and install pgAdmin. Once running, go to database and ensure users.user table has been created.
19. `pip install djangorestframework`.

Run application with step 13: `python manage.py runserver 0.0.0.0:5000`.

1. [Deploy app on Heroku tutorial1](https://medium.com/@hdsingh13/deploying-django-app-on-heroku-with-postgres-as-backend-b2f3194e8a43)
2. [Deploy app on Heroku tutorial2](https://medium.com/@BennettGarner/deploying-django-to-heroku-connecting-heroku-postgres-fcc960d290d1)

Fun facts:
Wrap up dependencies into a requirements.txt file by running the command: `pip freeze > requirements.txt`.
