# CSV Cell Viewer

A single-file tool for **reading and annotating text-heavy CSVs** — the long, multi-line,
Korean/CJK cells that make spreadsheets crawl. It shows **one cell at a time**, so it stays
instant on files of any size, and runs entirely in your browser — nothing is uploaded.

> 📖 **Detailed manual:** [English](MANUAL.en.md) · [한국어](MANUAL.ko.md)

## Quick start

1. **Double-click `index.html`** — no install, no build, works offline.
2. Click **Open CSV…** (or drag a file onto the window).
3. **Arrow keys** move between cells. Press **`1`–`9`** to stamp a label, or **`Enter`** to
   type a comment — both go into an *annotation column*, while the source cell stays untouched.

## Features

- **One-cell viewer** — read a single cell's full content; huge / multi-line / CJK files stay instant.
- **Korean-friendly** — Auto / UTF-8 / **EUC-KR (CP949)** decoding for files exported from Excel.
- **Faithful parsing** — RFC 4180 quotes, escaped `""`, multi-line cells, CRLF; the source is shown exactly.
- **Readability** — *Trim view* (drop blank lines), *Sentence breaks*, and font size — all display-only.
- **Annotation / labeling** — pick or add an annotation column; quick labels (`1`–`9`) or free-text
  comments; auto-advance with a brief on-screen flash confirming each entry. **Source columns stay immutable.**
- **Save** — download a copy, or save **in place** (Chrome / Edge); optional UTF-8 BOM for Excel.
- **Comfortable UI** — light / dark theme, resizable panes, foldable side panel; preferences persist locally.

## Keyboard

| Keys | Action |
|---|---|
| `←↑↓→` | Move between cells |
| `1`–`9` | Insert a preset label into the annotation column |
| `Enter` | Edit a free-text comment for the current row |
| `Ctrl/⌘+Enter` / `Esc` | Commit & advance / commit & stop editing |
| `Ctrl/⌘+S` · `Ctrl/⌘+C` | Save · copy source cell |

Full reference in the [manual](MANUAL.en.md).

## License

MIT — see [LICENSE](LICENSE).

<br>

---

<br>

# CSV Cell Viewer (한국어)

대용량·여러 줄·한글/CJK 텍스트가 많은 CSV는 엑셀에서 버벅이기 쉽습니다. **CSV Cell Viewer**는
**한 번에 셀 하나**만 보여 주어 파일 크기와 무관하게 즉각 반응하며, 모든 처리가 브라우저 안에서
이루어집니다 — 어떤 데이터도 외부로 전송되지 않습니다.

> 📖 **상세 매뉴얼:** [English](MANUAL.en.md) · [한국어](MANUAL.ko.md)

## 빠른 시작

1. **`index.html` 더블클릭** — 설치·빌드 없이 오프라인에서 동작합니다.
2. **Open CSV…** 클릭(또는 창에 파일을 끌어다 놓기).
3. **방향키**로 셀 사이를 이동합니다. **`1`–`9`**로 라벨을 찍거나 **`Enter`**로 코멘트를 입력하면
   *주석 열(annotation column)*에 기록되며, 원본 셀은 그대로 유지됩니다.

## 주요 기능

- **한 셀 뷰어** — 셀 하나의 전체 내용을 표시; 대용량·여러 줄·CJK 파일도 즉각 반응.
- **한글 친화** — Auto / UTF-8 / **EUC-KR(CP949)** 디코딩(엑셀에서 내보낸 한글 CSV 대응).
- **원문 보존 파싱** — RFC 4180 따옴표, `""` 이스케이프, 여러 줄 셀, CRLF 처리; 원본을 그대로 표시.
- **가독성 옵션** — *공백 정리(Trim view)*, *문장 줄바꿈(Sentence breaks)*, 글자 크기 — 모두 표시
  전용(데이터 불변).
- **주석/라벨링** — 주석 열을 선택하거나 추가; 빠른 라벨(`1`–`9`) 또는 자유 텍스트 코멘트; 자동
  다음 행 이동 시 입력 내용을 짧게 확인 표시. **원본 열은 변경되지 않습니다.**
- **저장** — 사본 다운로드 또는 **원본 파일에 바로 저장**(Chrome / Edge); 엑셀용 UTF-8 BOM 옵션.
- **편안한 UI** — 라이트/다크 테마, 크기 조절 창, 접을 수 있는 사이드 패널; 설정은 로컬에 저장.

## 키보드

| 키 | 동작 |
|---|---|
| `←↑↓→` | 셀 이동 |
| `1`–`9` | 주석 열에 프리셋 라벨 입력 |
| `Enter` | 현재 행에 자유 텍스트 코멘트 작성 |
| `Ctrl/⌘+Enter` / `Esc` | 확정 후 다음 행 / 확정 후 편집 종료 |
| `Ctrl/⌘+S` · `Ctrl/⌘+C` | 저장 · 원본 셀 복사 |

전체 목록은 [매뉴얼](MANUAL.ko.md)을 참고하세요.

## 라이선스

MIT — [LICENSE](LICENSE) 참고.
