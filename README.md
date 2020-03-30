# mbpRnCore

## Setup (initial installation)

### Setup project

##### Install dependencies

Install all dependencies: `yarn setup:all`

##### Rename

Rename app project wide:

1. Uncomment `app_name` in `android/app/src/main/res/values/strings.xml`. react-native-rename uses this value as the current project name.

2. `yarn react-native-rename <newName> -b <bundleIdentifier>`. Note the bundle identifier is required, but for android only. iOS must be done manually.

3. Comment `app_name` in `android/app/src/main/res/values/strings.xml`. If left in android will not build.

4. Rename Xcode app display names: Targets <newName> -> Build Settings -> `APP_DISPLAY_NAME`, expand and replace `mbpRnCore` with <newName> in all configurations.

5. Rename android app display names: `android/app/src/main/res/values/strings.xml`

6. Update `package` in `android/app/src/main/java/path/*/*/*/SplashActivity.java`

##### Bundle id

Update the bundle indentifier: Targets <newName> -> Build Settings -> Product Bundle Identifier, expand and replace `org.reactjs.native.example.mbpRnCore` with <newName> in all configurations.

### Setup Fastlane

1. Install Ruby and Fastlane: https://hackernoon.com/the-only-sane-way-to-setup-fastlane-on-a-mac-4a14cb8549c8
2. Add to bash profile: `export PATH="$HOME/.fastlane/bin/fastlane_lib:$PATH"`
3. Create the `/ios/fastlane/.env`, see `/ios/fastlane/.env.template`.
4. In `/ios/` directory `fastlane produce_apps` this will create apps on app store connect and developer portal.
4. In `/ios/` directory `fastlane gen_match` this will create all required certs and provisioning profiles.
5. Set signing certificates: Targets <newName> -> General -> Signing, and select the correct provisioning profiles:
    * Debug `should be automatic and should be left unchanged`
    * App Store (`match AppStore {{bundleid}}`)
    * Beta (`match AppStore {{bundleid}}.beta`) - there will also me `match Adhoc {{bundleid}}.beta`, this is used to build adhoc builds

---

## After first installation (for any other team member)

### Install dependencies

Install all dependencies: `yarn setup:all`

### Create .env.Debug

`mv .env.Debug.template .env.Debug`

### iOS Download certificates and profiles

Install Fastlane CLI

In `/ios/` directory `fastlane gen_match` this will download all required certs and provisioning profiles.

---

## Android

