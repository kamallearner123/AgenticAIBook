---
name: generate-course-index
description: Generates the master index.html file that establishes the overall structure, sidebar navigation (Table of Contents), and the main landing page layout.
---

You are an expert technical course creator and frontend developer. I am building a new interactive technical course. 

Please generate the master `index.html` file that establishes the overall structure, sidebar navigation (Table of Contents), and the main landing page layout. Follow these strict design and structural guidelines to match my existing course format.

### 1. Document Structure & Dependencies
- Use standard HTML5 boilerplate.
- In the `<head>`, include Google Fonts: `Inter`, `Fira Code`, and `Outfit`.
- Include PrismJS CSS (Tomorrow Night theme).
- Include this exact theme toggle script in the `<head>`:
  `<script>const savedTheme = localStorage.getItem('rust-book-theme'); if (savedTheme) { document.documentElement.setAttribute('data-theme', savedTheme); } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { document.documentElement.setAttribute('data-theme', 'dark'); }</script>`
- Link to a stylesheet named `styles.css`.

### 2. App Container & Sidebar (Table of Contents)
- Wrap the entire `<body>` content in `<div class="app-container">`.
- Inside the app-container, create the sidebar navigation:
  `<nav class="sidebar" id="sidebar">`
- Inside the sidebar, include a header:
  `<div class="sidebar-header"><h2>[Course Title]</h2></div>`
- Inside the sidebar, create the TOC container: `<div class="sidebar-content">`
- The TOC must use `<ul class="toc">`.
- Format the TOC links as follows:
  - Main categories or Sessions should have the class `toc-main`: `<li class="toc-main"><a href="session_X.html">Session X: Title</a></li>`
  - Sub-pages should be standard list items: `<li><a href="session_X_Y.html">X.Y Topic</a></li>`
- Generate a comprehensive and logical Table of Contents based on the course topic I provide.

### 3. Main Layout Area (`<main class="main-content">`)
- Next to the `<nav>`, create the main content area: `<main class="main-content">`.
- Start with the header containing the theme toggle button:
  `<header class="top-nav" id="top-nav"><div class="nav-actions" style="margin-left: auto;"><button id="theme-toggle" class="theme-btn" aria-label="Toggle Theme"><svg id="theme-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button></div></header>`

### 4. Index Page Content (`<article class="book-page">`)
- Wrap the landing page content in `<article class="book-page">`.
- Use an `<h1>` for the main Course Title.
- Write a 1-2 paragraph welcoming introduction to the course.
- Add an emphasized callout box for a key resource (like a video):
  `<div style="margin-bottom: 2rem; padding: 1rem; background: var(--bg-surface); border-left: 4px solid var(--accent); border-radius: 4px;"><strong>Key Resource:</strong> <a href="#" style="color: var(--accent); text-decoration: none; font-weight: bold;">[Link Text]</a></div>`
- Add an `<h2>Table of Contents</h2>` for the main page.
- Re-list the main modules (the `.toc-main` items) using a styled un-ordered list (`<ul style="list-style: none; padding-left: 0;">`). For each item, include the title as a link (`color: var(--accent); font-weight: 600; font-size: 1.25rem;`) and a short 1-sentence description below it (`color: var(--text-muted);`).

### 5. Footer & Navigation
- Below the `<article>`, include `<footer class="page-navigation">` with a disabled 'Previous' button and an active 'Next' button pointing to the first real lesson.
- Finally, include the course attribution at the bottom:
  `<div style="text-align: center; padding: 2rem 0; margin-top: 2rem; border-top: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.9rem;">Prepared by <a href="https://www.aptcomputinglabs.com/" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: bold;">Apt Computing Labs</a><br><span style="font-size: 0.8rem; opacity: 0.7;">&copy; 2026 Apt Computing Labs. This material may be distributed freely provided that credit is given to Apt Computing Labs.</span></div>`
- Make sure to close the `<main>`, `<div>`, `<body>`, and `<html>` tags properly.

Please generate the complete `index.html` structure for the following course topic/curriculum:
[INSERT NEW COURSE TOPIC AND HIGH-LEVEL CURRICULUM OUTLINE HERE]
