#import <Cordova/CDV.h>
#import <AgoraRtcKit/AgoraRtcKit.h>

@interface AgoraPlugin : CDVPlugin <AgoraRtcEngineDelegate> {
    AgoraRtcEngineKit *rtcEngine;
    UIView *videoView;
    UIColor *originalBackgroundColor;
}
+ (AgoraRtcEngineKit *)sharedRtcEngine;
- (void)initialize:(CDVInvokedUrlCommand*)command;
- (void)joinChannel:(CDVInvokedUrlCommand*)command;
- (void)leaveChannel:(CDVInvokedUrlCommand*)command;
- (void)createMicrophoneAndCameraTracks:(CDVInvokedUrlCommand*)command;
- (void)getSharedRtcEngine:(CDVInvokedUrlCommand*)command;
- (void)setupLocalVideo:(CDVInvokedUrlCommand*)command;
- (void)startPreview:(CDVInvokedUrlCommand*)command;
- (void)stopLocalVideo:(CDVInvokedUrlCommand*)command;
- (void)switchCamera:(CDVInvokedUrlCommand*)command;
@end

@implementation AgoraPlugin

static AgoraRtcEngineKit *sharedRtcEngine = nil;

+ (AgoraRtcEngineKit *)sharedRtcEngine {
    return sharedRtcEngine;
}

- (void)initialize:(CDVInvokedUrlCommand*)command {
    NSLog(@"Agora initialize called");
    NSString *appId = [command.arguments objectAtIndex:0];
    if (![appId isKindOfClass:[NSString class]] || appId.length == 0) {
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Invalid App ID"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }

    // Initialize the Agora engine
    sharedRtcEngine = [AgoraRtcEngineKit sharedEngineWithAppId:appId delegate:self];

    if (sharedRtcEngine) {
        NSLog(@"rtcEngine initialized");
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Agora initialized"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        NSLog(@"rtcEngine initialization failed");
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Agora initialization failed"];
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
    NSNumber* uidNumber = [command.arguments objectAtIndex:2];

    if ([token isKindOfClass:[NSNull class]]) {
        token = nil;
    }
    if (![channelName isKindOfClass:[NSString class]] || channelName.length == 0) {
        NSLog(@"Invalid channel name");
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Invalid channel name"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }
    if (![uidNumber isKindOfClass:[NSNumber class]]) {
        NSLog(@"Invalid UID");
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Invalid UID"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }
    NSUInteger uid = [uidNumber unsignedIntegerValue];

    NSLog(@"Joining channel with token: %@, channelName: %@, uid: %lu", token, channelName, (unsigned long)uid);

    // Définir le rôle explicitement comme Broadcaster (hôte)
    [sharedRtcEngine setClientRole:AgoraClientRoleBroadcaster];

    [sharedRtcEngine joinChannelByToken:token channelId:channelName info:nil uid:uid joinSuccess:^(NSString *channel, NSUInteger uid, NSInteger elapsed) {
        NSLog(@"Join channel success");

        // Publier la vidéo et l'audio automatiquement (car on est hôte)
        int ret = [sharedRtcEngine muteLocalAudioStream:NO];
        if (ret == 0) {
            NSLog(@"Audio unmuted successfully");
        } else {
            NSLog(@"Failed to unmute audio");
        }

        ret = [sharedRtcEngine muteLocalVideoStream:NO];
        if (ret == 0) {
            NSLog(@"Video unmuted successfully");
        } else {
            NSLog(@"Failed to unmute video");
        }

        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Joined channel as host"];
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

        AgoraVideoFrameRate frameRate = options[@"frameRate"] ? [options[@"frameRate"] intValue] : AgoraVideoFrameRateFps30;
        NSInteger bitrate = options[@"bitrate"] ? [options[@"bitrate"] intValue] : AgoraVideoBitrateStandard;
        AgoraVideoOutputOrientationMode orientationMode = options[@"orientationMode"] ? [options[@"orientationMode"] intValue] : AgoraVideoOutputOrientationModeAdaptative;
        AgoraVideoMirrorMode mirrorMode = options[@"mirrorMode"] ? [options[@"mirrorMode"] intValue] : AgoraVideoMirrorModeAuto;

        AgoraVideoEncoderConfiguration *config = [[AgoraVideoEncoderConfiguration alloc] initWithWidth:AgoraVideoDimension1920x1080.width
                                                                                                height:AgoraVideoDimension1920x1080.height
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
        CGFloat left = [options[@"left"] floatValue];
        CGFloat top = [options[@"top"] floatValue];
        CGFloat width = [options[@"width"] floatValue];
        CGFloat height = [options[@"height"] floatValue];

        // Ajout des logs pour le débogage
        NSLog(@"setupLocalVideo called with uid: %ld, left: %f, top: %f, width: %f, height: %f", (long)uid, left, top, width, height);

        // Configure the UIView for the video
        CGRect videoFrame = CGRectMake(left, top, width, height);
        videoView = [[UIView alloc] initWithFrame:videoFrame];
        videoView.tag = 1234; // Tag to identify the video view
        videoView.backgroundColor = [UIColor clearColor]; // Ensure background is clear

        // Add the video view behind the WebView
        [self.webView setOpaque:NO];
        originalBackgroundColor = self.webView.backgroundColor;
        self.webView.backgroundColor = [UIColor clearColor];
        [self.webView.superview insertSubview:videoView belowSubview:self.webView];

        AgoraRtcVideoCanvas *videoCanvas = [[AgoraRtcVideoCanvas alloc] init];
        videoCanvas.uid = uid;
        videoCanvas.view = videoView;
        videoCanvas.renderMode = AgoraVideoRenderModeHidden;
        videoCanvas.mirrorMode = AgoraVideoMirrorModeAuto;

        [sharedRtcEngine setupLocalVideo:videoCanvas];

        NSLog(@"Local video setup completed for uid: %ld", (long)uid);

        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Local video setup completed"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        NSLog(@"Agora not initialized");
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Agora not initialized"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void)startPreview:(CDVInvokedUrlCommand*)command {
    if (sharedRtcEngine) {
        [sharedRtcEngine startPreview];
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Preview started"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Agora not initialized"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void)stopLocalVideo:(CDVInvokedUrlCommand*)command {
    if (sharedRtcEngine) {
        [sharedRtcEngine stopPreview];
        [sharedRtcEngine disableVideo];
        if (videoView) {
            [videoView removeFromSuperview];
            videoView = nil;
        }
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Local video stopped"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Agora not initialized"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void)switchCamera:(CDVInvokedUrlCommand*)command {
    if (sharedRtcEngine) {
        [sharedRtcEngine switchCamera];
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Camera switched"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Agora not initialized"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

@end
