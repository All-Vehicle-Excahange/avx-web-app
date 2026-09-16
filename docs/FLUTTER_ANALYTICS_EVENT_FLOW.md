# Flutter Analytics Implementation Guide: Call Consultant / Seller Flow

This document details the exact **Amplitude** and **Meta (Facebook App Events)** tracking specifications for the **Call Consultant** and **Call Seller** flow in the Flutter mobile app.

---

## 1. Flow Overview & Rules

| Step | User Action | Amplitude Event | Meta (Facebook) Event |
| :--- | :--- | :--- | :--- |
| **Step 1** | User taps **"Call Consultant"** / **"Call Seller"** button (Opens Call Bottom Sheet / Details) | `inquiry_initiated` | *None (Meta fires on submit only)* |
| **Step 2** | User taps **"Call Now"** button or launches phone dialer (`tel:`) | `inquiry_submitted` | `Inquiry` (Custom)<br>`Lead` (Standard)<br>`Contact` (Standard) |

---

## 2. Implementation Details

### Step 1: When User Taps "Call Consultant" or "Call Seller"

Trigger the Amplitude initiated event when the user taps the call button on the Vehicle Detail Screen.

#### Amplitude Event:
- **Event Name:** `inquiry_initiated`
- **Parameters:**
  - `vehicle_id` *(String)*: ID of the vehicle.
  - `vehicle_name` *(String)*: Title (Year Make Model Variant).
  - `seller_type` *(String)*: `"CONSULTATION"` or `"USER"`.
  - `source` *(String)*: `"call_button"`.
  - `is_logged_in` *(Boolean)*: Whether user is currently logged in.

#### Flutter (Dart) Code:
```dart
import 'package:amplitude_flutter/amplitude.dart';

void onCallButtonClicked({
  required Vehicle vehicle,
  required bool isLoggedIn,
}) {
  final String vehicleTitle =
      '${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}'.trim();

  // 1. Amplitude: inquiry_initiated
  Amplitude.getInstance().logEvent(
    'inquiry_initiated',
    eventProperties: {
      'vehicle_id': vehicle.id.toString(),
      'vehicle_name': vehicleTitle.isNotEmpty ? vehicleTitle : 'Vehicle Details',
      'seller_type': vehicle.sellerType, // "CONSULTATION" or "USER"
      'source': 'call_button',
      'is_logged_in': isLoggedIn,
    },
  );
  
  // Open Call BottomSheet / Dialog / Modal
  showCallBottomSheet(vehicle);
}
```

---

### Step 2: When User Confirms Call / Taps "Call Now" / Launches Phone Dialer

When the user actually initiates the phone call (or when `launchUrl(Uri.parse('tel:$phone'))` is executed):

#### 1. Amplitude Event:
- **Event Name:** `inquiry_submitted`
- **Parameters:**
  - `vehicle_id` *(String)*: ID of the vehicle.
  - `vehicle_name` *(String)*: Title (Year Make Model Variant).
  - `inquiry_type` *(String)*: `"Call Consultant"` (if `CONSULTATION`) or `"Call Seller"` (if `USER`).
  - `seller_type` *(String)*: `"CONSULTATION"` or `"USER"`.

#### 2. Meta (Facebook App Events):
- **Custom Event:** `Inquiry`
  - Parameters: `content_type`, `content_ids`, `content_name`, `seller_type`, `inquiry_type`
- **Standard Event:** `Lead`
  - Parameters: `content_type`, `content_ids`, `content_name`
- **Standard Event:** `Contact`
  - Parameters: `content_type`, `content_ids`, `content_name`

#### Flutter (Dart) Code:
```dart
import 'package:amplitude_flutter/amplitude.dart';
import 'package:facebook_app_events/facebook_app_events.dart';
import 'package:url_launcher/url_launcher.dart';

final FacebookAppEvents facebookAppEvents = FacebookAppEvents();

Future<void> onExecuteCall({
  required Vehicle vehicle,
  required String phoneNumber,
}) async {
  final String vehicleTitle =
      '${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}'.trim();
  final String inquiryType =
      vehicle.sellerType == 'CONSULTATION' ? 'Call Consultant' : 'Call Seller';

  // 1. Amplitude: inquiry_submitted
  Amplitude.getInstance().logEvent(
    'inquiry_submitted',
    eventProperties: {
      'vehicle_id': vehicle.id.toString(),
      'vehicle_name': vehicleTitle.isNotEmpty ? vehicleTitle : 'Vehicle Details',
      'inquiry_type': inquiryType,
      'seller_type': vehicle.sellerType,
    },
  );

  // 2. Meta Pixel / App Events: Custom Event "Inquiry"
  facebookAppEvents.logCustomEvent(
    name: 'Inquiry',
    parameters: {
      'content_type': 'vehicle',
      'content_ids': [vehicle.id.toString()],
      'content_name': vehicleTitle.isNotEmpty ? vehicleTitle : 'Vehicle Inquiry',
      'seller_type': vehicle.sellerType,
      'inquiry_type': inquiryType,
    },
  );

  // 3. Meta Pixel / App Events: Standard Event "Lead"
  facebookAppEvents.logEvent(
    name: 'Lead',
    parameters: {
      'content_type': 'vehicle',
      'content_ids': [vehicle.id.toString()],
      'content_name': vehicleTitle.isNotEmpty ? vehicleTitle : 'Vehicle Inquiry',
    },
  );

  // 4. Meta Pixel / App Events: Standard Event "Contact"
  facebookAppEvents.logEvent(
    name: 'Contact',
    parameters: {
      'content_type': 'vehicle',
      'content_ids': [vehicle.id.toString()],
      'content_name': vehicleTitle.isNotEmpty ? vehicleTitle : 'Vehicle Inquiry',
    },
  );

  // 5. Open Dialer
  final Uri launchUri = Uri(scheme: 'tel', path: phoneNumber);
  if (await canLaunchUrl(launchUri)) {
    await launchUrl(launchUri);
  }
}
```

---

## 3. Quick Reference Table

| Trigger Point | Amplitude Event | Meta (Facebook) Events |
| :--- | :--- | :--- |
| **User taps "Call Consultant / Seller"** | `inquiry_initiated`<br>• `source: "call_button"` | *(None)* |
| **User executes Call / Taps "Call Now"** | `inquiry_submitted`<br>• `inquiry_type: "Call Consultant"` or `"Call Seller"` | • `Inquiry` (Custom Event)<br>• `Lead` (Standard Event)<br>• `Contact` (Standard Event) |
