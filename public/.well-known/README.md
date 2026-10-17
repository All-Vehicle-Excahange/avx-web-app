# Universal / App Links (Meta Catalogue_Vehicles_App)

These files enable HTTPS vehicle URLs to open the Reecomm app.

## Files

- `apple-app-site-association` — iOS Universal Links (team `8UCFR8ZFJ5`, bundle `com.reecomm.vehicle.marketplace`)
- `assetlinks.json` — Android App Links for `com.reecomm.vehicle.marketplace`

## Android SHA-256

`assetlinks.json` currently uses the Play **App signing** SHA-256:

`DA:F1:26:4A:75:4E:3D:2D:E9:B7:B0:93:98:6D:CA:41:12:C4:27:FF:81:CB:7C:6F:C2:E4:0B:C2:34:1C:34:CE`

Optional: add a second fingerprint for your local debug keystore if you test App Links on debug builds.

## After deploy

- https://www.reecomm.com/.well-known/apple-app-site-association → 200 JSON
- https://www.reecomm.com/.well-known/assetlinks.json → 200 JSON (real SHA-256, not the placeholder)
