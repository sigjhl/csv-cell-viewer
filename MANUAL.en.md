# CSV Cell Viewer — Manual

*Languages: **English** · [한국어](MANUAL.ko.md)*

CSV Cell Viewer is a single self-contained `index.html`: no installation, no build step, no
dependencies, no network access. Open it in a browser and it runs offline. This manual covers
every feature in depth; for a quick overview see the [README](readme.md).

---

## 1. Why this exists

Spreadsheet apps render a grid of thousands of cells at once. When cells hold long, multi-line,
or Korean/CJK text, that layout work is what makes scrolling and selection sluggish. CSV Cell
Viewer renders exactly **one** cell at a time into a large pane, so display cost is constant no
matter how large or dense the file is. On top of that it adds a fast, keyboard-driven workflow
for **annotating or labeling** rows (comments, categories, review marks) without ever altering
your source data.

## 2. Getting started

1. Open `index.html` (double-click, or serve the folder and visit it).
2. Click **Open CSV…**, or drag a `.csv` file onto the window.
3. The first data cell appears in the large **source pane**. Move around with the arrow keys.

**Browser notes**

- Works in any modern browser (Chrome, Edge, Firefox, Safari).
- **In-place save** — writing back to the original file — requires a Chromium browser
  (Chrome / Edge) *and* that you opened the file through the in-app **Open CSV…** picker.
  Everywhere else, Save produces a download instead (see §9).
- Everything is local: the file is read in the browser and never uploaded.

## 3. The interface

- **Toolbar (top).** File open + name, encoding, delimiter, view toggles (Header, Trim view,
  Sentence breaks), font size, Copy / Download / Save + BOM, and the theme toggle.
- **Address bar.** The current source cell: a spreadsheet-style reference (e.g. `B5`), a **mode
  badge** (`NAV` or `EDIT`), and context (column name, data-row position, column position).
- **Source pane (read-only).** The full content of the current cell, shown exactly as stored
  (subject only to the display-only toggles in §6). This pane is never editable.
- **Splitter.** Drag the grip between the source and annotation panes to resize them.
- **Annotation pane (editable).** A **quick-label bar** (`1`–`9`) and an **editable text box**
  bound to the *annotation column* for the current row.
- **Navigation row.** On-screen ◀ ▲ ▼ ▶ buttons and a record / column counter.
- **Side panel (right).** Choose the annotation column, edit the quick-label presets, and toggle
  auto-advance. Fold it with `⟩`; reopen with the `⟨` tab on the right edge. Drag its left edge
  to resize.
- **Status bar (bottom).** The latest action message and a shortcut hint.

## 4. Opening files

**Encoding.** `Auto` (default) checks for a byte-order mark, then tries strict UTF-8 and falls
back to **EUC-KR / CP949** — the encoding most Korean CSVs use when exported from Excel on
Windows. You can also force `UTF-8` or `EUC-KR / CP949`. If text looks garbled (mojibake),
switch this manually.

**Delimiter.** `Auto` (default) sniffs the first line for comma, tab, semicolon, or pipe. You
can also force one.

**Header row.** When on (default), the first row is treated as column names — used in the
address bar and the annotation-column picker. Turn it off if your file has no header. Toggling
this never re-reads or changes data.

> Changing **Encoding** or **Delimiter** re-reads the file. If you have unsaved edits you'll be
> asked to confirm first.

## 5. Reading cells faithfully

The parser follows RFC 4180:

- Quoted fields may contain the delimiter, line breaks, and escaped quotes (`""` → a literal `"`).
- Multi-line cells are preserved; line endings inside a cell are normalized to `\n` for display.
- A trailing newline at end of file does **not** create a phantom empty row.
- Whitespace is **not** stripped by the parser — what you see is what's stored. (The optional
  *Trim view* changes only the display; see §6.)
- Ragged rows are handled: missing cells read as empty, and the grid width is the widest row.

## 6. Display options (display-only — they never change data)

**Trim view** *(on by default).* Removes blank or whitespace-only lines *inside* a cell and trims
the surrounding whitespace, so cells padded with empty lines collapse to their real content.
Content lines and their indentation are preserved. Toggle off to see the cell byte-for-byte.

**Sentence breaks** *(off by default).* Inserts a line break after sentence-ending punctuation
(`.`, `?`, `!`, `…`) to make dense paragraphs scannable. It only breaks when the punctuation is
followed by whitespace and a likely sentence start (capital letter, digit, opening quote, or a
CJK character), and it deliberately **skips**:

- decimals — `3.14` (no following space, so never affected);
- common abbreviations — `Dr.`, `e.g.`, `etc.`, …;
- dotted acronyms — `U.S.`, `Ph.D`;
- single-letter initials — `A.`;
- bare numbers / ordinals / years — `1.`, `1990.`.

It is intentionally conservative: it would rather miss a break than split mid-sentence (so
`example.com. Next` is left alone).

**Font size.** `−` / `+`, between 8 and 48 px; applies to both panes.

All three affect only what's shown; stored data, copies, and exports are unaffected.

## 7. Navigating

Navigation works whenever you're not typing in a text field (badge shows `NAV`).

| Keys | Action |
|---|---|
| `←` `↑` `↓` `→` | Move one cell |
| `Home` / `End` | First / last column of the row |
| `Ctrl/⌘ + Home` / `End` | First / last row |
| `PageUp` / `PageDown` | Jump 10 rows |

The on-screen ◀ ▲ ▼ ▶ buttons do the same. With **Header row** on you can still move onto the
header to read column names, but it can't be annotated.

## 8. Annotating & labeling

The core workflow: read a source cell, then record a label or comment for that row — **without
touching the source.**

