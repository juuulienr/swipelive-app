package com.example.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;

public class AgoraPermissions extends CordovaPlugin {
    private static final int PERMISSION_REQUEST_CODE = 100;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("checkPermissions".equals(action)) {
            this.checkPermissions(callbackContext);
            return true;
        } else if ("requestPermissions".equals(action)) {
            this.requestPermissions(callbackContext);
            return true;
        }
        return false;
    }

    private void checkPermissions(CallbackContext callbackContext) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            boolean cameraPermission = cordova.hasPermission(Manifest.permission.CAMERA);
            boolean audioPermission = cordova.hasPermission(Manifest.permission.RECORD_AUDIO);

            if (cameraPermission && audioPermission) {
                callbackContext.success("Permissions granted");
            } else {
                callbackContext.error("Permissions not granted");
            }
        } else {
            callbackContext.success("Permissions granted");
        }
    }

    private void requestPermissions(CallbackContext callbackContext) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            String[] permissions = {
                Manifest.permission.CAMERA,
                Manifest.permission.RECORD_AUDIO
            };

            if (!cordova.hasPermission(Manifest.permission.CAMERA) || !cordova.hasPermission(Manifest.permission.RECORD_AUDIO)) {
                cordova.requestPermissions(this, PERMISSION_REQUEST_CODE, permissions);
            } else {
                callbackContext.success("Permissions already granted");
            }
        } else {
            callbackContext.success("Permissions already granted");
        }
    }

    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException {
        if (requestCode == PERMISSION_REQUEST_CODE) {
            for (int result : grantResults) {
                if (result == PackageManager.PERMISSION_DENIED) {
                    callbackContext.error("Permissions denied");
                    return;
                }
            }
            callbackContext.success("Permissions granted");
        }
    }
}
