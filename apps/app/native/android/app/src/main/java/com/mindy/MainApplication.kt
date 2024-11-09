package com.mindy

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.bitgo.randombytes.RandomBytesPackage
import com.margelo.quickcrypto.QuickCryptoPackage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage
import com.facebook.react.common.assets.ReactFontManager
import com.proyecto26.inappbrowser.RNInAppBrowserPackage;
import com.rnfs.RNFSPackage;

class MainApplication : Application(), ReactApplication {
  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
              // add(RandomBytesPackage())
              // add(QuickCryptoPackage())
              // add(AsyncStoragePackage())
              // add(RNInAppBrowserPackage())
              // add(RNFSPackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    ReactFontManager.getInstance().addCustomFont(this, "Lora", R.font.lora)
    ReactFontManager.getInstance().addCustomFont(this, "Lora Italic", R.font.lora_italic)
    ReactFontManager.getInstance().addCustomFont(this, "Dancing Script", R.font.dancing_script)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Black", R.font.poppins_black)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Black Italic", R.font.poppins_black_italic)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Bold", R.font.poppins_bold)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Bold Italic", R.font.poppins_bold_italic)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Extra Bold", R.font.poppins_extra_bold)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Extra Bold Italic", R.font.poppins_extra_bold_italic)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Extra Light", R.font.poppins_extra_light)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Extra Light Italic", R.font.poppins_extra_light_italic)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Italic", R.font.poppins_italic)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Light", R.font.poppins_light)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Light Italic", R.font.poppins_light_italic)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Medium", R.font.poppins_medium)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Medium Italic", R.font.poppins_medium_italic)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins", R.font.poppins_regular)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Semi Bold", R.font.poppins_semi_bold)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Semi Bold Italic", R.font.poppins_semi_bold_italic)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Thin", R.font.poppins_thin)
    ReactFontManager.getInstance().addCustomFont(this, "Poppins Thin Italic", R.font.poppins_thin_italic)
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }
}
