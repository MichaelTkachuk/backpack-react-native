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

import { DeviceInfo, Platform } from 'react-native';

export default (() => {
  if (Platform.OS === 'android') {
    return false;
  }

  const { width, height } = DeviceInfo.Dimensions.window;

  // iPhone X, iPhone XS, iPhone 11 Pro
  if (width === 375 && height === 812) {
    return true;
  }

  // iPhone XS Max, iPhone XR, iPhone 11, iPhone 11 Pro Max
  if (width === 414 && height === 896) {
    return true;
  }

  return false;
})();
