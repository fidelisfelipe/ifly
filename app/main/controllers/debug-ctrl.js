'use strict';
angular.module('main')
.controller('DebugCtrl', function ($log, $http, $timeout, Main, Config, $cordovaDevice) {

  $log.log('Hello from your Controller: DebugCtrl in module main:. This is your controller:', this);
  var bind = this;
  // bind data from services
  this.someData = Main.someData;
  this.ENV = Config.ENV;
  this.BUILD = Config.BUILD;
  // get device info
  ionic.Platform.ready(function () {
    if (ionic.Platform.isWebView()) {
      this.device = $cordovaDevice.getDevice();
    }
  }.bind(this));

  // PASSWORD EXAMPLE
  this.password = {
    input: '', // by user
    strength: ''
  };
  this.grade = function () {
    var size = this.password.input.length;
    if (size > 8) {
      this.password.strength = 'strong';
    } else if (size > 3) {
      this.password.strength = 'medium';
    } else {
      this.password.strength = 'weak';
    }
  };
  this.grade();

  // Proxy
  this.proxyState = 'ready';
  this.proxyRequestUrl = Config.ENV.SOME_OTHER_URL + '/get';
  this.backendUri = '';
  this.backendMethod = 'GET';
  this.backendState = 'ready';
  this.backendRequestUrl = Config.ENV.DOMAIN_BACKEND_URL;
  this.proxyTest = function () {
    this.proxyState = '...';
    $http({
      method: this.backendMethod,
      url: this.urlSended
    })
    .then(function (response) {
      $log.log(response);
      this.proxyState = 'success (result printed to browser console)';
    }.bind(this))
    .then($timeout(function () {
      this.proxyState = 'ready';
    }.bind(this), 6000));
  };
  //Backend

  this.backendTest = function () {
    this.urlSended = this.backendRequestUrl + this.backendUri;
    this.backendState = '...';
    this.backendConsole = '';
    $http.get(this.backendRequestUrl + this.backendUri)
    .then(function (response) {
      bind.backendStatus = response.status;
      $log.log(response);
      this.backendConsole = response;
      this.backendState = 'success (result printed to browser console)';
    }.bind(this), function (response) {
      bind.backendStatus = response.status;
      if (response.status) {
        bind.backendConsole = response;
      }
    }).then($timeout(function () {
      this.backendState = 'ready';
    }.bind(this), 6000));
  };

});
