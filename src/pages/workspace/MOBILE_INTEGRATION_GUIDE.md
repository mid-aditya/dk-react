# Panduan Implementasi Bridge Mobile (Native <-> Web)

Untuk mendukung fitur **Push Notification** dan **Badge Unread Count** dari aplikasi React (Web View) ke aplikasi Native Client (Android/iOS), kami telah menyediakan interface komunikasi (Bridge).

## 1. Arsitektur
Web App tidak memiliki akses langsung ke OS untuk mengubah Badge Icon atau Push Notification saat aplikasi berada di background/killed. Oleh karena itu, kita menggunakan pola **Observer**:
- **Web App**: Menghitung jumlah pesan belum terbaca dan mengirim sinyal ke Native App.
- **Native App**: Mendengarkan sinyal dari Web View dan memperbarui UI Native.

## 2. Cara Kerja (Protocol)
Web App akan mengirim pesan JSON string melalui `window.postMessage`.

### Payload Format
```json
{
  "type": "UPDATE_BADGE" | "PUSH_NOTIFICATION" | "READY",
  "payload": { ... }
}
```

### Event: Update Badge (Unread Count)
Web App mengirimkan event ini setiap kali jumlah pesan belum terbaca berubah.
- **Trigger**: User menerima pesan baru saat aplikasi terbuka.
- **Pesan**:
```json
{
  "type": "UPDATE_BADGE",
  "payload": {
    "count": 5
  }
}
```
- **Tugas Client (Native)**: Ambil nilai `count` dan update badge icon aplikasi.

### Event: Trigger Notification (In-App)
Web App mengirimkan event ini jika ingin memunculkan notifikasi sistem saat pengguna berada di dalam aplikasi (atau webview di background tapi app aktif).
- **Pesan**:
```json
{
  "type": "PUSH_NOTIFICATION",
  "payload": {
    "title": "Pesan Baru",
    "body": "Halo, ada pesan dari pelanggan..."
  }
}
```
- **Tugas Client (Native)**: Tampilkan local notification atau Toast native.

---

## 3. Implementasi di Sisi Client (Android/iOS)

### Android (WebView)
Anda perlu meng-inject JavaScript Interface atau mendengarkan pesan.

**Pilihan A: React Native WebView (Recommended)**
```javascript
// React Native
<WebView
  onMessage={(event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'UPDATE_BADGE') {
      // Library push notification / badge
      PushNotification.setApplicationIconBadgeNumber(data.payload.count);
    }
  }}
/>
```

**Pilihan B: Android Native (Kotlin/Java)**
Inject interface global bernama `Android` (optional) atau override `WebChromeClient`. Namun, solusi kami mendukung deteksi standar `postMessage`.

### iOS (WKWebView)
Gunakan `WKScriptMessageHandler`.
```swift
// Swift
class NotificationHandler: NSObject, WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        // Parse message.body as JSON string if sent as string, or Dict if object
        guard let dict = message.body as? [String: Any],
              let type = dict["type"] as? String else { return }
        
        if type == "UPDATE_BADGE" {
             if let payload = dict["payload"] as? [String: Any],
                let count = payload["count"] as? Int {
                 UIApplication.shared.applicationIconBadgeNumber = count
             }
        }
    }
}
```

## 4. Catatan Penting: Background Push Notification
Fitur di atas hanya bekerja saat **Web View dimuat** (User membuka aplikasi).

Untuk notifikasi saat **Aplikasi Ditutup (Killed)**:
- **Web View tidak bisa melakukan ini**.
- **Solusi**: Server Backend Omnichat harus mengirim Push Notif ke FCM (Firebase) / APNs milik Client App secara langsung.
- Web App hanya menangani notifikasi "Real-time" saat aplikasi sedang digunakan (Foreground).
