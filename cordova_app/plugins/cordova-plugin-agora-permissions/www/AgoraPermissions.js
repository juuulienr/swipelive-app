var exec = require('cordova/exec');

var AgoraPermissions = {
    checkPermissions: function(success, error) {
        exec(success, error, 'AgoraPermissions', 'checkPermissions', []);
    },
    requestPermissions: function(success, error) {
        exec(success, error, 'AgoraPermissions', 'requestPermissions', []);
    }
};

module.exports = AgoraPermissions;
