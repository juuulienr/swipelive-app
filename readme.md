# Installation & Configuration

## Pour iOS

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
   config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '14.0'
  end
 end
end



## Pour Android


1) Ajouter propriétés dans gradle.properties 
org.gradle.jvmargs=-Xmx2048m
android.useAndroidX=true
android.enableJetifier=true
kotlin.code.style=official
org.gradle.java.home=/Users/julien/Library/Java/JavaVirtualMachines/corretto-17.0.7/Contents/Home


2) AndroidManifest.xml 
Ajouter dans les balises <activity android:exported="true"> et <receiver android:exported="true">



