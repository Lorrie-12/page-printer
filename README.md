# Page Printer

> Page Printer captures full-page screenshots or exports web pages as high-quality PDFs. It’s perfect for archiving, documentation, or automated website capture — all with simple, programmable control.

> Whether you're validating layouts, saving reports, or generating PDFs dynamically, this scraper streamlines the entire process.


<p align="center">
  <a href="https://bitbash.def" target="_blank">
    <img src="https://github.com/za2122/footer-section/blob/main/media/scraper.png" alt="Bitbash Banner" width="100%"></a>
</p>
<p align="center">
  <a href="https://t.me/devpilot1" target="_blank">
    <img src="https://img.shields.io/badge/Chat%20on-Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">
  </a>&nbsp;
  <a href="https://wa.me/923249868488?text=Hi%20BitBash%2C%20I'm%20interested%20in%20automation." target="_blank">
    <img src="https://img.shields.io/badge/Chat-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>&nbsp;
  <a href="mailto:sale@bitbash.dev" target="_blank">
    <img src="https://img.shields.io/badge/Email-sale@bitbash.dev-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
  </a>&nbsp;
  <a href="https://bitbash.dev" target="_blank">
    <img src="https://img.shields.io/badge/Visit-Website-007BFF?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website">
  </a>
</p>




<p align="center" style="font-weight:600; margin-top:8px; margin-bottom:8px;">
  Created by Bitbash, built to showcase our approach to Scraping and Automation!<br>
  If you are looking for <strong>Page Printer</strong> you've just found your team — Let’s Chat. 👆👆
</p>


## Introduction

This project automates the task of capturing webpages as either image snapshots or PDF documents.
It’s built for developers, QA engineers, marketers, and analysts who need reliable, repeatable visual outputs from web content.

### Why It Matters

- Converts any web page into a print-ready PDF or image format.
- Allows custom pre-scripting before capture to manipulate page states.
- Ideal for performance reports, UI tests, and content verification.
- Supports dynamic pages with user interaction steps.
- Outputs rich metadata including custom notes or visibility flags.

## Features

| Feature | Description |
|----------|-------------|
| Pre-function scripting | Run custom Playwright code before capture to manipulate page state. |
| Screenshot and PDF export | Save pages as either full screenshots or printable PDFs. |
| Custom output metadata | Record visibility flags, user notes, or any contextual data in output. |
| Flexible schema editing | Extend or modify the input schema using JSON tools. |
| Automation ready | Works seamlessly in batch processing or CI environments. |

---

## What Data This Scraper Extracts

| Field Name | Field Description |
|-------------|------------------|
| url | The target webpage URL that was captured. |
| fileUrl | The output file’s public URL for download. |
| fileKey | The unique identifier of the saved file. |
| notes | Object containing custom attributes such as visibility checks or page states. |

---

## Example Output


    [
      {
        "url": "https://example.com/page1",
        "fileUrl": "https://storage.example.com/page1.pdf",
        "fileKey": "page1_12345",
        "notes": {
          "isElementVisible": true
        }
      },
      {
        "url": "https://example.com/page2",
        "fileUrl": "https://storage.example.com/page2.pdf",
        "fileKey": "page2_67890",
        "notes": {
          "isElementVisible": false
        }
      }
    ]

---

## Directory Structure Tree


    page-printer-scraper/
    ├── src/
    │   ├── main.js
    │   ├── crawler/
    │   │   ├── playwright_runner.js
    │   │   └── prefunction.js
    │   ├── schemas/
    │   │   ├── input_schema.json
    │   │   └── output_schema.json
    │   └── utils/
    │       ├── logger.js
    │       └── file_helper.js
    ├── data/
    │   ├── samples/
    │   │   └── output_example.json
    │   └── inputs.sample.json
    ├── package.json
    ├── LICENSE
    └── README.md

---

## Use Cases

