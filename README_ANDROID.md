# Shishu Pathshala - Android Native Project (Capacitor)

This is the complete, production-ready Android native project for **Shishu Pathshala (শিশু পাঠশালা)**.

- **App Name**: Shishu Pathshala
- **App ID (Package)**: `com.shishupathshala.app`
- **Framework**: Capacitor 8 + Android Gradle Plugin + Material 3 styling
- **Offline First**: All images, sounds, fonts, and data are bundled inside the assets.

---

## 🚀 How to Build the APK (2 Ways)

### Option 1: In Android Studio (Easiest & Recommended)
1. Unzip `shishu-pathshala-android-project.zip`.
2. Open **Android Studio**.
3. Select **Open an Existing Project** and choose the extracted `android` folder.
4. Wait for Gradle sync to finish (all dependencies and plugins are pre-configured).
5. In the top menu, go to **Build** ➔ **Build Bundle(s) / APK(s)** ➔ **Build APK(s)**.
6. Android Studio will generate `app-debug.apk` in:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```
7. Transfer this `.apk` to any Android phone or tablet to install!

---

### Option 2: Using Command Line (Terminal)
Navigate into the extracted `android` directory and run:

**On Linux / macOS:**
```bash
./gradlew assembleDebug
```

**On Windows:**
```bat
gradlew.bat assembleDebug
```

The resulting APK will be located at:
`app/build/outputs/apk/debug/app-debug.apk`

---

## 🛠️ Project Structure
- `android/app/src/main/AndroidManifest.xml`: Configured with package `com.shishupathshala.app`, orientation, and fullscreen/immersive preferences.
- `android/app/src/main/res/values/strings.xml`: App title "Shishu Pathshala".
- `android/app/src/main/res/mipmap-*`: App icons with cute Bengal tiger cub logo.
- `android/app/src/main/res/drawable*`: Splash screen image and themes.
- `android/app/src/main/assets/public`: Bundled offline HTML/JS/CSS/SVG preschool learning application.
