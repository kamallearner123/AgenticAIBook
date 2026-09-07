document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Python Playground using Ace Editor & Pyodide
    function setupPythonPlayground() {
        // Add custom styles for the editor and terminal
        if (!document.getElementById('python-playground-style')) {
            const style = document.createElement('style');
            style.id = 'python-playground-style';
            style.textContent = `
                .code-wrapper { position: relative; margin: 2rem 0; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid var(--border-color); }
                .ace_editor { font-family: 'Fira Code', monospace !important; font-size: 0.95em !important; line-height: 1.5 !important; }
                .play-btn {
                    position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;
                    background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #4caf50; padding: 0.4rem 1rem; border-radius: 4px;
                    font-size: 0.85rem; font-weight: bold; cursor: pointer; transition: all 0.2s;
                }
                .play-btn:hover { background: rgba(76, 175, 80, 0.2); color: #fff; border-color: #4caf50; }
                .terminal-window { margin: 0; padding: 1.5rem; border: none; border-radius: 0; border-top: 1px solid #333; background: #1e1e1e; color: #d4d4d4; font-family: 'Fira Code', monospace; white-space: pre-wrap; font-size: 0.9rem; max-height: 300px; overflow-y: auto; }
            `;
            document.head.appendChild(style);
        }

        // Function to load and configure Pyodide
        let pyodideReadyPromise = null;
        async function getPyodide() {
            if (!pyodideReadyPromise) {
                pyodideReadyPromise = (async () => {
                    const pyodide = await loadPyodide();
                    await pyodide.loadPackage("micropip");
                    const micropip = pyodide.pyimport("micropip");
                    // Pre-install scikit-learn for our Day 1 examples
                    await micropip.install("scikit-learn");
                    return pyodide;
                })();
            }
            return pyodideReadyPromise;
        }

        // Inject Pyodide script into document head
        if (!window.loadPyodide) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
            document.head.appendChild(script);
        }

        // Build the editor UI
        function buildEditorWrapper(codeText) {
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper';
            
            // Calculate height based on lines of code
            const lines = codeText.split('\n').length;
            const editorHeight = Math.max(120, lines * 21 + 30);
            
            const editorDiv = document.createElement('div');
            editorDiv.style.width = '100%';
            editorDiv.style.height = editorHeight + 'px';
            editorDiv.textContent = codeText;
            
            wrapper.appendChild(editorDiv);
            
            // Initialize Ace Editor
            const editor = ace.edit(editorDiv);
            editor.setTheme("ace/theme/tomorrow_night");
            editor.session.setMode("ace/mode/python");
            editor.setOptions({
                fontFamily: "'Fira Code', monospace",
                fontSize: "14px",
                showPrintMargin: false,
                displayIndentGuides: true,
                highlightActiveLine: true,
                tabSize: 4
            });
            
            const playBtn = document.createElement('button');
            playBtn.className = 'play-btn';
            playBtn.innerHTML = 'Run ▶';
            
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-window';
            outputDiv.style.display = 'none';
            
            // Handle Code Execution
            playBtn.addEventListener('click', async () => {
                outputDiv.style.display = 'block';
                const code = editor.getValue();
                
                // --- Mock Execution for Heavy Models ---
                // Browsers cannot run a multi-gigabyte LLM directly via Pyodide easily, 
                // so we simulate the output for those specific blocks.
                if (code.includes("from transformers import pipeline") || code.includes("openai")) {
                    outputDiv.innerHTML = '<span style="color: #a5d6ff;">[Simulated Execution] Sending prompt to Large Language Model...</span>\n\n';
                    setTimeout(() => {
                        if (code.includes("pipeline('text-generation'")) {
                            outputDiv.innerHTML += "LLM Generation: Machine learning is a rapidly evolving field of artificial intelligence that focuses on...\n";
                        } else {
                            outputDiv.innerHTML += "Response: \n- Legacy NLP required manual feature engineering and complex pipelines.\n- Modern LLMs use simple prompt-based API calls.\n- Generative models offer much more flexibility and raw intelligence.\n";
                        }
                    }, 1000);
                    return;
                }

                // --- Real Pyodide Execution ---
                outputDiv.innerHTML = '<span style="color: #ffbd2e;">Initializing Browser Python Environment (this takes a few seconds on first run)...</span>\n';
                
                try {
                    const pyodide = await getPyodide();
                    outputDiv.innerHTML = '<span style="color: #3fb950;">Python Ready! Executing code...</span>\n\n';
                    
                    // Capture standard output (print statements)
                    let outputBuffer = "";
                    pyodide.setStdout({ batched: (msg) => { outputBuffer += msg + "\n"; } });
                    pyodide.setStderr({ batched: (msg) => { outputBuffer += '<span style="color: #ff5f56;">' + msg + '</span>\n'; } });
                    
                    await pyodide.runPythonAsync(code);
                    
                    if (outputBuffer.trim() === "") {
                        outputDiv.innerHTML += "<em>(Program finished with no output)</em>";
                    } else {
                        outputDiv.innerHTML += outputBuffer;
                    }
                    
                } catch (err) {
                    outputDiv.innerHTML += `\n<span style="color: #ff5f56;">Error:\n${err}</span>`;
                }
            });
            
            wrapper.appendChild(playBtn);
            wrapper.appendChild(outputDiv);
            return wrapper;
        }

        // Find all Prism python blocks and convert them to Ace
        function initAceEditors() {
            const codeBlocks = document.querySelectorAll('pre code.language-python');
            codeBlocks.forEach((codeBlock) => {
                const pre = codeBlock.parentElement;
                
                // Don't convert blocks inside <details> drop-downs that are just for viewing
                if(pre.closest('details') && codeBlock.textContent.includes("Legacy NLP Code")) {
                    // Let's actually allow them to be runnable too!
                }
                
                const codeText = codeBlock.textContent.trim();
                const wrapper = buildEditorWrapper(codeText);
                pre.parentNode.insertBefore(wrapper, pre);
                pre.remove();
            });
        }

        // Inject Ace Editor script if not present
        if (window.ace) {
            initAceEditors();
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.3/ace.js';
            script.onload = initAceEditors;
            document.head.appendChild(script);
        }
    }

    setupPythonPlayground();
    initThemeToggle();
    initSearchModal();
    initPrintButton();
    initGitHubButton();
    initMobileMenu();
});

