# CSV Cell Viewer

A tiny, single-file tool for **reading and annotating text-heavy CSVs** — the kind
with long, multi-line cells and Korean/CJK text that make spreadsheet apps crawl.

It shows **one cell at a time** in a large pane, so it stays instant no matter how
big or dense the file is. Everything runs locally in your browser; nothing is uploaded.

## Why

Spreadsheet grids lay out thousands of cells at once. With long multi-line or
Korean text, that layout work is what makes them unresponsive. This viewer renders
exactly **one** cell, so rendering cost stays constant regardless of file size.

## Use

It's a single `index.html` with **no build step and no dependencies**.

- **Double-click `index.html`** to open it in your browser, then **Open a CSV**
  (or drag a file onto the window).

## Features

- **One-cell viewer** — read a single cell's full content in a big pane.
- **Encoding** — Auto / UTF-8 / **EUC-KR (CP949)** for Korean files exported from Excel.
- **Delimiter** — auto-detect, or pick comma / tab / semicolon / pipe.
- **Faithful parsing** — RFC 4180 quoting, escaped `""`, multi-line cells, CRLF.
  The source cell is shown **exactly** as stored.
- **Trim view** — optional whitespace trim for readability (display-only; never alters data).
- **Font size** control for dense text.
- **Annotation / labeling** — choose (or add) an annotation column, then:
  - stamp **preset labels** with number keys `1`–`9` (presets are editable), or
  - type a **free-text comment**.
  Both are written to the annotation column. **Source columns stay immutable.**
- **Auto-advance** to the next row after labeling (toggle).
- **Save** — Download a copy, or save **in place** (Chrome/Edge, via the File System
  Access API). Optional UTF-8 BOM so Excel detects the encoding.
- **Preferences** (presets, font, toggles) persist locally between sessions.

## Keyboard

| Keys | Action |
|------|--------|
| `←` `↑` `↓` `→` | Move between cells |
| `Home` / `End` | First / last column (`Ctrl` for first/last row) |
| `PageUp` / `PageDown` | Jump 10 rows |
| `1`–`9` | Insert the matching preset label into the annotation column |
| `Enter` | Edit a free-text comment for the current row |
| `Ctrl+Enter` | Commit the comment and advance to the next row |
| `Esc` | Commit the comment and return to navigation |
| `Ctrl+S` | Save |
| `Ctrl+C` | Copy the source cell |

## Notes

- **In-place save** uses the File System Access API (Chromium browsers); elsewhere
  it falls back to a download.
- **Your data stays local** — the file is read in the browser and never uploaded.
- Source columns are never modified; only the annotation column you select is written to.

## License

MIT — see [LICENSE](LICENSE).
