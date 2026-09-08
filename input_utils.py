"""Helper utilities for interactive input in browser-based Python environments.

Pyodide / JupyterLite / browser runtimes often do not expose true stdin,
so the regular `input()` call can fail with `OSError: [Errno 29] I/O error`.
Use `safe_input()` instead of `input()` in those environments.
"""

import sys

try:
    from js import prompt as js_prompt
except Exception:
    js_prompt = None


def safe_input(prompt: str = "") -> str:
    """Prompt for user input in both regular Python and browser runtimes.

    In browser/pyodide environments, this falls back to the JavaScript prompt.
    In terminal environments, it uses the normal `input()` call.
    """
    if js_prompt is not None:
        value = js_prompt(prompt)
        if value is None:
            raise KeyboardInterrupt("User cancelled input.")
        return value

    try:
        return input(prompt)
    except (EOFError, OSError):
        try:
            if hasattr(sys.stdin, "readline"):
                line = sys.stdin.readline()
                if line:
                    return line.rstrip("\n")
        except Exception:
            pass
        raise
