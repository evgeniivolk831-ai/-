# Sherlock OSINT Android

Android shell for the currently deployed Sherlock OSINT web app.

## Build APK in GitHub Actions
1. Open the repository's **Actions** tab.
2. Select **Build Android APK**.
3. Press **Run workflow** (or wait for the push-triggered run).
4. Open the completed run and download the **Sherlock-OSINT-debug-APK** artifact.

The artifact is an installable debug APK. This project embeds the existing web app in an Android WebView; it does not port the full Python Sherlock engine into Android. Search coverage is therefore the same as the linked web app.

## Original engine
The upstream Sherlock project is https://github.com/sherlock-project/sherlock and is licensed under MIT. This Android shell does not bundle or modify its Python engine.
