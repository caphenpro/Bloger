package vn.caphenpro.lichambattu

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = android.graphics.Color.rgb(16, 24, 32)
        window.navigationBarColor = android.graphics.Color.rgb(16, 24, 32)

        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.databaseEnabled = true
            settings.allowFileAccess = true
            settings.allowContentAccess = false
            settings.javaScriptCanOpenWindowsAutomatically = false
            settings.setSupportMultipleWindows(false)
            settings.mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_NEVER_ALLOW
            settings.userAgentString = settings.userAgentString + " LichAmDuongAndroid/1.0.0"
            addJavascriptInterface(AndroidBridge(), "Android")
            webChromeClient = WebChromeClient()
            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    val uri = request.url
                    if (uri.scheme == "file" || uri.scheme == "data" || uri.scheme == "about") return false
                    if (uri.scheme == "https" || uri.scheme == "http") {
                        if (uri.host == "fonts.googleapis.com" || uri.host == "fonts.gstatic.com") return false
                        return try {
                            startActivity(Intent(Intent.ACTION_VIEW, uri))
                            true
                        } catch (_: Exception) {
                            false
                        }
                    }
                    return true
                }
            }
            setBackgroundColor(android.graphics.Color.rgb(16, 24, 32))
            loadUrl("file:///android_asset/index.html")
        }
        setContentView(webView)

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) webView.goBack() else finish()
            }
        })
    }

    inner class AndroidBridge {
        @JavascriptInterface
        fun shareText(text: String) {
            runOnUiThread {
                val send = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_TEXT, text)
                }
                startActivity(Intent.createChooser(send, "Chia sẻ kết quả"))
            }
        }

        @JavascriptInterface
        fun showMessage(message: String) {
            runOnUiThread {
                Toast.makeText(this@MainActivity, message.take(180), Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onDestroy() {
        if (::webView.isInitialized) {
            webView.removeJavascriptInterface("Android")
            webView.destroy()
        }
        super.onDestroy()
    }
}
