# How to run CodePulse (extension must show)

## Step 1: Open the right folder

- **Option A:** Open the **`cara`** folder (the one that contains `apps` and `packages`).
- **Option B:** Open only the **`apps/extension`** folder.

## Step 2: Compile

```bash
cd apps/extension
bun run compile
```

## Step 3: Launch the extension

1. Press **F5** (or Run → Start Debugging).
2. If you have **cara** open: choose **"Launch CodePulse (cara folder)"**.
3. If you have **apps/extension** open: choose **"Launch CodePulse (extension folder)"**.

## Step 4: Use the NEW window

A **second window** opens. Its title starts with **"[Extension Development Host]"**.

- You **must** use this second window. CodePulse does **not** run in the window where you pressed F5.
- In this new window you should see:
  1. A popup: **"CodePulse is active. WPM is in the status bar (bottom)."**
  2. On the **status bar** (bottom of the window): **"CodePulse: 0 WPM"** (left or right side).
- Press **Ctrl+Shift+P** in this same window and type **CodePulse** — you should see CodePulse commands.

## If nothing appears

- Confirm you are looking at the **Extension Development Host** window (title has "[Extension Development Host]").
- If you see an error popup **"CodePulse failed to activate: ..."**, the message tells you what went wrong.
- Close the Extension Development Host window and press **F5** again from the first window.
