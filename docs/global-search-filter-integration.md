# Global Search Index & Vehicle Filter Integration Guide

This document explains the technical architecture, JSON schema, client-side keyword searching mechanism, and parameter-to-API mapping for the **Global Search Index** (`search_index.json`) for all non-consultant vehicle filter searches (`type: "vehicle_filter"`).

---

## 🎯 Architecture Overview

1. **Server Generator Job (Cron)**: Parses website sitemaps, GEO/Brand models, and filter pages into a lightweight search index (`search_index.json`).
2. **CDN / Static Endpoint**: Serves `search_index.json` via `GET /api/v1/website/search/index` or `GET /search_index.json` with 24-hour HTTP caching.
3. **Client App Local Memory Index**: The mobile app downloads the index once at startup (~500KB) and searches locally with **0ms latency**.
4. **Filter Execution**: When a user selects a `vehicle_filter` search item, the app extracts the item's `params` object and converts it directly into a payload for the **Vehicle Filter Sections API** (`POST /api/v1/website/vehicle/filter/sections`).

```
[Mobile App Startup] ---> Download search_index.json (8,000+ items)
                                  |
                                  v
[User Types Keyword] ---> Instant Local Keyword Filter (0ms Latency)
                                  |
                                  v
[User Selects Item] ---> Extract `params` (Maker, Model, City, SubType, Price, Fuel)
                                  |
                                  v
                       Call POST /api/v1/website/vehicle/filter/sections
```

---

## 📄 `vehicle_filter` Item JSON Schema

Each vehicle search item in `search_index.json` has `type: "vehicle_filter"` and follows this JSON structure:

```json
{
  "id": "used_cars_honda_city_ahmedabad",
  "title": "Honda City in Ahmedabad",
  "keywords": ["honda", "city", "ahmedabad", "sedan", "used car"],
  "type": "vehicle_filter",
  "params": {
    "makerName": "Honda",
    "modelName": "City",
    "city": "Ahmedabad",
    "vehicleType": "FOUR_WHEELER"
  }
}
```

### Supported `params` Properties:

| Parameter Key | Data Type | Example Values | Vehicle Filter API Field |
| :--- | :--- | :--- | :--- |
| `vehicleType` | String | `"FOUR_WHEELER"`, `"TWO_WHEELER"` | Query parameter `vehicleType` |
| `makerName` | String | `"Honda"`, `"Maruti Suzuki"`, `"Hyundai"` | Body payload `makerNames: ["Honda"]` |
| `modelName` | String | `"City"`, `"Swift"`, `"Creta"` | Body payload `modelNames: ["City"]` |
| `city` | String | `"Ahmedabad"`, `"Mumbai"`, `"Delhi"` | Body payload `cities: ["Ahmedabad"]` |
| `vehicleSubType` | String | `"SUV"`, `"SEDAN"`, `"HATCHBACK"`, `"SCOOTER"` | Body payload `vehicleSubTypes: ["SUV"]` |
| `maxPrice` | Number | `500000`, `1000000` | Body payload `maxPrice: 500000` |
| `fuelType` | String | `"PETROL"`, `"DIESEL"`, `"ELECTRIC"`, `"CNG"` | Body payload `fuelTypes: ["PETROL"]` |
| `avxInspected` | Boolean | `true`, `false` | Body payload `avxInspected: true` |

---

## 🔍 Client-Side Keyword Matching Algorithm

The mobile app searches the in-memory `search_index.json` array locally without network calls during typing.

### Matching Logic:
1. Normalize query input to lowercase and trim spaces (`query.toLowerCase().trim()`).
2. Split search query into individual search tokens (e.g. `"honda city ahmedabad"` -> `["honda", "city", "ahmedabad"]`).
3. Check if all query tokens match against the item's `title` OR `keywords` array.

### Flutter / Dart Local Search Snippet:

```dart
class SearchIndexItem {
  final String id;
  final String title;
  final List<String> keywords;
  final String type; // 'vehicle_filter' or 'consultant'
  final Map<String, dynamic> params;

  SearchIndexItem({
    required this.id,
    required this.title,
    required this.keywords,
    required this.type,
    required this.params,
  });

  factory SearchIndexItem.fromJson(Map<String, dynamic> json) {
    return SearchIndexItem(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      keywords: List<String>.from(json['keywords'] ?? []),
      type: json['type'] ?? '',
      params: Map<String, dynamic>.from(json['params'] ?? {}),
    );
  }

  bool matchesQuery(String query) {
    if (query.trim().isEmpty) return false;
    final tokens = query.toLowerCase().split(RegExp(r'\s+'));
    final searchableText = '$title ${keywords.join(' ')}'.toLowerCase();
    
    // Returns true if all entered words exist in title or keywords
    return tokens.every((token) => searchableText.contains(token));
  }
}
```

