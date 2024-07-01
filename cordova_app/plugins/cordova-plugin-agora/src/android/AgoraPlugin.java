package com.example.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.agora.rtc.RtcEngine;
import io.agora.rtc.video.VideoCanvas;
import io.agora.rtc.video.VideoEncoderConfiguration;
import io.agora.rtc.IRtcEngineEventHandler;

public class AgoraPlugin extends CordovaPlugin {
    private RtcEngine rtcEngine;
    private final IRtcEngineEventHandler rtcEventHandler = new IRtcEngineEventHandler() {
        @Override
        public void onJoinChannelSuccess(String channel, int uid, int elapsed) {
            super.onJoinChannelSuccess(channel, uid, elapsed);
        }
    };

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "initialize":
                initialize(args.getString(0), callbackContext);
                return true;
            case "joinChannel":
                joinChannel(args.getString(0), args.getString(1), args.getInt(2), callbackContext);
                return true;
            case "leaveChannel":
                leaveChannel(callbackContext);
                return true;
            case "createMicrophoneAndCameraTracks":
                createMicrophoneAndCameraTracks(args.getJSONObject(0), callbackContext);
                return true;
            case "getDevices":
                getDevices(callbackContext);
                return true;
            default:
                return false;
        }
    }

    private void initialize(String appId, CallbackContext callbackContext) {
        try {
            rtcEngine = RtcEngine.create(cordova.getActivity().getApplicationContext(), appId, rtcEventHandler);
            callbackContext.success("Agora initialized");
        } catch (Exception e) {
            callbackContext.error("Agora initialization failed: " + e.getMessage());
        }
    }

    private void joinChannel(String token, String channelName, int uid, CallbackContext callbackContext) {
        if (rtcEngine != null) {
            rtcEngine.joinChannel(token, channelName, "", uid);
            callbackContext.success("Joined channel " + channelName);
        } else {
            callbackContext.error("Agora not initialized");
        }
    }

    private void leaveChannel(CallbackContext callbackContext) {
        if (rtcEngine != null) {
            rtcEngine.leaveChannel();
            callbackContext.success("Left channel");
        } else {
            callbackContext.error("Agora not initialized");
        }
    }

    private void createMicrophoneAndCameraTracks(JSONObject options, CallbackContext callbackContext) {
        if (rtcEngine != null) {
            // Set up video configuration
            VideoEncoderConfiguration.VideoDimensions dimensions = new VideoEncoderConfiguration.VideoDimensions(
                    options.optInt("width", 640),
                    options.optInt("height", 480)
            );
            VideoEncoderConfiguration configuration = new VideoEncoderConfiguration(dimensions,
                    VideoEncoderConfiguration.FRAME_RATE.FRAME_RATE_FPS_15,
                    VideoEncoderConfiguration.STANDARD_BITRATE,
                    VideoEncoderConfiguration.ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE);
            rtcEngine.setVideoEncoderConfiguration(configuration);

            // Enable video
            rtcEngine.enableVideo();

            // Start local preview
            rtcEngine.startPreview();

            callbackContext.success("Microphone and camera tracks created");
        } else {
            callbackContext.error("Agora not initialized");
        }
    }

    private void getDevices(CallbackContext callbackContext) {
        // Example: List available audio devices
        JSONArray devices = new JSONArray();
        devices.put("Audio Device 1");
        devices.put("Audio Device 2");
        callbackContext.success(devices);
    }
}
