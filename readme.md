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
            config.build_settings['DEBUG_INFORMATION_FORMAT'] = 'dwarf-with-dsym'
            config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
            if target.respond_to?(:product_type) and target.product_type == "com.apple.product-type.bundle"
                config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
            end
        end
        if target.name == 'BoringSSL-GRPC'
          target.source_build_phase.files.each do |file|
            if file.settings && file.settings['COMPILER_FLAGS']
              flags = file.settings['COMPILER_FLAGS'].split
              flags.reject! { |flag| flag == '-GCC_WARN_INHIBIT_ALL_WARNINGS' }
              file.settings['COMPILER_FLAGS'] = flags.join(' ')
            end
          end
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






Fichier StatusBarPlugin pour Capacitor Status Bar

import Foundation
import Capacitor

/**
 * StatusBar plugin. Requires "View controller-based status bar appearance" to
 * be "YES" in Info.plist
 */
@objc(StatusBarPlugin)
public class StatusBarPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "StatusBarPlugin"
    public let jsName = "StatusBar"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "setStyle", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBackgroundColor", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "show", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "hide", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getInfo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setOverlaysWebView", returnType: CAPPluginReturnPromise)
    ]
    private var observer: NSObjectProtocol?

    override public func load() {
        observer = NotificationCenter.default.addObserver(forName: Notification.Name.capacitorStatusBarTapped, object: .none, queue: .none) { [weak self] _ in
            self?.bridge?.triggerJSEvent(eventName: "statusTap", target: "window")
        }
    }

    deinit {
        if let observer = observer {
            NotificationCenter.default.removeObserver(observer)
        }
    }

    @objc func setStyle(_ call: CAPPluginCall) {
        let options = call.options!

        if let style = options["style"] as? String {
            if style == "DARK" {
                bridge?.statusBarStyle = .lightContent
            } else if style == "LIGHT" {
                bridge?.statusBarStyle = .darkContent
            } else if style == "DEFAULT" {
                bridge?.statusBarStyle = .default
            }
        }

        call.resolve([:])
    }

    @objc func setBackgroundColor(_ call: CAPPluginCall) {
        guard let hexColor = call.getString("color") else {
            call.reject("Color is required")
            return
        }

        DispatchQueue.main.async {
            guard let window = UIApplication.shared.windows.first else {
                call.reject("Window not available")
                return
            }

            if let statusBarManager = window.windowScene?.statusBarManager {
                let statusBarFrame = statusBarManager.statusBarFrame
                let statusBarView = UIView(frame: statusBarFrame)

                if hexColor.lowercased() == "#ffffffff" {
                    statusBarView.backgroundColor = UIColor.clear
                    statusBarView.isOpaque = false
                } else {
                    statusBarView.backgroundColor = UIColor.white
                    statusBarView.isOpaque = true
                }

                statusBarView.tag = 999
                if let oldView = window.viewWithTag(999) {
                    oldView.removeFromSuperview()
                }
                window.addSubview(statusBarView)
                call.resolve()
            } else {
                call.reject("Status bar manager not available")
            }
        }
    }


    func setAnimation(_ call: CAPPluginCall) {
        let animation = call.getString("animation", "FADE")
        if animation == "SLIDE" {
            bridge?.statusBarAnimation = .slide
        } else if animation == "NONE" {
            bridge?.statusBarAnimation = .none
        } else {
            bridge?.statusBarAnimation = .fade
        }
    }

    @objc func hide(_ call: CAPPluginCall) {
        setAnimation(call)
        bridge?.statusBarVisible = false
        call.resolve()
    }

    @objc func show(_ call: CAPPluginCall) {
        setAnimation(call)
        bridge?.statusBarVisible = true
        call.resolve()
    }

    @objc func getInfo(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            guard let bridge = self?.bridge else {
                return
            }
            let style: String
            switch bridge.statusBarStyle {
            case .default:
                if bridge.userInterfaceStyle == UIUserInterfaceStyle.dark {
                    style = "DARK"
                } else {
                    style = "LIGHT"
                }
            case .lightContent:
                style = "DARK"
            default:
                style = "LIGHT"
            }

            call.resolve([
                "visible": bridge.statusBarVisible,
                "style": style
            ])
        }
    }

    @objc func setOverlaysWebView(_ call: CAPPluginCall) {
        let overlay = call.getBool("overlay", true)

        DispatchQueue.main.async { [weak self] in
            guard let self = self, let bridge = self.bridge, let window = UIApplication.shared.windows.first else {
                call.reject("Bridge or window not available")
                return
            }

            var statusBarHeight: CGFloat = 0
            if let statusBarManager = window.windowScene?.statusBarManager {
                statusBarHeight = statusBarManager.statusBarFrame.size.height
            }

            if overlay {
                bridge.webView?.frame.origin.y = 0
            } else {
                bridge.webView?.frame.origin.y = statusBarHeight
            }

            call.resolve()
        }
    }


}
