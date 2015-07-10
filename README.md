# cordova-plugin-hockeyapp example with tarifa

You first need to install [tarifa](http://tarifa.tools).
After cloning this repository, regenerate the cordova app with:

```
tarifa check --force --verbose
```

Edit the `tarifa.json` and change all FIXME attributes
then build the android and ios app with:

```
tarifa build ios,android -V
```

Upload the ios app and notify users:

```
tarifa hockeyapp version upload ios default --status=2 --verbose
```

Upload the android app and notify users:

```
tarifa hockeyapp version upload android default --status=2 --verbose
```
