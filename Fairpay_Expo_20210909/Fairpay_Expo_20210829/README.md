## Live

- Staging

- Production

### Env

- EXPO_STATE: `stag` or `prod` for Staging or Production
- EXPO_API_ENDPOINT: https://.../v1/graphql
- EXPO_ANDROID_PACKAGE: Android package
- EXPO_IOS_BUNDLEIDENTIFIER: iOS bundle identifier

### Rules

- Install package: `expo install $package`. Uninstall `yarn remove $package`
- Tested success: if check with `Expo Go`, `Apk/Ipa App`, `Web App`
- Create new a branch with format `issues-${issue id}`. Ex `issues-123`
- every weeks need to check update dependencies one times

### Others

- Hide folders and files that you use less frequently. Check `.vscode/settings.json`
