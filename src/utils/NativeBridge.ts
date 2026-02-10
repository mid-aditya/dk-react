/**
 * Utility to communicate between the Web App and the Native Host (Android/iOS/Flutter)
 * This allows the Web App to trigger native functionalities like push notifications and badge updates.
 */

declare global {
    interface Window {
        ReactNativeWebView?: {
            postMessage: (message: string) => void;
        };
        // Android specific interface (often injected as a global object)
        Android?: {
            showToast: (message: string) => void;
            updateBadge: (count: number) => void;
            postMessage: (message: string) => void;
        };
        // Flutter specific interface
        Flutter?: {
            postMessage: (message: string) => void;
        };
        // iOS specific interface (WKWebView)
        webkit?: {
            messageHandlers?: {
                nativeBridge?: {
                    postMessage: (message: any) => void;
                };
            };
        };
    }
}

export type BridgeMessage = {
    type: 'UPDATE_BADGE' | 'PUSH_NOTIFICATION' | 'OPEN_URL' | 'LOGOUT' | 'READY' | 'REQUEST_LOCATION';
    payload: any;
};

export const sendToNative = (message: BridgeMessage) => {
    const jsonMessage = JSON.stringify(message);

    console.log('[NativeBridge] Sending:', message);

    // 1. Try Flutter WebView (Named 'Flutter')
    if (window.Flutter) {
        window.Flutter.postMessage(jsonMessage);
        return;
    }

    // 2. Try React Native WebView
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(jsonMessage);
        return;
    }

    // 3. Try iOS WKWebView Message Handler
    if (window.webkit?.messageHandlers?.nativeBridge) {
        window.webkit.messageHandlers.nativeBridge.postMessage(message);
        return;
    }

    // 4. Try Android Interface (if injected)
    if (window.Android && window.Android.postMessage) {
        window.Android.postMessage(jsonMessage);
        return;
    }

    console.warn('[NativeBridge] Native Bridge not found.');
};

export const updateNativeBadge = (count: number) => {
    sendToNative({
        type: 'UPDATE_BADGE',
        payload: { count },
    });
};

export const sendNativeNotification = (title: string, body: string) => {
    sendToNative({
        type: 'PUSH_NOTIFICATION',
        payload: { title, body },
    });
};

export const notifyAppReady = () => {
    sendToNative({
        type: 'READY',
        payload: { timestamp: Date.now() }
    });
};

export const requestNativeLocation = () => {
    sendToNative({
        type: 'REQUEST_LOCATION',
        payload: {}
    });
};
