import React, { useState } from "react";
import { BackHandler, Platform, SafeAreaView, StatusBar, View, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

const APP_URL = "https://sherlock-osint-etk1s5.v2.appdeploy.ai/";

export default function App() {
  const [webview, setWebview] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    if (Platform.OS !== "android") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack && webview) { webview.goBack(); return true; }
      return false;
    });
    return () => sub.remove();
  }, [canGoBack, webview]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#080d17" }}>
      <ExpoStatusBar style="light" backgroundColor="#080d17" />
      <View style={{ height: 54, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#1b2638" }}>
        <View>
          <Text style={{ color: "#e8eef9", fontSize: 17, fontWeight: "800", letterSpacing: 1 }}>SHERLOCK OSINT</Text>
          <Text style={{ color: "#8292aa", fontSize: 10 }}>USERNAME INTELLIGENCE</Text>
        </View>
        <TouchableOpacity onPress={() => webview?.reload()} style={{ padding: 9 }}>
          <Text style={{ color: "#79aaff", fontSize: 13 }}>Обновить</Text>
        </TouchableOpacity>
      </View>
      {error ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
          <Text style={{ color: "#fff", fontSize: 18, marginBottom: 12 }}>Нет подключения</Text>
          <TouchableOpacity onPress={() => { setError(false); webview?.reload(); }}><Text style={{ color: "#79aaff" }}>Повторить</Text></TouchableOpacity>
        </View>
      ) : null}
      <WebView
        ref={setWebview}
        source={{ uri: APP_URL }}
        onNavigationStateChange={(s) => setCanGoBack(s.canGoBack)}
        onError={() => setError(true)}
        onHttpError={(e) => { if (e.nativeEvent.statusCode >= 500) setError(true); }}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        setSupportMultipleWindows={false}
        startInLoadingState
        renderLoading={() => <View style={{ flex: 1, backgroundColor: "#080d17", alignItems: "center", justifyContent: "center" }}><Text style={{ color: "#79aaff" }}>Загрузка Sherlock…</Text></View>}
        style={{ flex: 1, backgroundColor: "#080d17" }}
      />
    </SafeAreaView>
  );
}
