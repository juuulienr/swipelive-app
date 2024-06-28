#import <Cordova/CDV.h>
#import <AVFoundation/AVFoundation.h>

@interface AgoraPermissions : CDVPlugin
- (void)checkPermissions:(CDVInvokedUrlCommand*)command;
- (void)requestPermissions:(CDVInvokedUrlCommand*)command;
@end

@implementation AgoraPermissions

- (void)checkPermissions:(CDVInvokedUrlCommand*)command {
    AVAuthorizationStatus cameraStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    AVAuthorizationStatus audioStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeAudio];

    if (cameraStatus == AVAuthorizationStatusAuthorized && audioStatus == AVAuthorizationStatusAuthorized) {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Permissions granted"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Permissions not granted"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void)requestPermissions:(CDVInvokedUrlCommand*)command {
    [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
        if (granted) {
            [AVCaptureDevice requestAccessForMediaType:AVMediaTypeAudio completionHandler:^(BOOL granted) {
                if (granted) {
                    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Permissions granted"];
                    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
                } else {
                    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Permissions denied"];
                    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
                }
            }];
        } else {
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Permissions denied"];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }
    }];
}

@end
