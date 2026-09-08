module.exports = {
  dependencies: {
    "uilib-native": {
      platforms: {
        android: {
          sourceDir: "./node_modules/uilib-native/android",
          packageImportPath: `
            import com.wix.reactnativeuilib.dynamicfont.DynamicFontPackage;
            import com.wix.reactnativeuilib.highlighterview.HighlighterViewPackage;
            import com.wix.reactnativeuilib.keyboardinput.KeyboardInputPackage;
          `,
          packageInstance: `
            new DynamicFontPackage(),
            new HighlighterViewPackage(),
            new KeyboardInputPackage(getApplication())
          `,
        },
      },
    },
  },
};