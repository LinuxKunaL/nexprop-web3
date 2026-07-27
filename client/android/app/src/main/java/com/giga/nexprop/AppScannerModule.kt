package com.giga.nexprop

import android.content.pm.PackageManager
import com.facebook.react.bridge.*
import android.content.pm.ApplicationInfo

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AppScannerModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "AppScanner"

@ReactMethod
fun getInstalledPackages(promise: Promise) {
    try {
        val pm = reactApplicationContext.packageManager
        val apps = pm.getInstalledApplications(PackageManager.GET_META_DATA)

        val packages = Arguments.createArray()

        apps.forEach { app ->
            val isSystemApp = (app.flags and ApplicationInfo.FLAG_SYSTEM) != 0
            val isUpdatedSystemApp =
                (app.flags and ApplicationInfo.FLAG_UPDATED_SYSTEM_APP) != 0

            // Only user-installed apps
            if (!isSystemApp && !isUpdatedSystemApp) {
                packages.pushString(app.packageName)
            }
        }

        promise.resolve(packages)
    } catch (e: Exception) {
        promise.reject("ERROR", e)
    }
}
}