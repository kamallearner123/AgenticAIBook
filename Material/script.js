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
});
