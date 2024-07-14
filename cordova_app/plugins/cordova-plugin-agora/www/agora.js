var exec = require('cordova/exec');

var Agora = {
  initialize: function(appId, success, error) {
    console.log('Agora initialize js called with appId:', appId);
    exec(function(response) {
      console.log('Agora initialize js success:', response);
      success(response);
    }, function(err) {
      console.error('Agora initialize js error:', err);
      error(err);
    }, 'AgoraPlugin', 'initialize', [appId]);
  },
  joinChannel: function(token, channelName, uid, success, error) {
    console.log('Agora joinChannel called with token:', token, 'channelName:', channelName, 'uid:', uid);
    exec(function(response) {
      console.log('Agora joinChannel success:', response);
      success(response);
    }, function(err) {
      console.error('Agora joinChannel error:', err);
      error(err);
    }, 'AgoraPlugin', 'joinChannel', [token, channelName, uid]);
  },
  leaveChannel: function(success, error) {
    console.log('Agora leaveChannel called');
    exec(function(response) {
      console.log('Agora leaveChannel success:', response);
      success(response);
    }, function(err) {
      console.error('Agora leaveChannel error:', err);
      error(err);
    }, 'AgoraPlugin', 'leaveChannel', []);
  },
  createMicrophoneAndCameraTracks: function(options, success, error) {
    console.log('Agora createMicrophoneAndCameraTracks called with options:', options);
    exec(function(response) {
      console.log('Agora createMicrophoneAndCameraTracks success:', response);
      success(response);
    }, function(err) {
      console.error('Agora createMicrophoneAndCameraTracks error:', err);
      error(err);
    }, 'AgoraPlugin', 'createMicrophoneAndCameraTracks', [options]);
  },
  sharedRtcEngine: function(success, error) {
    exec(function(response) {
      console.log('Agora sharedRtcEngine success:', response);
      success(response);
    }, function(err) {
      console.error('Agora sharedRtcEngine error:', err);
      error(err);
    }, 'AgoraPlugin', 'getSharedRtcEngine', []);
  },
  setupLocalVideo: function(options, success, error) {
    exec(success, error, 'AgoraPlugin', 'setupLocalVideo', [options]);
  }
};

module.exports = Agora;
