# Android — Lịch Âm Dương & Bát Tự

Android application module written in Kotlin. The native Activity hosts the repository's existing, bundled calendar interface in a WebView so the established JavaScript calendar calculations and data can be reused without rewriting them prematurely.

## Offline design
- The HTML entry point and local data/assets are packaged in `app/src/main/assets/`.
- Calendar screens and calculations execute locally; no web server or Vercel deployment is required to open the app.
- Google Fonts are optional enhancements. The app uses system font fallbacks when offline.
- Gemini/AI requests and any explicitly remote service cannot work without connectivity and a configured API credential. No API key is embedded in the APK.

## Build
Requires JDK 17 and Android SDK Platform 35.

```bash
gradle -p android assembleDebug
gradle -p android assembleRelease bundleRelease
```

Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk` (application id has a `.debug` suffix).

Release APK and AAB are produced by the release tasks. Configure signing environment variables to sign release outputs:
- `ANDROID_KEYSTORE_PATH`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

For GitHub Actions, store the keystore as base64 in `ANDROID_KEYSTORE_BASE64` and the other values as repository secrets. A Play Store AAB must be signed with the app's release/upload key; the workflow does not invent or generate a production identity.

## Architecture note
This is the first Kotlin Android delivery layer around the existing app. It is a native Android package and lifecycle, back-navigation, sharing bridge and local asset container; the feature interface and legacy calculation engine are still HTML/JavaScript hosted locally. A fully native Jetpack Compose rewrite of every feature is a separate migration and requires feature-by-feature parity tests.
