var exec = require('cordova/exec');

var Agora = {
    initialize: function(appId, success, error) {
        exec(success, error, 'Agora', 'initialize', [appId]);
    },
    joinChannel: function(token, channelName, uid, success, error) {
        exec(success, error, 'Agora', 'joinChannel', [token, channelName, uid]);
    },
    leaveChannel: function(success, error) {
        exec(success, error, 'Agora', 'leaveChannel', []);
    },
    createMicrophoneAndCameraTracks: function(options, success, error) {
        exec(success, error, 'Agora', 'createMicrophoneAndCameraTracks', [options]);
    },
    getDevices: function(success, error) {
        exec(success, error, 'Agora', 'getDevices', []);
    }
};

module.exports = Agora;
