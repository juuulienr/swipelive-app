var FirebasePlugin;

// Init
function onDeviceReady() {
  FirebasePlugin = window.FirebasePlugin;

  //Register handlers
  FirebasePlugin.onMessageReceived(function(message) {
    console.log(message);
    // var route = message.data.route;
    // router.push({ name: route });

    clearBadgeNumber();
    clearNotifications();
  });

  clearBadgeNumber();
  clearNotifications();
  checkNotificationPermission(false);

  if (window.cordova.platformId === "android") {
    initAndroid();
  } else if (window.cordova.platformId === "ios") {
    initIos();
  }
}

var initIos = function() {
  FirebasePlugin.onApnsTokenReceived(function(token) {
    console.log("APNS token received: " + token);
  }, function(error) {
    console.log("Failed to receive APNS token", error);
  });
};

var initAndroid = function() {
  var customChannel = {
    id: "swipelive_app",
    name: "Swipe Live App"
  };

  FirebasePlugin.createChannel(customChannel, function() {
    console.log("Created custom channel: " + customChannel.id);
  }, function(error) {
    console.log("Create channel error", error);
  });
};

// Notifications
var checkNotificationPermission = function(requested) {
  FirebasePlugin.hasPermission(function(hasPermission) {
    if (hasPermission) {
      // get token and subscribe
      console.log("Remote notifications permission granted");
      getToken();
      subscribe();
    } else if (!requested) {
      // Request permission
      console.log("Requesting remote notifications permission");
      FirebasePlugin.grantPermission(checkNotificationPermission.bind(this, true));
    } else {
      // Denied
      console.log("Notifications won't be shown as permission is denied");
    }
  });
};

var getToken = function() {
  FirebasePlugin.getToken(function(pushToken) {
    console.log("Got FCM token: " + pushToken);
    var baseUrl = window.localStorage.getItem("baseUrl");
    var token = window.localStorage.getItem("token");

    if (token) {
      window.cordova.plugin.http.setDataSerializer('json');
      window.cordova.plugin.http.post(baseUrl + "/user/api/push/add", { "pushToken": pushToken }, { Authorization: "Bearer " + token }, function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
    }
  }, function(error) {
    console.log("Failed to get FCM token", error);
  });
};

function subscribe() {
  FirebasePlugin.subscribe("user", function() {
    console.log("Subscribed to topic user");
  },function(error) {
    console.log("Failed to subscribe to topic user", error);
  });
}

function clearBadgeNumber() {
  FirebasePlugin.setBadgeNumber(0, function() {
    console.log("Cleared badge number");
  },function(error) {
    console.log("Failed to clear badge number", error);
  });
}

function clearNotifications() {
  FirebasePlugin.clearAllNotifications(function() {
    console.log("Cleared all notifications");
  },function(error) {
    console.log("Failed to clear notifications", error);
  });
}


export default {
  onDeviceReady,
  subscribe,
  clearBadgeNumber,
  getToken,
  clearNotifications,
}