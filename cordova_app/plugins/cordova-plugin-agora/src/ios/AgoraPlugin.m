#import <Cordova/CDV.h>
#import <AgoraRtcEngineKit/AgoraRtcEngineKit.h>

@interface AgoraPlugin : CDVPlugin {
    AgoraRtcEngineKit *rtcEngine;
}
- (void)initialize:(CDVInvokedUrlCommand*)command;
- (void)joinChannel:(CDVInvokedUrlCommand*)command;
- (void)leaveChannel:(CDVInvokedUrlCommand*)command;
- (void)createMicrophoneAndCameraTracks:(CDVInvokedUrlCommand*)command;
- (void)getDevices:(CDVInvokedUrlCommand*)command;
@end

@implementation AgoraPlugin

- (void)initialize:(CDVInvokedUrlCommand*)command {
    NSString* appId = [command.arguments objectAtIndex:0];
    rtcEngine = [AgoraRtcEngineKit sharedEngineWithAppId:appId delegate:nil];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Agora initialized"];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)joinChannel:(CDVInvokedUrlCommand*)command {
    NSString* token = [command.arguments objectAtIndex:0];
    NSString* channelName = [command.arguments objectAtIndex:1];
    NSUInteger uid = [[command.arguments objectAtIndex:2] unsignedIntegerValue];
    [rtcEngine joinChannelByToken:token channelId:channelName info:nil uid:uid joinSuccess:nil];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Joined channel"];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)leaveChannel:(CDVInvokedUrlCommand*)command {
    [rtcEngine leaveChannel:nil];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Left channel"];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)createMicrophoneAndCameraTracks:(CDVInvokedUrlCommand*)command {
    if (rtcEngine) {
        NSDictionary* options = [command.arguments objectAtIndex:0];

        // Set video configuration
        AgoraVideoEncoderConfiguration *config = [[AgoraVideoEncoderConfiguration alloc] initWithSize:CGSizeMake([options[@"width"] intValue], [options[@"height"] intValue])
                                                                                            frameRate:AgoraVideoFrameRateFps15
                                                                                              bitrate:AgoraVideoBitrateStandard
                                                                                      orientationMode:AgoraVideoOutputOrientationModeAdaptative];
        [rtcEngine setVideoEncoderConfiguration:config];

        // Enable video
        [rtcEngine enableVideo];
        [rtcEngine startPreview];

        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Microphone and camera tracks created"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Agora not initialized"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void)getDevices:(CDVInvokedUrlCommand*)command {
    // Example: List available audio devices
    NSArray *devices = @[@"Audio Device 1", @"Audio Device 2"];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:devices];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

@end
