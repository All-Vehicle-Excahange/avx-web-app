# Vehicle Filter Sections API & Helper Lookups Guide

This document provides complete specifications, request payload structures, static filter enum options (4-Wheeler & 2-Wheeler), dynamic helper lookup APIs, response definitions, cURL examples, and integration code snippets (JavaScript/React & Dart/Flutter) for the **Vehicle Filter Sections API**.

---

## 1. Main API Overview

* **Endpoint:** `https://www.reecomm.com/api/v1/website/vehicle/filter/sections`
* **HTTP Method:** `POST`
* **Content-Type:** `application/json`
* **Authentication:** Public

### Query Parameters

Passed in the URL query string:

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `pageNo` | Integer | Yes | `1` | Page number for pagination (1-indexed) |
| `size` | Integer | Yes | `9` | Number of items per page |
| `vehicleType` | String | Yes | `FOUR_WHEELER` | Vehicle category (`FOUR_WHEELER` or `TWO_WHEELER`) |
| `sortBy` | String | No | - | Field to sort results by (`price`, `yearOfMfg`, `createdAt`, `minKmDriven`) |
| `direction` | String | No | `desc` | Sort direction (`asc` or `desc`) |

---

## 2. Filter Options: 4-Wheeler vs 2-Wheeler

The filter options can be either **Static Enums** (pre-defined constants) or **Dynamic Lookups** (fetched from backend APIs).

### A. Static Filter Enums

#### 1. Vehicle Type (`vehicleType`)
* `FOUR_WHEELER`
* `TWO_WHEELER`

#### 2. Body Types / Vehicle SubTypes (`vehicleSubTypes`)

| Category | Available SubTypes / Enum Values | UI Display Labels |
| :--- | :--- | :--- |
| **4-Wheeler (`FOUR_WHEELER`)** | `SEDAN`, `HATCHBACK`, `SUV`, `LUXURY_SUV`, `LUXURY_SEDAN`, `MUV_MPV`, `COUPE`, `CONVERTIBLE` | Sedan, Hatchback, SUV, Luxury SUV, Luxury Sedan, MUV/MPV |
| **2-Wheeler (`TWO_WHEELER`)** | `SCOOTER`, `COMMUTER_BIKES`, `SPORTS_BIKES`, `CRUISER_RETRO`, `ADVENTURE_TOURING`, `ELECTRIC_2W` | Scooters, Commuter Bikes, Sports Bikes, Cruiser & Retro, Adventure & Touring, Electric 2W |

#### 3. Fuel Types (`fuelTypes`)
* **4-Wheeler:** `PETROL`, `DIESEL`, `CNG`, `ELECTRIC`, `HYBRID`, `LPG`, `PETROL_PLUS_CNG`
* **2-Wheeler:** `PETROL`, `ELECTRIC`

#### 4. Transmission Types (`transmissionTypes`)
* `MANUAL`
* `AUTOMATIC`

#### 5. Seller Types (`sellerType`)
* `DEALER`
* `INDIVIDUAL`
* `CONSULTANT`

---

## 3. Dynamic Lookup APIs (Helper Services)

Filter values like **Makers (Brands)**, **Models**, **Variants**, **Available Years**, and **Locations** are retrieved dynamically using these backend endpoints:

| Feature / Filter | API Endpoint | HTTP Method | Query Parameters | Description |
| :--- | :--- | :--- | :--- | :--- |
| **1. Search Makers / Brands** | `/search/makers` | `GET` | `search`, `page`, `limit`, `bodyType` | Fetches brand options (e.g. Maruti, Hyundai for 4W / Hero, Honda for 2W) |
| **2. Search Models** | `/search/models` | `GET` | `search`, `makerId`, `bodyType`, `page`, `limit` | Fetches vehicle models for selected brand/maker ID |
| **3. Search Variants** | `/search/variants` | `GET` | `modelId`, `fuelType`, `year`, `bodyType`, `search`, `page`, `limit` | Fetches variant options under a model |
| **4. Fuel Types by Model** | `/search/fuel-types` | `GET` | `modelId`, `bodyType` | Gets valid fuel types for a selected model |
| **5. Transmissions by Model** | `/search/transmission-types` | `GET` | `modelId`, `bodyType` | Gets valid transmission options for a model |
| **6. Manufacturing Years** | `/search/model-years` | `GET` | `modelId`, `bodyType` | Gets available manufacturing years for a model |
| **7. Popular Cities & States** | `/util/address/popular-cities-states` | `GET` | None | Returns popular states & cities for location filter |
| **8. Search Cities & States** | `/util/address/search-cities-states` | `GET` | `searchText` | Search location by city or state name |
| **9. Makers by Fuel/Body** | `/search/fuelTypesandbodyTypesmakers` | `GET` | `fuelType`, `bodyType`, `page`, `limit` | Filters makers offering a specific fuel or body type |

