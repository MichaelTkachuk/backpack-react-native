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

import React from 'react';
import renderer from 'react-test-renderer';

import BpkNavigationBarButtonAndroid from './BpkNavigationBarButtonAndroid.android';

jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.android || obj.default);
  reactNative.Platform.OS = 'android';
  reactNative.TouchableNativeFeedback.SelectableBackground = jest.fn();

  return reactNative;
});

jest.mock('TouchableNativeFeedback', () =>
  jest.requireActual(
    'react-native/Libraries/Components/Touchable/TouchableNativeFeedback.android.js',
  ),
);

jest.mock(
  './../node_modules/react-native-bpk-component-text/node_modules/bpk-tokens/tokens/base.react.native',
  () => jest.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

jest.mock('bpk-tokens/tokens/base.react.native', () =>
  jest.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

describe('android', () => {
  describe('BpkNavigationBarButton', () => {
    it('should render correctly back icon', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarButtonAndroid
            title="Back"
            icon="native-android--back"
            onPress={jest.fn()}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with close icon', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarButtonAndroid
            title="Close"
            icon="close"
            onPress={jest.fn()}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with tick icon', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarButtonAndroid
            title="Done"
            icon="tick"
            onPress={jest.fn()}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly disabled', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarButtonAndroid
            title="Done"
            icon="tick"
            onPress={jest.fn()}
            disabled
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect "tintColor"', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarButtonAndroid
            title="Done"
            icon="tick"
            onPress={jest.fn()}
            tintColor="red"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect "disabledTintColor"', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarButtonAndroid
            title="Done"
            icon="tick"
            onPress={jest.fn()}
            disabledTintColor="red"
            disabled
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect "touchableColor"', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarButtonAndroid
            title="Done"
            icon="tick"
            onPress={jest.fn()}
            touchableColor="red"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should forward custom props', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarButtonAndroid
            title="Back"
            icon="native-android--back"
            onPress={jest.fn()}
            testID="testid"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