---

## 🔀 Mapping `vehicle_filter` Params to Vehicle Filter API

When a user selects a `vehicle_filter` search item, convert `params` into the request payload for `POST /api/v1/website/vehicle/filter/sections`.

### Mapping Table:

```
search_index.json params                Vehicle Filter Sections API Payload
-------------------------                ----------------------------------
params.vehicleType    -----------------> GET Query: ?vehicleType=FOUR_WHEELER
params.makerName      -----------------> POST Body: "makerNames": ["Honda"]
params.modelName      -----------------> POST Body: "modelNames": ["City"]
params.city           -----------------> POST Body: "cities": ["Ahmedabad"]
params.vehicleSubType -----------------> POST Body: "vehicleSubTypes": ["SUV"]
params.maxPrice       -----------------> POST Body: "maxPrice": 500000
params.fuelType       -----------------> POST Body: "fuelTypes": ["PETROL"]
params.avxInspected   -----------------> POST Body: "avxInspected": true
```

---

## 🛠️ Code Example: Executing Search Result Filter API

### Flutter / Dart Filter Request Execution:

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<List<dynamic>> fetchVehiclesFromSearchFilter(SearchIndexItem item, {int pageNo = 1, int size = 10}) async {
  if (item.type != 'vehicle_filter') {
    throw Exception("Item is not a vehicle filter");
  }

  final params = item.params;
  final vehicleType = params['vehicleType'] ?? 'FOUR_WHEELER';

  // Build backend Filter Sections API URL
  final url = Uri.parse(
    'https://www.reecomm.com/api/v1/website/vehicle/filter/sections?pageNo=$pageNo&size=$size&vehicleType=$vehicleType'
  );

  // Construct request payload directly from params
  final Map<String, dynamic> bodyPayload = {};

  if (params.containsKey('makerName') && params['makerName'] != null) {
    bodyPayload['makerNames'] = [params['makerName']];
  }
  if (params.containsKey('modelName') && params['modelName'] != null) {
    bodyPayload['modelNames'] = [params['modelName']];
  }
  if (params.containsKey('city') && params['city'] != null) {
    bodyPayload['cities'] = [params['city']];
  }
  if (params.containsKey('vehicleSubType') && params['vehicleSubType'] != null) {
    bodyPayload['vehicleSubTypes'] = [params['vehicleSubType']];
  }
  if (params.containsKey('maxPrice') && params['maxPrice'] != null) {
    bodyPayload['maxPrice'] = params['maxPrice'];
  }
  if (params.containsKey('fuelType') && params['fuelType'] != null) {
    bodyPayload['fuelTypes'] = [params['fuelType']];
  }
  if (params.containsKey('avxInspected') && params['avxInspected'] != null) {
    bodyPayload['avxInspected'] = params['avxInspected'];
  }

  final response = await http.post(
    url,
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode(bodyPayload),
  );

  if (response.statusCode == 200) {
    final responseData = jsonDecode(response.body);
    return responseData['data'] ?? [];
  } else {
    throw Exception('Failed to fetch filtered vehicles: ${response.statusCode}');
  }
}
```

---

## 💡 Examples of Filter Mapping Scenarios

### Scenario 1: Brand + Model + City Combination
- **Selected Item**: `Honda City in Ahmedabad`
- **Params**: `{ "makerName": "Honda", "modelName": "City", "city": "Ahmedabad", "vehicleType": "FOUR_WHEELER" }`
- **Target API**: `POST /api/v1/website/vehicle/filter/sections?pageNo=1&size=10&vehicleType=FOUR_WHEELER`
- **Payload**:
```json
{
  "makerNames": ["Honda"],
  "modelNames": ["City"],
  "cities": ["Ahmedabad"]
}
```

### Scenario 2: Budget Filter (SUVs Under ₹5 Lakhs)
- **Selected Item**: `SUVs Under ₹5 Lakhs`
- **Params**: `{ "vehicleSubType": "SUV", "maxPrice": 500000, "vehicleType": "FOUR_WHEELER" }`
- **Target API**: `POST /api/v1/website/vehicle/filter/sections?pageNo=1&size=10&vehicleType=FOUR_WHEELER`
- **Payload**:
```json
{
  "vehicleSubTypes": ["SUV"],
  "maxPrice": 500000
}
```

### Scenario 3: Reecomm Inspected Cars Filter
- **Selected Item**: `Reecomm Inspected Cars`
- **Params**: `{ "avxInspected": true, "vehicleType": "FOUR_WHEELER" }`
- **Target API**: `POST /api/v1/website/vehicle/filter/sections?pageNo=1&size=10&vehicleType=FOUR_WHEELER`
- **Payload**:
```json
{
  "avxInspected": true
}
```
