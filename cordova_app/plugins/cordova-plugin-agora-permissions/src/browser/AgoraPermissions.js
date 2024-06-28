var AgoraPermissions = {
    checkPermissions: function(success, error) {
      console.log(success);
      console.log(error);
        // Implémentation web pour vérifier les permissions
        success({ camera: true, microphone: true });
        error({ camera: false, microphone: false });
    },
    requestPermissions: function(success, error) {
      console.log(success);
      console.log(error);
        // Implémentation web pour demander les permissions
        success({ camera: true, microphone: true });
        error({ camera: false, microphone: false });
    }
};

module.exports = AgoraPermissions;

require('cordova/exec/proxy').add('AgoraPermissions', AgoraPermissions);
