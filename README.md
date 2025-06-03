# 🌐 Gaia Domains Status Monitor

This project is a simple status page that checks the availability of a list of Gaia domains every 4 hours and displays their current status.

## ✨ Features

- Checks domains status via `POST /v1/info`
- Detects domain unavailability from specific error responses
- Shows loading indicator while checking
- Displays last checked time
- Clickable domain links (open in new tab)
- Fully responsive table view for large domain lists

## 🛠️ Stack

- Next.js (App Router)
- TailwindCSS
- ShadCN UI components
- Lucide icons

## 📡 Update Frequency

Domain statuses are automatically refreshed every **4 hours** to avoid excessive load.

---
Made for monitoring [GaiaNet](https://gaianet.ai) domains with ease.