---

## 4. Main Request Payload Specification

All fields in the JSON body are optional:

```json
{
  "makerIds": [15005, 15010],
  "modelIds": [101, 102],
  "variantIds": [501],
  "vehicleSubTypes": ["SEDAN", "SUV"],
  "fuelTypes": ["PETROL", "DIESEL"],
  "transmissionTypes": ["MANUAL", "AUTOMATIC"],
  "minPrice": 100000,
  "maxPrice": 1500000,
  "mfgYear": 2022,
  "minKmDriven": 0,
  "maxKmDriven": 50000,
  "stateId": 4030,
  "cityId": 133526,
  "townId": 1,
  "sellerType": "DEALER",
  "minInspectionRating": 4.0,
  "avxInspected": true
}
```

---

## 5. cURL Code Examples

### 4-Wheeler Filtered Search
```bash
curl -X POST "https://www.reecomm.com/api/v1/website/vehicle/filter/sections?pageNo=1&size=9&vehicleType=FOUR_WHEELER&sortBy=price&direction=asc" \
  -H "Content-Type: application/json" \
  -d '{
    "makerIds": [15005],
    "vehicleSubTypes": ["SUV", "SEDAN"],
    "fuelTypes": ["DIESEL"],
    "minPrice": 500000,
    "maxPrice": 2000000,
    "cityId": 133526
  }'
```

### 2-Wheeler Filtered Search
```bash
curl -X POST "https://www.reecomm.com/api/v1/website/vehicle/filter/sections?pageNo=1&size=9&vehicleType=TWO_WHEELER&sortBy=price&direction=asc" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleSubTypes": ["SCOOTER", "SPORTS_BIKES"],
    "fuelTypes": ["PETROL", "ELECTRIC"],
    "minPrice": 30000,
    "maxPrice": 250000
  }'
```

---

## 6. Code Integration Examples

### JavaScript / React Helper & Filter Call

```javascript
import axios from "axios";

const API_BASE_URL = "https://www.reecomm.com/api/v1/website";

// 1. Helper API: Fetch Makers / Brands
export const fetchMakers = async ({ search = "", page = 1, limit = 20, bodyType }) => {
  const response = await axios.get(`${API_BASE_URL}/search/makers`, {
    params: { search, page, limit, bodyType },
  });
  return response.data;
};

// 2. Helper API: Fetch Models by Maker ID
export const fetchModels = async ({ makerId, search = "", bodyType }) => {
  const response = await axios.get(`${API_BASE_URL}/search/models`, {
    params: { makerId, search, bodyType },
  });
  return response.data;
};

// 3. Main Filter API: Fetch Filtered Vehicles
export const getFilteredVehicles = async (payload = {}, queryParams = {}) => {
  const {
    pageNo = 1,
    size = 9,
    vehicleType = "FOUR_WHEELER",
    sortBy,
    direction = "desc",
  } = queryParams;

  const response = await axios.post(`${API_BASE_URL}/vehicle/filter/sections`, payload, {
    params: {
      pageNo,
      size,
      vehicleType,
      ...(sortBy ? { sortBy, direction } : {}),
    },
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};
```

### Dart / Flutter Integration

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Map<String, dynamic>> fetchFilteredVehicles({
  required int pageNo,
  required int size,
  String vehicleType = 'FOUR_WHEELER', // 'FOUR_WHEELER' or 'TWO_WHEELER'
  String? sortBy,
  String direction = 'desc',
  Map<String, dynamic>? filterPayload,
}) async {
  final queryParams = {
    'pageNo': pageNo.toString(),
    'size': size.toString(),
    'vehicleType': vehicleType,
    if (sortBy != null) 'sortBy': sortBy,
    if (sortBy != null) 'direction': direction,
  };

  final uri = Uri.https(
    'www.reecomm.com',
    '/api/v1/website/vehicle/filter/sections',
    queryParams,
  );

  final response = await http.post(
    uri,
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode(filterPayload ?? {}),
  );

  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  } else {
    throw Exception('Failed to load vehicles: ${response.statusCode}');
  }
}
```
