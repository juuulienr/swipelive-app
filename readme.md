Installation & Configuration


I) Pour iOS


1) Chercher cette ligne :
WKWebViewConfiguration* configuration = [[WKWebViewConfiguration alloc] init];


2) Ajouter les lignes suivantes en dessous : 
[configuration.preferences setValue:@TRUE forKey:@"allowFileAccessFromFileURLs"];
[configuration setValue:@"TRUE" forKey:@"allowUniversalAccessFromFileURLs"];


3) Find (void) styleDefault:(CDVInvokedUrlCommand in CDVStatusBar.m

- (void) styleDefault:(CDVInvokedUrlCommand*)command
{
    if (@available(iOS 13.0, *)) {
        [self setStyleForStatusBar:UIStatusBarStyleDarkContent];
    } else {
        [self setStyleForStatusBar:UIStatusBarStyleDefault];
    }
}

- (void) styleLightContent:(CDVInvokedUrlCommand*)command
{
    [self setStyleForStatusBar:UIStatusBarStyleLightContent];
}

- (void) styleBlackTranslucent:(CDVInvokedUrlCommand*)command
{
    [self setStyleForStatusBar:UIStatusBarStyleDarkContent];
}

- (void) styleBlackOpaque:(CDVInvokedUrlCommand*)command
{
    [self setStyleForStatusBar:UIStatusBarStyleDarkContent];
}


4) Ajouter dans Podfile + Pod update dans platforms/ios 

post_install do |installer|
 installer.pods_project.targets.each do |target|
  target.build_configurations.each do |config|
   config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'
  end
 end
end




II) Pour ANDROID (9.1.0)


1) Ajouter propriétés dans gradle.properties 
android.useAndroidX=true
android.enableJetifier=true



III) Congiguration des certificats dans Firebase/Apple 

1) Créer un APP ID dans Identifier --> https://developer.apple.com/account/resources/identifiers/list
2) Ajouter une authentification APN (.p8) dans Firebase --> https://developer.apple.com/account/resources/authkeys/list
3) Créer un certificat (.cer) pour Apple Push Notifications -> https://developer.apple.com/account/resources/certificates/list



IV) Publier l'app sur Play Store

https://developer.android.com/studio/publish/app-signing#sign_release

If you don’t currently have the Generate Signed Bundle or APK dialog open, click Build > Generate Signed Bundle/APK.

In the Generate Signed Bundle or APK dialog, select either Android App Bundle or APK and click Next.

Select a module from the drop down.

Specify the path to your keystore, the alias for your key, and enter the passwords for both. If you haven't yet prepared your upload keystore and key, first Generate an upload key and keystore and then return to complete this step.

If you're signing an app bundle with an existing app signing key, and you’d like to later opt your app in to Play App Signing, check the box next to Export encrypted key and specify a path to save your signing key as an encrypted file. You can then use your encrypted app signing key to opt in an existing app into Play App Signing. Click Next.

In the next window (shown in figure 4), select a destination folder for your signed app, select the build type, choose the product flavor(s) if applicable.

If you are building and signing an APK, you need to select which Signature Versions you want your app to support. To learn more, read about app signing schemes

