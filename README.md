# Himalayan Trek With Rajdeep | Uttarakhand Guide

A responsive, static website for Himalayan trek guiding, bird watching, and travel planning in Uttarakhand.

## Project structure

- `index.html` — home page and main entry point
- Other `.html` files — trek details, booking, bird watching, gallery, reviews, destinations, and policies
- `css/` — site stylesheets
- `js/` — site interactions and booking scripts
- `images/` — existing photos, backgrounds, and brand images
- `robots.txt` and `sitemap.xml` — crawler access and canonical public page URLs

The site uses relative paths so its pages and local assets work under a GitHub Pages project site. Icons and fonts are currently loaded from Font Awesome and Google Fonts CDNs; an internet connection is needed for those external resources.

## Run locally

Open `index.html` in a browser. No build step or package installation is required.

## GitHub Pages and search engines

The published project site is [HIMALAYAN-TREK-WITH-RAJDEEP-UTTARAKHAND-GUIDE](https://rajdeep112233.github.io/HIMALAYAN-TREK-WITH-RAJDEEP-UTTARAKHAND-GUIDE/). Keep `index.html` in the repository root and retain the relative asset/page paths so the site continues to work under the repository URL path.

The root `robots.txt` points crawlers to `sitemap.xml`. The sitemap lists indexable public pages and the existing query-based trek detail URLs. Booking enquiries and the traveller feedback page are excluded from the sitemap and marked `noindex`; the feedback page publishes no unverified reviews. Sending an enquiry does not confirm a reservation.

To use Google Search Console, verify the published site URL-prefix property, then submit `https://rajdeep112233.github.io/HIMALAYAN-TREK-WITH-RAJDEEP-UTTARAKHAND-GUIDE/sitemap.xml`. Search Console verification, sitemap submission, and indexing requests must be completed by a site owner; this project does not perform them.

No backend, build process, or dependency installation is required.
