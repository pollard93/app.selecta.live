fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios produce_apps
```
fastlane ios produce_apps
```
Create Beta and App Store apps on both App Store Connect and the Apple Developer Portal
### ios gen_pems
```
fastlane ios gen_pems
```
Create pems for push notifications
### ios gen_match
```
fastlane ios gen_match
```
Creates all required certificates & provisioning profiles
### ios adhoc
```
fastlane ios adhoc
```
Build ipa and push to browserstack
### ios beta
```
fastlane ios beta
```
Push a new beta build to TestFlight
### ios release
```
fastlane ios release
```
Push a new release build to the App Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
