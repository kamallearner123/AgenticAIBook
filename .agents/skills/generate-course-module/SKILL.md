---
name: generate-course-module
description: Generates an interactive HTML tutorial page for the course following strict design guidelines, including the app container and side menu.
---

You are an expert technical course creator and frontend developer. I need you to generate a new interactive HTML tutorial page for my course based on a topic I provide. 

Please follow these STRICT design, style, and HTML structure guidelines to ensure the new material perfectly matches my existing course format. 

### 1. Document Structure & Dependencies
- Use standard HTML5 boilerplate.
- Link to a stylesheet named `styles.css`.
- In the `<head>`, include Google Fonts: `Inter`, `Fira Code`, and `Outfit`.
- Include PrismJS CSS (Tomorrow Night theme) and JS (including components for Python and JSON) for syntax highlighting.
- Include this exact theme toggle script in the `<head>`:
  `<script>const savedTheme = localStorage.getItem('rust-book-theme'); if (savedTheme) { document.documentElement.setAttribute('data-theme', savedTheme); } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { document.documentElement.setAttribute('data-theme', 'dark'); }</script>`

### 2. App Container & Sidebar (Table of Contents)
- Wrap the entire `<body>` content in `<div class="app-container">`.
- Inside the app-container, create the exact sidebar navigation `<nav class="sidebar" id="sidebar">` as found in the `index.html` structure.
- Ensure all 24 days are listed in the `.toc` list exactly as a flat list (without "Week" divisions).
- Give the `<li>` corresponding to the generated page the `class="active"`.

### 3. Main Layout
- Next to the `<nav>`, create the main content area: `<main class="main-content">`.
- Start with the exact header containing the hamburger menu on the left and the completeness badge / action icons on the right, as defined in `index.html`.

### 4. Article Formatting (`<article class="book-page">`)
- Start the page content with a chapter number and title: 
  `<span class="chapter-number">Session X.Y</span>` followed by `<h1>Page Title</h1>`.
- Use `<h2>` and `<h3>` for subheadings.
- Use standard `<p>` tags for paragraphs. Use `<strong>` for emphasis and `<code>` for inline code.
- If highlighting specific syntax keywords in text, use `<code class="keyword-hl">keyword</code>`.
- Separate major sections using `<hr style="margin: 3rem 0; border: 0; border-top: 1px solid var(--border-color);">`.

### 5. Code Blocks and Captions
- Use PrismJS formatting: `<pre><code class="language-python">...</code></pre>`.
- **CRITICAL:** Every single code block MUST be immediately followed by a caption using this exact format:
  `<div class="element-caption" style="text-align: center; font-style: italic; color: var(--text-muted); margin-top: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem;">Program X.Y-Z: Descriptive Caption</div>`

### 6. Interactive Elements
- For comparing bad/legacy code against safe/modern code, use a styled `<details>` dropdown:
  `<details style="background: var(--sidebar-bg); padding: 1rem; border-radius: 8px; border-left: 4px solid #f44336; cursor: pointer; margin-bottom: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">`
  `<summary style="font-weight: 600; font-size: 1.1rem; outline: none; color: #f44336;">View Buggy/Legacy Code</summary>`
  Inside, place the code block and its caption.
- For inline knowledge checks or important notes, use: 
  `<div class="info-callout" style="background-color: var(--sidebar-bg); border-left-color: var(--text-muted);">...</div>`.

### 7. Topic Quiz (MCQ Section)
- At the end of the `<article>`, add a quiz section with a divider and heading: `<h2>Topic Quiz (10 Questions)</h2>`.
- Generate exactly 10 multiple-choice questions. Each question must be wrapped in a `<div class="mcq-container">`.
- Inside the container, include:
  - `<div class="mcq-question">1. Question text here?</div>`
  - `<ul class="mcq-options">` containing four `<li class="mcq-option" data-correct="true/false">Option text</li>`. Only one should be true.
  - `<button class="mcq-submit" disabled>Submit</button>`
  - `<div class="mcq-feedback">Correct answer! Great job!</div>`

### 8. Hands-On Assignments
- Immediately after the Topic Quiz, add a section for Hands-On Assignments separated by a `<hr>`.
- Generate exactly 5 assignments wrapped in styled containers:
  `<div style="background-color: var(--sidebar-bg); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid var(--accent);">`
  `<h3 style="margin-top: 0; color: var(--accent);">Assignment 1: Title</h3>`
  `<p style="margin-bottom: 0;"><strong>Task:</strong> Description here.</p>`
  `</div>`

### 9. Footer & Navigation
- Below the quiz, include a `<footer class="page-navigation">` with links for `.nav-button.prev` and `.nav-button.next` pointing to the previous and next days. Include `<span class="nav-label">` and `<span class="nav-title">` inside the buttons.
- Finally, include the course attribution at the bottom:
  `<div style="text-align: center; padding: 2rem 0; margin-top: 2rem; border-top: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.9rem;">Prepared by <a href="https://www.aptcomputinglabs.com/" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: bold;">Apt Computing Labs</a><br><span style="font-size: 0.8rem; opacity: 0.7;">&copy; 2026 Apt Computing Labs. This material may be distributed freely provided that credit is given to Apt Computing Labs.</span></div>`

### 10. Content Incorporation Guidelines
If the provided topic includes specific "Figures", "Programs", "Tables", or "Real Time Examples", you MUST incorporate them as follows:
- **Figures**: Create an image placeholder `<div>` with the specified description, followed IMMEDIATELY by a Figure caption, and a styled box explaining every parameter/label inside the figure:
  `<div style="padding: 2rem; background: var(--border-color); text-align: center; border-radius: 8px; margin: 1.5rem 0 0.5rem 0; color: var(--text-muted);"><em>[IMAGE PLACEHOLDER: Diagram showing X]</em></div>`
  `<div class="element-caption" style="text-align: center; font-style: italic; color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.9rem;">Figure X.Y-Z: Descriptive Title</div>`
  `<div style="font-size: 0.9rem; background: var(--bg-color); padding: 1rem; border-radius: 8px; margin-bottom: 2rem;"><strong>Figure Parameters Explained:</strong><ul style="margin-top: 0.5rem;"><li><strong>Label 1:</strong> Definition...</li></ul></div>`
- **Programs**: Ensure every program listed in the prompt is fully implemented as an interactive `<pre><code class="language-python">` block with a caption.
- **Tables**: If the prompt asks for a summary or reference table, create a styled HTML table with a dark accent header `var(--accent)`. If it asks for 3 real-world examples, ensure the final column contains a bulleted `<ul>` with exactly 3 concrete items per row.
- **Real Time Examples**: Incorporate the real-world example using a styled callout box: `<div class="info-callout" style="background-color: var(--sidebar-bg); border-left-color: #2196F3; padding: 1rem; border-left-width: 4px; border-left-style: solid; margin: 1.5rem 0; border-radius: 4px;"><strong>Real World Example:</strong> [Insert example here]</div>`.

Please write the HTML code for the following topic/content: 
[INSERT YOUR TOPIC, NOTES, OR DESIRED SESSION CONTENT HERE]
