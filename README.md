## REECOMM

## 1. Get Sponsored Ads

Use when showing sponsored vehicles on homepage/search/detail page.

```bash
curl --location 'localhost:8103/api/v1/website/ppc/delivery/recommendations?make=Mercedes&model=C-Class&vehicleType=FOUR_WHEELER&maxPrice=5000000&placement=SEARCH_RESULT_PAGE&page=0&size=10' \
--header 'Authorization: Bearer YOUR_TOKEN'
```

## 2. Track Impression

Use when sponsored ad is visible on screen. No budget deduction.

```bash
curl --location --request POST 'localhost:8103/api/v1/website/ppc/delivery/AD_ID/impression?placement=SEARCH_RESULT_PAGE' \
--header 'Authorization: Bearer YOUR_TOKEN'
```

## 3. Track Click

Use when user clicks sponsored ad. If campaign is `CPC`, budget is deducted.

```bash
curl --location --request POST 'localhost:8103/api/v1/website/ppc/delivery/AD_ID/click?placement=SEARCH_RESULT_PAGE' \
--header 'Authorization: Bearer YOUR_TOKEN'
```

## 4. Track CPI Inquiry

Use when user sends inquiry on a sponsored vehicle. If campaign is `CPI`, budget is deducted.

```bash
curl --location 'localhost:8103/api/v1/website/vehicle/inquiry/VEHICLE_ID' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--data '{
  "inquiryTitle": "Interested in this car",
  "inquiryDescription": "Please share more details",
  "sponsoredAdId": "AD_ID",
  "sponsoredPlacement": "VEHICLE_DETAIL_PAGE"
}'
```




## Analytics APIs To Add

These are planned APIs, not implemented yet:

```bash
curl --location 'localhost:8103/api/v1/website/ppc/boost/CAMPAIGN_ID/analytics' \
--header 'Authorization: Bearer YOUR_TOKEN'
```

```bash
curl --location 'localhost:8103/api/v1/website/ppc/ad/AD_ID/analytics' \
--header 'Authorization: Bearer YOUR_TOKEN'
```

```bash
curl --location 'localhost:8103/api/v1/website/ppc/boost/CAMPAIGN_ID/billing-transactions?pageNo=1&size=10' \
--header 'Authorization: Bearer YOUR_TOKEN'
```