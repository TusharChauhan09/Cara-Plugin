# CodePulse – Typing Analytics

Track your typing speed and coding time in VS Code or Cursor. Real-time WPM in the status bar, a built-in typing test, and language-based time ranking.

---

## How to use

### 1. Run the extension (development)

1. **Open the whole `cara` folder** in Cursor (File → Open Folder → select the `cara` folder that contains `apps` and `packages`). Do not open only `apps/extension` or another folder.
2. Press **F5** (or Run → Start Debugging). If asked, choose **"Launch CodePulse Extension"**.
3. A **new window** opens with the title **"[Extension Development Host] ..."**. In that new window you should see a **popup message**: *"CodePulse is active in this window..."*. That means CodePulse is running there.
4. **Use that new window for everything:** WPM and CodePulse commands appear **only there**. In that window: press **Ctrl+Shift+P**, type **CodePulse**, and you should see commands like "CodePulse: Show Status Bar". The status bar (bottom left) should show **"CodePulse: ⌨️ 0 WPM"**.

### 2. Real-time typing speed (status bar)

- Just **type in any editor**. After a few seconds, the **status bar** (bottom of the window) shows something like **⌨️ 42 WPM** on the **left side** of the bar.
- Speed is based on the **last 1 minute** of typing in the active file.
- **If you don’t see it:** (1) Make sure you pressed **F5 from the folder that contains the extension** (the `cara` repo / `apps/extension`), so the new “[Extension Development Host]” window has CodePulse loaded. (2) Look on the **left** part of the status bar (after “Ln X, Col Y”). (3) In that window, press **Ctrl+Shift+P** → **CodePulse: Show Status Bar** to force the WPM to show; look for **"CodePulse: ⌨️ 0 WPM"** on the left of the status bar. If you don’t see any **CodePulse** commands when you type `CodePulse`, the extension isn’t loaded in that window—close it, and press **F5** again from the **cara** project window.
- To hide the WPM: **File → Preferences → Settings** (or `Ctrl+,`), search for **CodePulse**, and turn off **Show typing speed in the status bar**.

### 3. Typing test

1. **Open Command Palette**: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).
2. Run **CodePulse: Start Typing Test**.
3. A new tab opens with a **comment block** and a short code snippet to type. **Type the same text below the comments** (don’t type inside the comments).
4. The **timer starts on your first keystroke** in the typing area.
5. The **status bar** shows: **⏱ time | ⌨️ WPM | ✓ accuracy% | errors | backspaces**.
6. To **start over** with the same prompt: run **CodePulse: Reset Typing Test** from the Command Palette.

### 4. Language ranking (time per language)

- CodePulse **tracks how long you spend in each language** (e.g. TypeScript, Python) based on the active editor’s language.
2. Open Command Palette and run **CodePulse: Show Statistics**.
3. A message shows your **languages ranked by total coding time** (minutes and percentage).

### 5. Sync to cloud (later)

- **CodePulse: Sync to Cloud** is reserved for when the web dashboard is set up. For now it only shows an informational message.

---

## Commands (Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`)

| Command | What it does |
|--------|----------------|
| **CodePulse: Start Typing Test** | Opens a new file with a typing prompt; type below the comments. |
| **CodePulse: Reset Typing Test** | Resets the typing test timer and typed text (same prompt). |
| **CodePulse: Show Statistics** | Shows language ranking by time spent. |
| **CodePulse: Sync to Cloud** | Placeholder for future dashboard sync. |

---

## Settings

| Setting | Default | Description |
|--------|---------|-------------|
| **CodePulse: Show Speed In Status Bar** | `true` | Show or hide the WPM in the status bar. |
| **CodePulse: Auto Sync** | `true` | Reserved for future auto-sync. |
| **CodePulse: Sync Interval Minutes** | `30` | Reserved for future sync interval. |

---

## Build from source

```bash
# From repo root
cd apps/extension
bun install
bun run compile
```

Then press **F5** in VS Code/Cursor with the extension folder open to run it in the Extension Development Host.

---

For the full project plan and web dashboard design, see the repo’s **workflows/PROJECT_GUIDE.md**.
