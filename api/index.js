var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var authy = require('authy')(config.authyApiKey);

var user_email = null;
var authy_id = null;
var authy_url = null;
var transaction_id = null;

// Mount API routes on the Express web app
module.exports = function(app) {

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    app.post('/register', function (req, response) {
        authy.register_user(req.body.email, req.body.phone_number, req.body.country_code, function (err, res) {
            if (err) {
                console.log("ERROR:" + err);
            } else {
                authy_id = res.user.id;
                console.log("User Authy Id:  " + authy_id);
                response.json({'authy':authy_id});
            }
        });
    });

    app.post('/verify', function (req, res) {
        console.log('in verify phone');

        authy.verify(authy_id, req.body.token, false, function (err, response) {
            if (err) {
                console.log("ERROR:" + err);
            }
            else {
                res.redirect('/#2fa');
            }
        });
    });

    app.post('/softToken', function (req,res) {
        console.log("request /softToken");
        authy_id = req.body.authy;
        console.log("authy_id ="+authy_id);
        authy.request_sms(authy_id, false, function (err, response) {
            if (err) {
                console.log("ERROR:" + err);

                res.status(400).send({
                    message: err.message
                });
            }
            else{
                res.json(response);
            }
        });
    });

    app.post('/login', function (req, res) {
        console.log("request /login");
        console.log("authy_id=" +req.body.authy);

        var checkRequestStatus = function (uuid) {

            var callback = function (err, appr) {
                console.log("Checking Transaction: " + transaction_id + " with status: " + appr.approval_request.status);

                if (appr.approval_request.status == "pending") {
                    setTimeout(function () {
                        checkRequestStatus(transaction_id);
                    }, 3000);
                } else if (appr.approval_request.status == "approved" || appr.approval_request.status == "denied") {
                    res.redirect('/');
                }
            }
            authy_url = "/onetouch/json/approval_requests/" + uuid + "?api_key=" + authy.apiKey;
            authy._request("get", authy_url, null, callback);
        };

        (function () {
            authy_url = "/onetouch/json/users/" + req.body.authy + "/approval_requests?api_key=" + authy.apiKey;
            authy._request("post",
                authy_url,
                {
                    message: 'Authenticating JadoPado Test User ' + req.body.email,
                    details: {
                        'From': user_email,
                        'To': req.body.email,
                        'Account Number': req.body.acct
                    },
                    seconds_to_expire: 120
                }, function (err, authyreq) {
                    if (err) {
                        console.log(err);
                    } else {
                        transaction_id = authyreq.approval_request.uuid;
                        console.log("Transaction UUID:" + transaction_id);
                        checkRequestStatus(transaction_id);
                    }
                });
        })();
    });

// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
