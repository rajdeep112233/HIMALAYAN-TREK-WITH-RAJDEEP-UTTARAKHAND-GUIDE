# Himalayan Trek With Rajdeep | Uttarakhand Guide

A responsive, static website for Himalayan trek guiding, bird watching, and travel planning in Uttarakhand.

## Project structure

- `index.html` — home page and main entry point
- Other `.html` files — trek details, booking, bird watching, gallery, reviews, destinations, and policies
- `css/` — site stylesheets
- `js/` — site interactions and booking scripts
- `images/` — existing photos, backgrounds, and brand images

The site uses relative paths so its pages and local assets work under a GitHub Pages project site. Icons and fonts are currently loaded from Font Awesome and Google Fonts CDNs; an internet connection is needed for those external resources.

## Run locally

Open `index.html` in a browser. No build step or package installation is required.

## Deploy with GitHub Pages

1. Create a GitHub repository named `himalayan-trek-with-rajdeep` under `rajdeep112233`.
2. From this project folder, initialize the `main` branch and push the files:

   ```sh
   git init -b main
   git add .
   git commit -m "Initial website"
   git remote add origin https://github.com/rajdeep112233/himalayan-trek-with-rajdeep.git
   git push -u origin main
   ```

   Keep `index.html` in the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Set the branch to **main** and the folder to **/(root)**, then save.
6. After GitHub Pages finishes publishing, visit the site address shown in repository settings.

No backend, build process, or dependency installation is required.
