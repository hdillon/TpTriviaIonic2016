cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-vibration.notification",
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "id": "cordova-plugin-nativeaudio.nativeaudio",
        "file": "plugins/cordova-plugin-nativeaudio/www/nativeaudio.js",
        "pluginId": "cordova-plugin-nativeaudio",
        "clobbers": [
            "window.plugins.NativeAudio"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-vibration": "2.1.2",
    "cordova-plugin-nativeaudio": "3.0.6",
    "cordova-plugin-splashscreen": "4.0.1-dev"
};
// BOTTOM OF METADATA
});