// =========================================================
// Top Navigation: Theme Toggle
// =========================================================
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle') || document.querySelector('.icon-btn[aria-label="Toggle Theme"]');
    if (!themeBtn) return;

    const sunSvg = `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;

    const moonSvg = `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;

    function updateThemeIcon(theme) {
        themeBtn.innerHTML = theme === 'dark' ? sunSvg : moonSvg;
        themeBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcon(currentTheme);

    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('rust-book-theme', nextTheme);
        localStorage.setItem('agentic-ai-theme', nextTheme);
        updateThemeIcon(nextTheme);
    });
}

// =========================================================
// Top Navigation: Spotlight Search Modal (Ctrl/Cmd + K)
// =========================================================
function initSearchModal() {
    const searchBtns = document.querySelectorAll('.icon-btn[aria-label="Search"]');
    if (!searchBtns.length) return;

    // Course Search Index data covering all 24 days + core topics
    const courseIndex = [
        { day: 0, title: "Course Overview & Architecture", url: "index.html", tags: "intro roadmap syllabus 20 projects methodology prerequisites", desc: "Curriculum roadmap, 20 industrial projects, prerequisites, and learning methodology." },
        { day: 1, title: "Day 1: The AI Landscape: From Basic ML to LLMs", url: "day_01.html", tags: "machine learning deep learning transformers chinchilla scaling logit sampling ttft tpot", desc: "Chinchilla compute-optimal scaling, 5 levels of autonomy, logit sampling profiler." },
        { day: 2, title: "Day 2: Python Fundamentals for Agentic Workflows", url: "day_02.html", tags: "type hints pydantic v2 schemas async await concurrency exponential backoff jitter semaphore", desc: "Pydantic v2 schema enforcement, typed state, async semaphore execution, jittered backoff." },
        { day: 3, title: "Day 3: What is an LLM Actually Doing Under the Hood?", url: "day_03.html", tags: "bpe tokenization kv cache vram attention lost in the middle memory", desc: "Pure Python BPE tokenizer, KV cache memory footprint equations, context window degradation." },
        { day: 4, title: "Day 4: Prompt Engineering as Latent Programming", url: "day_04.html", tags: "bayesian inference chain of thought few shot cosine exemplar selection cove verification", desc: "Implicit Bayesian inference, dynamic cosine exemplar selection, automated CoVe verification engine." },
        { day: 5, title: "Day 5: Turning LLMs into Specialists", url: "day_05.html", tags: "constrained decoding dfa logit masking structured outputs pydantic router grammar", desc: "Constrained decoding, deterministic DFA logit masking, multi-specialist Pydantic schema router." },
        { day: 6, title: "Day 6: Executing Code & External Tools", url: "day_06.html", tags: "tool calling json schema wire protocol sandbox subprocess memory guards security cve", desc: "Tool-calling wire protocol overhead, dynamic @tool signature introspector, sandboxed code executor." },
        { day: 7, title: "Day 7: Deterministic Loops & Compound Reliability", url: "day_07.html", tags: "compound reliability prompt chains fan out fan in state machine json snapshot", desc: "Compound reliability math, sequential prompt chaining, async fan-out risk aggregator, state machines." },
        { day: 8, title: "Day 8: Capstone: Autonomous Problem Solver", url: "day_08.html", tags: "capstone cli problem solver rich terminal hitl approval self healing code", desc: "Full-scale problem solver CLI: Pydantic decomposition, Rich UI, HITL plan approval, self-healing code executor." },
        { day: 9, title: "Day 9: The Agentic Mindset: Autonomous Reasoning Loops", url: "day_09.html", tags: "pomdp react loop quadratic token reflexion episodic critique multi-path tool fallback", desc: "POMDP formalization, quadratic token telemetry, bounded ReAct loop, Reflexion episodic critique engine." },
        { day: 10, title: "Day 10: Dynamic Tool Selection & Registries", url: "day_10.html", tags: "tool registry semantic tool index vector embeddings two stage retrieval parameter coercion", desc: "Dynamic tool registries, two-stage semantic tool index, resilient parameter coercion engine." },
        { day: 11, title: "Day 11: Introduction to Vector RAG Pipelines", url: "day_11.html", tags: "vector geometry cosine similarity hnsw graph chromadb semantic chunking numpy search", desc: "Vector geometry math, HNSW graph indexing, ChromaDB RAG, semantic chunker with sliding overlap." },
        { day: 12, title: "Day 12: Improving Retrieval Quality: BM25 & Hybrid Search", url: "day_12.html", tags: "okapi bm25 inverted index hybrid search reciprocal rank fusion rrf cross encoder rerank", desc: "Okapi BM25 formula from scratch, Bi-Encoder vs Cross-Encoder, Reciprocal Rank Fusion (k=60), Cross-Encoder re-ranker." },
        { day: 13, title: "Day 13: Framework Abstractions: LangChain Core & LCEL", url: "day_13.html", tags: "lcel monadic composition runnable astream streaming runnablebranch fallback chains", desc: "LCEL monadic composition (g | f), real-time streaming, dynamic RunnableBranch router, fallback chains." },
        { day: 14, title: "Day 14: Visual Agentic Workflows with n8n", url: "day_14.html", tags: "n8n visual workflow hmac sha256 webhook fastapi receiver dead letter queue dlq", desc: "HMAC-SHA256 webhook cryptography, full n8n JSON workflow specification, FastAPI receiver, DLQ bridge." },
        { day: 15, title: "Day 15: Agentic RAG: Self-Correction & Multi-Hop Reasoning", url: "day_15.html", tags: "agentic rag self-rag reflection tokens multi-silo query rewriting document grading multi-hop", desc: "Self-RAG reflection tokens, multi-silo retrieval (ChromaDB + SQLite + Python), document grading, query re-writer." },
        { day: 16, title: "Day 16: Capstone: Multi-Silo Enterprise Knowledge Agent", url: "day_16.html", tags: "capstone enterprise hr knowledge agent chromadb sqlite session memory citation auditor cli", desc: "Multi-silo enterprise agent fusing ChromaDB policy store, SQLite HRIS records, safe calculator, citation auditor." },
        { day: 17, title: "Day 17: LangGraph Fundamentals: State & Cyclic Graphs", url: "day_17.html", tags: "langgraph fsm mealy stategraph channel reducers operator add cyclic code refiner mermaid", desc: "Mealy-type FSM state transition math, StateGraph channel reducers (operator.add), cyclic self-refining code evaluator." },
        { day: 18, title: "Day 18: Agent Persistence, Memory & State Management", url: "day_18.html", tags: "sqlitesaver postgres checkpoint time travel debugging thread isolation crash recovery", desc: "Storage footprint Ω(N) & RTO equations, SqliteSaver crash recovery, time-travel debugging with update_state." },
        { day: 19, title: "Day 19: Multi-Agent Systems & Swarm Architectures", url: "day_19.html", tags: "dec-pomdp multi-agent supervisor worker subgraph encapsulation peer swarm handoffs", desc: "Dec-POMDP formalization, quadratic context savings, hierarchical supervisor, peer-to-peer swarm with handoffs." },
        { day: 20, title: "Day 20: Security, Guardrails & Defensive Engineering", url: "day_20.html", tags: "agent security risk index prompt injection confused deputy pii secret sanitizer hitl interrupt", desc: "Agent Security Risk Index, multi-vector ingestion guardrail, reversible PII/secret sanitizer, LangGraph interrupt_before." },
        { day: 21, title: "Day 21: UI & Productionization: Streaming & Webhooks", url: "day_21.html", tags: "server sent events sse wire protocol fastapi sse streaming streamlit cockpit", desc: "SSE wire protocol specification, TTFT/TPOT latency dynamics, FastAPI async SSE server, Streamlit Agent Studio." },
        { day: 22, title: "Day 22: Shipping Real Agents: Testing, Eval & CI/CD", url: "day_22.html", tags: "sre availability mtbf mttr pytest regression harness docker non root github actions ci cd", desc: "SRE availability modeling, production-hardened agent, automated PyTest regression harness, multi-stage Docker & CI/CD." },
        { day: 23, title: "Day 23: Milestone Project: Self-Recovering Distributed Agent", url: "day_23.html", tags: "milestone saga pattern idempotency zero duplicate crash reboot streamlit cockpit", desc: "Distributed Saga pattern, zero-duplicate idempotency after crash reboot, Streamlit operations approval cockpit." },
        { day: 24, title: "Day 24: Grand Capstone: Cyber-Physical Automotive Diagnostic Assistant", url: "day_24.html", tags: "capstone automotive can bus obd-ii pid decoding iso 26262 asil safety gate oem rag", desc: "SAE J1979 Mode 01 PID decoding, ISO 26262 ASIL safety risk gate, synthetic CAN bus frame streamer, master cockpit UI." }
    ];

    // Build modal markup if not already present
    let overlay = document.getElementById('search-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'search-modal-overlay';
        overlay.className = 'search-modal-overlay';
        overlay.innerHTML = `
            <div class="search-modal-container">
                <div class="search-modal-header">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" class="search-input" id="search-modal-input" placeholder="Search lessons, concepts, algorithms, projects (e.g. LangGraph, ReAct, OBD-II)..." autocomplete="off">
                    <button class="search-close-btn" id="search-close-btn">ESC</button>
                </div>
                <div class="search-results-container" id="search-modal-results"></div>
                <div class="search-footer-hint">
                    <span>Use <kbd class="search-kbd">↑</kbd> <kbd class="search-kbd">↓</kbd> to navigate</span>
                    <span><kbd class="search-kbd">ENTER</kbd> to select</span>
                    <span><kbd class="search-kbd">ESC</kbd> to close</span>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const input = overlay.querySelector('#search-modal-input');
    const resultsContainer = overlay.querySelector('#search-modal-results');
    const closeBtn = overlay.querySelector('#search-close-btn');

    let selectedIndex = 0;
    let currentResults = [];

    function renderResults(results) {
        currentResults = results;
        selectedIndex = 0;
        if (!results.length) {
            resultsContainer.innerHTML = '<div class="search-empty">No matching modules or topics found. Try searching for "LangGraph", "RAG", "Pydantic", "OBD-II", or "Prompt".</div>';
            return;
        }

        resultsContainer.innerHTML = results.map((item, idx) => `
            <a href="${item.url}" class="search-result-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}">
                <div class="search-result-header">
                    <span class="search-result-title">${item.title}</span>
                    <span class="search-badge">${item.day === 0 ? 'OVERVIEW' : 'DAY ' + item.day}</span>
                </div>
                <div class="search-result-desc">${item.desc}</div>
            </a>
        `).join('');

        // Attach click handlers
        resultsContainer.querySelectorAll('.search-result-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                resultsContainer.querySelectorAll('.search-result-item').forEach(r => r.classList.remove('selected'));
                el.classList.add('selected');
                selectedIndex = parseInt(el.getAttribute('data-index'), 10);
            });
        });
    }

    function openModal() {
        overlay.classList.add('active');
        input.value = '';
        renderResults(courseIndex);
        setTimeout(() => input.focus(), 50);
    }

    function closeModal() {
        overlay.classList.remove('active');
    }

    searchBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
        btn.setAttribute('title', 'Quick Search (Ctrl + K)');
    });
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Keyboard navigation
    input.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) {
            renderResults(courseIndex);
            return;
        }
        const filtered = courseIndex.filter(item => 
            item.title.toLowerCase().includes(q) ||
            item.tags.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q)
        );
        renderResults(filtered);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentResults.length > 0) {
                selectedIndex = (selectedIndex + 1) % currentResults.length;
                updateSelection();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentResults.length > 0) {
                selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
                updateSelection();
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentResults[selectedIndex]) {
                window.location.href = currentResults[selectedIndex].url;
            }
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });

    function updateSelection() {
        const items = resultsContainer.querySelectorAll('.search-result-item');
        items.forEach((item, idx) => {
            if (idx === selectedIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    // Global shortcut: Ctrl+K or Cmd+K
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (overlay.classList.contains('active')) {
                closeModal();
            } else {
                openModal();
            }
        }
    });
}

// =========================================================
// Top Navigation: Print Button
// =========================================================
function initPrintButton() {
    const printBtns = document.querySelectorAll('.icon-btn[aria-label="Print"]');
    printBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.print();
        });
        btn.setAttribute('title', 'Print Lesson / Save PDF');
    });
}

// =========================================================
// Top Navigation: GitHub Repository Link
// =========================================================
function initGitHubButton() {
    const githubBtns = document.querySelectorAll('.icon-btn[aria-label="GitHub"]');
    githubBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://github.com/kamallearner123/AgenticAIBook', '_blank', 'noopener,noreferrer');
        });
        btn.setAttribute('title', 'View GitHub Repository');
    });
}

// =========================================================
// Top Navigation: Mobile Hamburger Sidebar Toggle
// =========================================================
function initMobileMenu() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (!toggleBtn || !sidebar) return;

    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        document.body.appendChild(backdrop);
    }

    function toggleMenu() {
        const isOpen = sidebar.classList.toggle('open');
        backdrop.classList.toggle('active', isOpen);
    }

    function closeMenu() {
        sidebar.classList.remove('open');
        backdrop.classList.remove('active');
    }

    toggleBtn.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', closeMenu);
}


// Interactive MCQ Checker for radio-button quiz cards
function checkMCQ(questionId, correctAnswer, explanation) {
    const card = document.getElementById(questionId);
    if (!card) return;
    
    const selected = card.querySelector(`input[name="${questionId}"]:checked`);
    const feedbackEl = card.querySelector('.feedback');
    if (!feedbackEl) return;
    
    if (!selected) {
        feedbackEl.innerHTML = '<span style="color: #f59e0b; font-weight: 600;">⚠️ Please select an answer before checking!</span>';
        feedbackEl.style.display = 'block';
        return;
    }
    
    if (selected.value === correctAnswer) {
        feedbackEl.innerHTML = `<span style="color: #10b981; font-weight: 600;">✓ ${explanation}</span>`;
    } else {
        feedbackEl.innerHTML = `<span style="color: #ef4444; font-weight: 600;">✗ Incorrect. Try again!</span>`;
    }
    feedbackEl.style.display = 'block';
}

// Copy button functionality for code snippets
function copyCode(button) {
    const container = button.closest('.code-header') ? button.closest('.code-header').nextElementSibling : button.parentElement;
    const code = container ? container.querySelector('code') : null;
    const textToCopy = code ? code.innerText : '';
    
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = button.innerText;
            button.innerText = 'Copied!';
            button.style.backgroundColor = 'var(--accent-color, #10b981)';
            button.style.color = '#fff';
            setTimeout(() => {
                button.innerText = originalText;
                button.style.backgroundColor = '';
                button.style.color = '';
            }, 2000);
        });
    }
}