[Generate new upload keys](https://facebook.github.io/react-native/docs/0.60/signed-apk-android), update `gradle.properties` with `RELEASE_STORE_PASSWORD` and `RELEASE_KEY_PASSWORD`.

Add Play Store API key under `android/mbpPlaystoreKey.json`.

---

## Push notifications

### iOS

Make sure `HOME` env var is set in `/ios/fastlane/.env`, setup a OneSignal account and add your users auth token to `/ios/fastlane/.env` (`ONESIGNAL_${CONFIG}_AUTH_TOKEN`)

Create 3 OneSignal applications (one for each config) and update all `app_id`s `/ios/fastlane/FastFile` in lane `gen_pems`.

Also update the corresponding `.env.${CONFIG}` value `REACT_APP_ONESIGNAL_APPID`.

In `/ios/` run `fastlane gen_pems` to generate `.pems`. They will be stored in `~/certs/${BUNDLEID}`. If the PEMs are being created/updated they will be pushed to OneSignal.

### Android

Create 3 OneSignal applications (one for each config) and update all `app_id`s `android/fastlane/FastFile` in lane `update_onesignal`.

Also update the corresponding `.env.${CONFIG}` value `REACT_APP_ONESIGNAL_APPID`.

Add env vars in `android/fastlane/.env` `ONESIGNAL_${CONFIG}_AUTH_TOKEN`, `ANDROID_${CONFIG}_SENDER_ID`, and `ANDROID_${CONFIG}_SERVER_KEY`.

In `/android/` run `fastlane update_onesignal` to update the OneSignal apps with the Android keys.

---

## Running

`react-native run-ios` - run iOS simulator

`react-native run-android --variant=debug --appIdSuffix=debug` - run Android simulator

---

## Testing

`yarn test:unit` will run all all `*.test.tsx` files

### Testing Requirements

`generated/app.ts` and `generated/typeDefs.ts` are required by the mock server for testing and storybook.

### Example test

```javascript
import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from '@apollo/react-testing';
import mockClient from './src/API/utils/mockClient';
import { expect } from 'chai';

const client = mockClient();

const ComponentWithQuery = () => <div></div>;

test('Apollo Testing options', async () => {
  // Mocked Provider, good for testing errors and simple responses

  const mocks = [{
    request: {
      query: QUERY,
    },
    error: new Error(),
  }];

  const mockedProviderWrapper = mount(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
    >
      <ComponentWithQuery />
    </MockedProvider>,
  );

  // Or can wrap in a provider, and assign the mock client which will hit the mock server
  // Good for auto generating intricate responses

  const apolloProviderWrapper = mount(
    <ApolloProvider client={client}>
      <ComponentWithQuery />
    </ApolloProvider>,
  );

  // Direct access to the mock server cache, to test for changes after events

  const { data: { response } } = await client.query({
    query: QUERY,
    variables: {},
  });
});
```

---

## Storybook

To automatically update the storylist, run `yarn dev:storybook`

To run storybook, edit `.env.Debug` and set `REACT_APP_APP_STORYBOOK=true`

---

## Scripts

### `gen:api`

Connects to a running API on localhost:4000, validates all queries/mutations and generates typescript from them.

### `gen:icons`

Generates @2x, @1x from @3x icons.

### `gen:appicon`

Generates app icons and all necessary sizes from `/Icon.jpg` in the root and places them in the appropriate positions.

---

## Styles

Global style properties and mixins should be used & set in `/src/styles/definitions/`.

### Units & spacing

Common spacing definitions should be set in `/src/styles/definitions/spacing.ts` using the `scalePx()` utility to allow responsive and global scaling. See the **Media queries** section for more info on specific unit scaling.

To control global dimensional unit scaling, use the `globalPixelScalingModifier` in `/src/styles/definitions/core.ts` to correctly modify all instances of `scalePx()`.

### Media queries

Viewport specific properties and values can be implemented using the `responsiveProperty()` and `responsiveProperties()` utilities. These take property/viewport rule-sets and return only valid properties. For example:
```javascript
// Single responsive properties return null if viewport rule doesn't match
responsiveProperty({
  rule: { orientation: 'portrait' },
  property: 'Returns only on portrait screens',
});

// Groups of properties return any matching properties
const matchingProps = responsiveProperties([
  { rule: { deviceWidth: { min: 400, } },
    property: 'Returns on 400 wide screens minimum' },
  { rule: { deviceWidth: { equals: 400, } },
    property: 'Returns on 400 wide screens only' },
]);

matchingProps.all;    // Array of all matching properties
matchingProps.first;  // Only first matching property
matchingProps.last;   // Only last matching property
```

### Colours

Colour definitions should be placed in `/src/styles/definitions/color.ts`.
All colour definitions should be valid color strings (e.g. hex, RGB, HSL, etc) to enable colour manipulations via `.color()`.

The colour string can be manipulated and analysed using [chained functions](https://www.npmjs.com/package/color#usage) accessible through the `.color()` string prototype:
```javascript
import color from '/src/styles/definitions/color';

// Example manipulation
color.accent.primary.color().lighten(0.1).string();
color.accent.primary.color().darken(0.1).alpha(0.5).string();
color.accent.primary.color().mix(color.mono.light.color(), 0.25).string();

// Example analysis
color.accent.primary.color().isLight();
color.accent.primary.color().alpha();
```

For more information on the features available witin `.color()` refer to the [Color documentation](https://www.npmjs.com/package/color#usage).

**Note:** Accessing the `.color()` prototype on an invalid colour string will result in a thrown exception.

### Fonts

#### Installing custom fonts

1. Place new font TTF files in `/src/assets/fonts/`.
2. Run `react-native link` to add the fonts to the manifest of each platform.

#### Using custom fonts

To enable cross-platform custom font usage, set up new font definitions in `/src/styles/definitions/font.ts` using the `fontFamily` utility.

```javascript
// Definition
const font = {
  family: {
    body: fontFamily({
      name: 'Inter', // Family name
      weights: {
        regular: {
          postScriptName: 'Inter-Regular',
          weight: '400',
        },
        bold: {
          postScriptName: 'Inter-Bold',
          weight: '700',
        },
      },
    }),
  },
};

// Usage
font.family.body('regular');
font.family.body('bold');
```

#### Common typography properties

Group font family, weight, size and other common text style properties in `/src/styles/definitions/typography.ts` for easier design system implementation.

---

## Social logins

### Facebook

1. Follow the installation instructions for [react-native-fbsdk](https://github.com/facebook/react-native-fbsdk)
2. Reference `src/components/Login/LoginWithFacebookExample.tsx` for example integration

### Google

1. Follow the installation instructions for [react-native-google-signin](https://github.com/react-native-community/google-signin)
2. Reference `src/components/Login/LoginWithGoogleExample.tsx` for example integration

---

## Splash Screen

### IOS

1. Open the project in Xcode
2. In Images.xcassets change the SplashIcon to your logo
3. Open LaunchScreen.xib, select the view and choose background colour from the menu on the right

For more details read this article (https://medium.com/@appstud/add-a-splash-screen-to-a-react-native-app-810492e773f9)


### Android
1. Navigate to `android/app/src/main/res` and you will see the following folders:
    - mipmap-hdpi
    - mipmap-ldpi
    - mipmap-mdpi
    - mipmap-xhdpi
    - mipmap-xxhdpi
    - mipmap-xxx-hdpi

2. In each of the mentioned folders change logo.png to your new logo
3. To change the background colour open `/android/app/src/main/res/values/colors.xml` and change the value for `splashscreen_bg`

For more details read this article (https://medium.com/@appstud/add-a-splash-screen-to-a-react-native-app-810492e773f9)