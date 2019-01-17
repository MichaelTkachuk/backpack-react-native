/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

#import "RCTCalendarViewManager.h"
#import "RCTConvert+RCTCalendarView.h"


@implementation RCTCalendarViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    RCTCalendarView *calendar = [[RCTCalendarView alloc] initWithFrame:CGRectZero];

    // Note: This is where we hard coded constraints to make the calendar display correctly in development.
    // We want to remove these and have React Native define the layout based on the flex properties coming
    // over the bridge.

//    calendar.translatesAutoresizingMaskIntoConstraints = NO;
//    [NSLayoutConstraint activateConstraints:@[
//                                              [calendar.widthAnchor constraintEqualToConstant:300],
//                                              [calendar.heightAnchor constraintEqualToConstant:500]
//                                              ]];

    calendar.delegate = self;
    return calendar;
}

RCT_EXPORT_VIEW_PROPERTY(minDate, NSDate)
RCT_EXPORT_VIEW_PROPERTY(maxDate, NSDate)
RCT_EXPORT_VIEW_PROPERTY(selectionType, BPKCalendarSelection)
RCT_EXPORT_VIEW_PROPERTY(locale, NSLocale)
RCT_EXPORT_VIEW_PROPERTY(selectedDates, NSArray<NSDate *> *)

RCT_EXPORT_VIEW_PROPERTY(onDateSelection, RCTBubblingEventBlock)

#pragma mark RCTCalendarViewDelegate

/*
 * `RCTCalendarViewManager` acts as the delegate of all of the `RCTCalendarView` views. This is just one
 * pattern and it's perfectly fine to call `onDateSelection` from the `RCTCalendarView` directly.
 */
- (void)calendar:(RCTCalendarView *)calendar didChangeDateSelection:(NSArray<NSDate *> *)dateList {
    if (!calendar.onDateSelection) {
        return;
    }

    NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
    [dateFormat setDateFormat:@"yyyy'-'MM'-'dd'T'HH':'mm':'ss.SSS'Z'"];

    NSMutableArray * stringArray = [[NSMutableArray alloc]init];
    for (NSDate *date in dateList) {
        [stringArray addObject:[dateFormat stringFromDate:date]];
    }

    calendar.onDateSelection(@{@"selectedDates": stringArray});
}

@end
