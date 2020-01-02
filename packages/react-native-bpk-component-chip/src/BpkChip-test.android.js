/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import commonTests from './BpkChip-test.common';

jest.mock('react-native', () => {
  const MARSHMALLOW = 23;
  const reactNative = jest.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.android || obj.default);
  reactNative.Platform.OS = 'android';

  // We rely on BpkTouchableNativeFeedback to handle the ripple effect on older devices
  // so in this test suite we're assuming API > 23 where the ripple is supported
  Object.defineProperty(reactNative.Platform, 'Version', {
    value: MARSHMALLOW,
  });

  return reactNative;
});

jest.mock(
  './../node_modules/react-native-bpk-component-text/node_modules/bpk-tokens/tokens/base.react.native',
  () => jest.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

jest.mock('bpk-tokens/tokens/base.react.native', () =>
  jest.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

jest.mock('./BpkChipInner', () =>
  jest.requireActual('./BpkChipInner.android.js'),
);

jest.mock('TouchableNativeFeedback', () =>
  jest.requireActual(
    'react-native/Libraries/Components/Touchable/TouchableNativeFeedback.android.js',
  ),
);

describe('Android', () => {
  commonTests();
});
