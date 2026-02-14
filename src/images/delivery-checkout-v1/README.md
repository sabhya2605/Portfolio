# Delivery Checkout V1 – Opportunity mockups

Mockup images are exported from Figma. Each image must include the **Apple iPhone 15 Pro Black Titanium** frame (dark grey bezel, Dynamic Island, rounded corners).

To generate them:

```bash
FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-opportunity-images.js
```

**Figma reference:** [node-id=2362-17170](https://www.figma.com/design/re5Fauw1m9dJxYlIdR8Btn/Saurabh-Sabhya-Shared-file?node-id=2362-17170)

**Node mapping (export the frame + screen – parent "Apple iPhone 15 Pro Black Titanium 1"):**
- `mockup-discount.png` ← 2362:17162 (Sumo Chinese – Discount highlight and product upsell)
- `mockup-progressive.png` ← 2362:17170 (EatFit – Progressive disclosure of payment details)
- `mockup-cognition.png` ← 2362:17154 (MOJO Pizza – Cognition at checkout decision making)
- `things-working-for-us.png` ← 2362:17175 (Things that have been working for us – two phones with annotations)

If images lack the frame, export the parent node that contains the "Apple iPhone 15 Pro Black Titanium" frame in Figma.
