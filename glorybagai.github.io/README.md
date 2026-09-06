# glorybagai.github.io

Personal website for Glory K. Bagai. Plain HTML, CSS and JavaScript — no Jekyll,
no build step, no dependencies to install.

```
index.html            about
research.html         publications and presentations
news.html             updates
volunteering.html     female STEM advocacy
.nojekyll             tells GitHub Pages to serve the files exactly as they are
assets/css/style.css  all styling
assets/js/site.js     photo galleries + ctrl-k search
assets/img/glory_bagai.jpg   your portrait
assets/img/matlab/ technovation/ ieee/ waaw/ enactus/ spe/   gallery photos
```

To change your portrait later, drop a new picture in at
`assets/img/glory_bagai.jpg`. Keep the same filename and it will just work; a
4:5 portrait crop around 880×1100 pixels fits the layout.

## 1. Put it on GitHub Pages

For a user site at `https://glorybagai.github.io`, the repository must be named
exactly `glorybagai.github.io`.

**If you do not have that repository yet**

1. On GitHub, click **New repository**.
2. Name it `glorybagai.github.io`, make it **Public**, and create it.
3. On the new repo page, click **uploading an existing file**.
4. Drag in everything from this folder — `index.html`, `research.html`,
   `news.html`, `volunteering.html`, `README.md`, and the whole `assets` folder.
   Also drag in `.nojekyll` (hidden files may not show in Finder; press
   `Cmd+Shift+.` on macOS to reveal them).
5. Commit. Go to **Settings → Pages** and set the source to `main` / `/ (root)`.
6. Wait one or two minutes, then open https://glorybagai.github.io.

**If the repository already exists with an old site**, keep a copy of the old
version on a branch before replacing it:

```bash
git clone https://github.com/glorybagai/glorybagai.github.io.git
cd glorybagai.github.io

git checkout -b old-site
git push -u origin old-site        # old version is now safely on its own branch
git checkout main

find . -mindepth 1 -not -path './.git*' -delete
cp -r /path/to/this/folder/. .

git add -A
git commit -m "Rebuild site: about, research, news, volunteering"
git push origin main
```

## 2. Preview locally before pushing

```bash
cd /path/to/this/folder
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Editing later

- **News** — copy a `<div class="news-item">` block in `news.html`. Newest goes
  at the top; the date is the first line of the block.
- **Research** — copy a `<div class="record">` block in `research.html`. The
  `[C1]`, `[W1]` label lives in `<span class="tag">`.
- **Volunteering** — each activity is a `<section class="activity">`. To add a
  photo, drop the file into the matching folder under `assets/img/` and add one
  more line inside that section's `<div class="track">`:
  `<img data-src="assets/img/matlab/06.jpg" alt="..." loading="lazy">`.
  The first image in each gallery uses `src` rather than `data-src` so it loads
  straight away — leave that one as it is.
- **Links and social icons** — the header block at the top of each page.
- **Footer** — the copyright line sits at the bottom of all four pages.
- **Colour** — change `--accent` at the top of `assets/css/style.css` to restyle
  the whole site at once.
