package com.example.plugin;

import android.view.SurfaceView;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.agora.rtc2.RtcEngine;
import io.agora.rtc2.video.VideoCanvas;
import io.agora.rtc2.video.VideoEncoderConfiguration;
import io.agora.rtc2.IRtcEngineEventHandler;

public class AgoraPlugin extends CordovaPlugin {
    private RtcEngine rtcEngine;
    private SurfaceView localView;
    private FrameLayout container;
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
            case "setupLocalVideo":
                setupLocalVideo(args.getJSONObject(0), callbackContext);
                return true;
            case "stopLocalVideo":
                stopLocalVideo(callbackContext);
                return true;
            case "switchCamera":
                switchCamera(callbackContext);
                return true;
            case "startPreview":
                startPreview(callbackContext);
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
            VideoEncoderConfiguration.VideoDimensions dimensions = new VideoEncoderConfiguration.VideoDimensions(
                    options.optInt("width", 640),
                    options.optInt("height", 480)
            );
            VideoEncoderConfiguration configuration = new VideoEncoderConfiguration(dimensions,
                    VideoEncoderConfiguration.FRAME_RATE.FRAME_RATE_FPS_15,
                    VideoEncoderConfiguration.STANDARD_BITRATE,
                    VideoEncoderConfiguration.ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE);
            rtcEngine.setVideoEncoderConfiguration(configuration);
            rtcEngine.enableVideo();
            rtcEngine.startPreview();
            callbackContext.success("Microphone and camera tracks created");
        } else {
            callbackContext.error("Agora not initialized");
        }
    }

    private void setupLocalVideo(JSONObject options, CallbackContext callbackContext) {
        if (rtcEngine != null) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (localView == null) {
                        localView = RtcEngine.CreateRendererView(cordova.getActivity().getApplicationContext());
                        localView.setZOrderMediaOverlay(true);
                        webView.getView().setBackgroundColor(android.R.color.transparent);
                        ViewGroup parentView = (ViewGroup) webView.getView().getParent();
                        RelativeLayout.LayoutParams previewLayoutParams = new RelativeLayout.LayoutParams(
                                ViewGroup.LayoutParams.MATCH_PARENT,
                                ViewGroup.LayoutParams.MATCH_PARENT);
                        parentView.addView(localView, 0, previewLayoutParams);
                    }
                    rtcEngine.setupLocalVideo(new VideoCanvas(localView, VideoCanvas.RENDER_MODE_HIDDEN, 0));
                    callbackContext.success("Local video setup completed");
                }
            });
        } else {
            callbackContext.error("Agora not initialized");
        }
    }

    private void stopLocalVideo(CallbackContext callbackContext) {
        if (rtcEngine != null) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    rtcEngine.stopPreview();
                    rtcEngine.disableVideo();
                    if (localView != null) {
                        ViewGroup parentView = (ViewGroup) webView.getView().getParent();
                        parentView.removeView(localView);
                        localView = null;
                    }
                    callbackContext.success("Local video stopped");
                }
            });
        } else {
            callbackContext.error("Agora not initialized");
        }
    }

    private void switchCamera(CallbackContext callbackContext) {
        if (rtcEngine != null) {
            rtcEngine.switchCamera();
            callbackContext.success("Camera switched");
        } else {
            callbackContext.error("Agora not initialized");
        }
    }

    private void startPreview(CallbackContext callbackContext) {
        if (rtcEngine != null) {
            rtcEngine.startPreview();
            callbackContext.success("Preview started");
        } else {
            callbackContext.error("Agora not initialized");
        }
    }
}