- **Developers** use it to capture UI changes after deployment, so they can compare visual results easily.
- **Marketers** generate automated PDF reports of campaign landing pages for review and record-keeping.
- **Quality assurance teams** verify layout and responsive behavior through pre-scripted captures.
- **Data analysts** archive visual data snapshots for regulatory or presentation needs.
- **Content managers** use it to create on-demand visual backups of live content.

---

## FAQs

**Q: Can I interact with the page before taking a screenshot?**
Yes — you can use a pre-function script to click elements, fill forms, or wait for dynamic content before capture.

**Q: Does it support both PDFs and images?**
Absolutely. You can choose to generate a screenshot (image) or export the page as a PDF.

**Q: What if the element I need isn’t visible yet?**
You can script waits or checks in the pre-function to ensure the element appears before capturing.

**Q: How can I modify the input schema?**
You can edit the JSON schema in `src/schemas` and generate updated types or validation using schema tools.

---

## Performance Benchmarks and Results

**Primary Metric:** Captures an average of 10–15 pages per minute depending on network speed and page complexity.
**Reliability Metric:** Maintains a 98% success rate on varied web content including dynamic pages.
**Efficiency Metric:** Optimized browser sessions reuse context for minimal resource overhead.
**Quality Metric:** Produces consistent, full-resolution screenshots and PDF outputs with pixel-accurate fidelity.


<p align="center">
<a href="https://calendar.app.google/74kEaAQ5LWbM8CQNA" target="_blank">
  <img src="https://img.shields.io/badge/Book%20a%20Call%20with%20Us-34A853?style=for-the-badge&logo=googlecalendar&logoColor=white" alt="Book a Call">
</a>
  <a href="https://www.youtube.com/@bitbash-demos/videos" target="_blank">
    <img src="https://img.shields.io/badge/🎥%20Watch%20demos%20-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch on YouTube">
  </a>
</p>
<table>
  <tr>
    <td align="center" width="33%" style="padding:10px;">
      <a href="https://youtu.be/MLkvGB8ZZIk" target="_blank">
        <img src="https://github.com/za2122/footer-section/blob/main/media/review1.gif" alt="Review 1" width="100%" style="border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      </a>
      <p style="font-size:14px; line-height:1.5; color:#444; margin:0 15px;">
        “Bitbash is a top-tier automation partner, innovative, reliable, and dedicated to delivering real results every time.”
      </p>
      <p style="margin:10px 0 0; font-weight:600;">Nathan Pennington
        <br><span style="color:#888;">Marketer</span>
        <br><span style="color:#f5a623;">★★★★★</span>
      </p>
    </td>
    <td align="center" width="33%" style="padding:10px;">
      <a href="https://youtu.be/8-tw8Omw9qk" target="_blank">
        <img src="https://github.com/za2122/footer-section/blob/main/media/review2.gif" alt="Review 2" width="100%" style="border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      </a>
      <p style="font-size:14px; line-height:1.5; color:#444; margin:0 15px;">
        “Bitbash delivers outstanding quality, speed, and professionalism, truly a team you can rely on.”
      </p>
      <p style="margin:10px 0 0; font-weight:600;">Eliza
        <br><span style="color:#888;">SEO Affiliate Expert</span>
        <br><span style="color:#f5a623;">★★★★★</span>
      </p>
    </td>
    <td align="center" width="33%" style="padding:10px;">
      <a href="https://youtube.com/shorts/6AwB5omXrIM" target="_blank">
        <img src="https://github.com/za2122/footer-section/blob/main/media/review3.gif" alt="Review 3" width="35%" style="border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      </a>
      <p style="font-size:14px; line-height:1.5; color:#444; margin:0 15px;">
        “Exceptional results, clear communication, and flawless delivery. Bitbash nailed it.”
      </p>
      <p style="margin:10px 0 0; font-weight:600;">Syed
        <br><span style="color:#888;">Digital Strategist</span>
        <br><span style="color:#f5a623;">★★★★★</span>
      </p>
    </td>
  </tr>
</table>
