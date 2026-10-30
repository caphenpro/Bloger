# Keep JavaScript bridge methods callable from the bundled offline web app.
-keepclassmembers class vn.caphenpro.lichambattu.MainActivity$AndroidBridge {
    @android.webkit.JavascriptInterface <methods>;
}