**1) Choose an annotation column.** In the side panel, pick a column under **Annotation column**,
or choose **➕ Add new column…** to append a fresh one (recommended — it keeps your source data
completely untouched). Quick labels and comments are written to this column for the current row,
regardless of which column you're reading.

**2) Quick labels.** Edit the preset list under **Quick-insert labels** (up to nine). In `NAV`
mode, press `1`–`9` — or click a button in the quick-label bar — to write that label into the
annotation column of the current row. With **Advance to next row** on (default), the cursor jumps
to the next row so you can label rapidly.

**3) Free-text comments.** Press `Enter` (or `F2`, or click the annotation box) to type a comment
for the current row; the badge shows `EDIT`. Because cells can be multi-line, **`Enter` inserts a
newline.** Commit with:

- `Shift + Enter` (or `Ctrl/⌘ + Enter`) — commit and advance to the next row;
- `Esc` — commit and stay (return to navigation on the same row);
- `Tab` / `Shift + Tab` — commit and move to the next / previous cell.

Comments are saved as you type.

**Confirmation flashes.** A brief chip appears at the bottom center for each action — quick labels
(key + value + column · row), committed comments (✎ + text), and arrow-key navigation (the arrow +
the cell you moved to) — then fades. Because auto-advance moves on immediately, this lets you
confirm a label registered without slowing down. Turn it off with **Show key flashes** in the
side panel.

**Immutability.** Only the chosen annotation column is ever written. Every other column —
including the long multi-line cell you're reading — is guaranteed unchanged. (If you pick an
*existing* column as the target, you are of course writing into it; choose **Add new column** to
keep everything original.)

## 9. Saving & exporting

A dot (`●`) next to the filename means unsaved changes; you'll be warned before closing with edits.

**Save** (`Ctrl/⌘ + S` or the button):

- In Chromium browsers, if you opened the file with **Open CSV…**, this writes back to the **same
  file** (you may be asked for permission once).
- Otherwise it falls back to a **download**.

**Download** always saves a copy via the browser's download flow.

**Output format.** Files are written as **UTF-8** with `CRLF` line endings and RFC 4180 quoting
(fields containing the delimiter, quotes, or line breaks are quoted; `"` becomes `""`). The
delimiter matches the one used to read the file.

- **BOM** *(on by default)* prepends a UTF-8 byte-order mark so Excel on Windows detects UTF-8
  correctly. Turn it off if another tool dislikes the BOM.
- Saving always produces UTF-8, so a file read as EUC-KR / CP949 is **upgraded to UTF-8** on save.

**Copy cell** (`Ctrl/⌘ + C` or the button) copies the current source cell's raw text.

## 10. Layout & appearance

- **Theme.** The `☾` / `☀` button toggles light / dark. By default it follows your operating
  system; once you choose explicitly, that choice is remembered.
- **Resize panes.** Drag the horizontal grip between the source and annotation panes.
- **Resize panel.** Drag the panel's left edge.
- **Fold panel.** Use `⟩` (panel header) to hide it once configured; the `⟨` tab on the right
  edge brings it back. Labeling still works while folded — the quick-label bar lives in the main
  area.

## 11. Preferences & privacy

These settings persist in your browser's `localStorage` (per browser / profile): font size,
Header / Trim / Sentence toggles, encoding, delimiter, BOM, auto-advance, key flashes, your label
presets, theme, panel width, fold state, and the pane split ratio. They are **not** tied to any file.

**Privacy.** The app makes no network requests. Your CSV is read locally and never leaves your
machine.

## 12. Keyboard reference

| Context | Keys | Action |
|---|---|---|
| Navigate | `←↑↓→` | Move one cell |
| Navigate | `Tab` / `Shift + Tab` | Move to next / previous cell |
| Navigate | `Home` / `End` | First / last column |
| Navigate | `Ctrl/⌘ + Home` / `End` | First / last row |
| Navigate | `PageUp` / `PageDown` | Jump 10 rows |
| Navigate | `1`–`9` | Insert preset label into the annotation column |
| Navigate | `Enter` / `F2` | Edit a comment for the current row |
| Edit | `Shift + Enter` (or `Ctrl/⌘ + Enter`) | Commit comment, advance to next row |
| Edit | `Esc` | Commit comment, stop editing (stay) |
| Edit | `Tab` / `Shift + Tab` | Commit, move to next / previous cell |
| Global | `Ctrl/⌘ + S` | Save |
| Global | `Ctrl/⌘ + C` | Copy source cell |

## 13. Tips & limitations

- **Large files** load fully into memory and are parsed up front, but only one cell renders, so
  navigation stays fast. There is no streaming / virtualization, so very large files are bounded
  by available RAM.
- **Sentence breaks** are conservative by design; years (`1990.`), domains (`example.com.`), and
  acronyms won't break. You can extend the abbreviation list in `index.html` if needed.
- **In-place save** needs Chromium + a file opened via the in-app picker; drag-and-drop or other
  browsers fall back to download.
- **Encoding on save** is always UTF-8 (see §9).
- **Editing an existing column** as the annotation target overwrites those values; use **Add new
  column** to keep the source pristine.

## 14. FAQ

**Korean text shows as mojibake.** Set **Encoding** to `EUC-KR / CP949`, or re-export as UTF-8.

**Arrow keys move the text cursor instead of changing cells.** You're in `EDIT` mode (typing a
comment). Press `Esc` to return to navigation.

**`Enter` doesn't save my comment.** In multi-line cells, `Enter` adds a newline. Commit with
`Ctrl/⌘ + Enter` or `Esc`.

**My presets / theme didn't carry to another computer.** Preferences are stored per browser; they
don't sync.

**Save downloaded a copy instead of overwriting.** Your browser doesn't support in-place save, or
the file wasn't opened via **Open CSV…**. Use Chrome / Edge and the in-app picker.
