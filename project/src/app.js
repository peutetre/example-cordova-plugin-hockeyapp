var qstart = require('qstart'),
    Q = require('q'),
    format = require('util').format,
    settings = require('settings'),
    Zanimo = require('zanimo'),
    $ = function (s) { return document.querySelector(s); },
    nothing = function () {};

function displayError(err) {
    window.navigator.notification.alert(err, nothing, 'Error', 'ok');
}

function log(msg) {
    return function (ans) {
        window.navigator.notification.alert(msg + ': ' + ans, nothing, 'log', 'ok');
    }
}

function onInit() {
    window.hockeyapp.start(
        log('hockeyapp initialized'),
        displayError,
        settings.hockeyapp_id,
        true,
        false,
        window.hockeyapp.loginMode.ANONYMOUS,
        null
    );
}

function onFeedback() {
    window.hockeyapp.feedback(nothing, displayError);
}

function onCrash() {
    window.hockeyapp.addMetaData(nothing, displayError, {
        thisisfromJS: 42,
        anotherattr: 'some meta data from the app...'
    });
    window.hockeyapp.forceCrash(nothing, displayError);
}

function onUpdate() {
    window.hockeyapp.checkForUpdate(log('version update checked!'), displayError);
}

function main() {
    $('#init').addEventListener('click', onInit);
    $('#crash').addEventListener('click', onCrash);
    $('#update').addEventListener('click', onUpdate);
    $('#feedback').addEventListener('click', onFeedback);
}

qstart.then(function () {
    var p = $('p.info'),
        logo = $('.main.circle');

    return Q.delay(500).then(navigator.splashscreen.hide).then(function () {
        return Q.delay(logo, 500)
            .then(Zanimo.f('transform', 'rotateZ(0deg)', 300, 'ease-in-out'));
    }).then(function () {
        p.innerHTML = format(
            '<dl><dt>name</dt><dd id="name">%s</dd><dt>id</dt><dd id="id">%s</dd><dt>version</dt><dd id="version">%s</dd></dl>',
            settings.product_name,
            settings.id,
            settings.version
        );
        return p;
    }).then(Zanimo.f('display', 'block')).then(Zanimo.f('opacity', 1, 400))
    .then(main);
});
