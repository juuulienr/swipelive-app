#import <Cordova/CDV.h>
#import <AgoraRtcKit/AgoraRtcKit.h>

@interface AgoraPlugin : CDVPlugin <AgoraRtcEngineDelegate> {
    AgoraRtcEngineKit *rtcEngine;
}
+ (AgoraRtcEngineKit *)sharedRtcEngine;
- (void)initialize:(CDVInvokedUrlCommand*)command;
- (void)joinChannel:(CDVInvokedUrlCommand*)command;
- (void)leaveChannel:(CDVInvokedUrlCommand*)command;
- (void)createMicrophoneAndCameraTracks:(CDVInvokedUrlCommand*)command;
- (void)getSharedRtcEngine:(CDVInvokedUrlCommand*)command;
- (void)setupLocalVideo:(CDVInvokedUrlCommand*)command; // Ajout de la méthode pour configurer la vidéo locale
@end

@implementation AgoraPlugin

static AgoraRtcEngineKit *sharedRtcEngine = nil;

+ (AgoraRtcEngineKit *)sharedRtcEngine {
    return sharedRtcEngine;
}

- (void)initialize:(CDVInvokedUrlCommand*)command {
    NSLog(@"Agora initialize called");
    NSString* appId = [command.arguments objectAtIndex:0];
    sharedRtcEngine = [AgoraRtcEngineKit sharedEngineWithAppId:appId delegate:self];
    if (sharedRtcEngine) {
        NSLog(@"rtcEngine initialized");
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Agora initialized"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        NSLog(@"rtcEngine initialization failed");
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Agora initialization failed"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void)joinChannel:(CDVInvokedUrlCommand*)command {
    NSLog(@"joinChannel called");

    if (command.arguments.count < 3) {
        NSLog(@"Invalid arguments");
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Invalid arguments"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }

    NSString* token = [command.arguments objectAtIndex:0];
    NSString* channelName = [command.arguments objectAtIndex:1];
    NSUInteger uid = [[command.arguments objectAtIndex:2] unsignedIntegerValue];

    if (!token || !channelName) {
        NSLog(@"Token or channel name is null");
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Token or channel name is null"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }

    NSLog(@"Joining channel with token: %@, channelName: %@, uid: %lu", token, channelName, (unsigned long)uid);

    [sharedRtcEngine joinChannelByToken:token channelId:channelName info:nil uid:uid joinSuccess:^(NSString *channel, NSUInteger uid, NSInteger elapsed) {
        NSLog(@"Join channel success");
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Joined channel"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)leaveChannel:(CDVInvokedUrlCommand*)command {
    [sharedRtcEngine leaveChannel:^(AgoraChannelStats * _Nonnull stat) {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Left channel"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)createMicrophoneAndCameraTracks:(CDVInvokedUrlCommand*)command {
    if (sharedRtcEngine) {
        NSDictionary* options = [command.arguments objectAtIndex:0];

        NSInteger width = options[@"width"] ? [options[@"width"] intValue] : 640;
        NSInteger height = options[@"height"] ? [options[@"height"] intValue] : 480;
        AgoraVideoFrameRate frameRate = options[@"frameRate"] ? [options[@"frameRate"] intValue] : AgoraVideoFrameRateFps15;
        NSInteger bitrate = options[@"bitrate"] ? [options[@"bitrate"] intValue] : AgoraVideoBitrateStandard;
        AgoraVideoOutputOrientationMode orientationMode = options[@"orientationMode"] ? [options[@"orientationMode"] intValue] : AgoraVideoOutputOrientationModeAdaptative;
        AgoraVideoMirrorMode mirrorMode = options[@"mirrorMode"] ? [options[@"mirrorMode"] intValue] : AgoraVideoMirrorModeAuto;

        AgoraVideoEncoderConfiguration *config = [[AgoraVideoEncoderConfiguration alloc] initWithWidth:width
                                                                                                height:height
                                                                                             frameRate:frameRate
                                                                                               bitrate:bitrate
                                                                                       orientationMode:orientationMode
                                                                                            mirrorMode:mirrorMode];
        [sharedRtcEngine setVideoEncoderConfiguration:config];

        [sharedRtcEngine enableVideo];
        [sharedRtcEngine startPreview];

        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Agora not initialized"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void)getSharedRtcEngine:(CDVInvokedUrlCommand*)command {
    if (sharedRtcEngine) {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"rtcEngine is available"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"rtcEngine is not available"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void)setupLocalVideo:(CDVInvokedUrlCommand*)command {
    if (sharedRtcEngine) {
        NSDictionary* options = [command.arguments objectAtIndex:0];
        NSInteger uid = [options[@"uid"] integerValue];

        // Trouver la vue spécifique pour la vidéo
        NSString* elementId = options[@"elementId"];
        UIView* videoView = [self.viewController.view viewWithTag:[elementId integerValue]];

        AgoraRtcVideoCanvas *videoCanvas = [[AgoraRtcVideoCanvas alloc] init];
        videoCanvas.uid = uid;
        videoCanvas.view = videoView;
        videoCanvas.renderMode = AgoraVideoRenderModeHidden;
        videoCanvas.mirrorMode = AgoraVideoMirrorModeAuto;

        [sharedRtcEngine setupLocalVideo:videoCanvas];

        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Local video setup completed"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Agora not initialized"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}



@end
