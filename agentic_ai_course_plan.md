# Agentic AI - Course Material Generation Plan

This plan breaks down the 24-day curriculum from the "Agentic AI - Learn by Examples" course. You can generate the HTML material for each day by copying the provided text for that day and pasting it into your custom `generate-course-module` skill.

---

## Week 1: Foundations & Prompting

### Day 1
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 1: The AI Landscape: From Basic ML to LLMs
Problem: You hear terms like Machine Learning, Deep Learning, and Large Language Models, but how do they connect, and why are LLMs so revolutionary?
Discover: Traditional Programming vs. ML • Supervised vs Unsupervised • Neural Networks (ANN, CNN, RNN) • Transformers • Generative AI.
Figures:
- Diagram comparing traditional programming (data + rules = output) to machine learning.
- Diagram of Supervised Learning Process.
- Diagram of Unsupervised Learning (Clustering).
- Diagram of Reinforcement Learning Cycle.
- Diagram of Standard Artificial Neural Network (ANN).
- Diagram of Convolutional Neural Network (CNN).
- Diagram of Recurrent Neural Network (RNN) Unrolled Through Time.
- Diagram of Generative AI Next-Token Prediction.
Programs:
- Python conceptually demonstrating Supervised vs Unsupervised vs RL vs Generative AI.
- Code block comparing Legacy NLP Pipelines vs Modern LLM API Calls.
Real Time Examples:
- 5 real-world examples for each neural architecture (ANN, CNN, RNN).
- Include a summary comparison table: Supervised vs. Unsupervised Learning.
- Include a reference table: Most Frequently Used ML Models (Linear/Logistic Regression, Random Forest, SVM, K-Means, PCA).
- Include a summary comparison table: ANN vs CNN vs RNN vs Transformers.
- Ensure the end-of-module quiz contains exactly 10 MCQs.
Assignments:
- 1. Model Classification (Identify Supervised vs Unsupervised vs RL from 5 scenarios).
- 2. Tabular vs Unstructured Data Hunt (Find local examples).
- 3. Algorithm Matchmaker (Match models like K-Means and Random Forest to use cases).
- 4. The Context Window Constraint (Count tokens in recent emails).
- 5. Generative Prompting Variations (Test next-token prediction behavior with a 5-year-old persona).
Outcome: Build a solid conceptual foundation of the AI landscape before diving into LLM internals.
```

### Day 2
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 2: Python Fundamentals for Agentic AI
Problem: You need to interact with APIs and process structured data, but you don't know the core programming tools required for AI development.
Discover: Python basics • Variables & Data Types • Lists & Dictionaries • Functions • API requests (requests library) • JSON parsing.
Figures: 
- Diagram explaining Python Variables and basic Data Types in memory.
- Diagram showing the structure of a Python Dictionary (Keys mapped to Values).
- Diagram showing a Python script making an HTTP GET request to an API server and receiving a JSON payload.
- Diagram comparing a raw JSON string vs a parsed Python Dictionary.
Programs: 
- Program 1: Variables & String Manipulation (Sanitizing User Prompts)
- Program 2: Control Flow - If/Else & Loops (Building an Agentic Reasoning Loop)
- Program 3: Collections - Lists, Tuples, Sets (Managing Memory and Deduplicating Keywords)
- Program 4: Dictionaries (Structuring Agent Configuration Profiles)
- Program 5: Functions & Modules (Building Tools and importing libraries like `math` or `datetime`)
- Program 6: Classes / OOP (Encapsulating State in an `Agent` Class)
- Program 7: Regular Expressions / Regex (Parsing Tool Commands from Raw LLM Text)
- Program 8: JSON Parsing & HTTP Requests (Communicating with LLM APIs)
- Program 9: File I/O (Saving and Loading Agent Memory to local JSON files)
- Program 10: PDF & CSV Parsers (Data Ingestion for RAG)
- Program 11: Database CRUD Ops (Managing Long-Term Memory using `sqlite3`)
Real Time Examples:
- 5 real-world examples of where Python Dictionaries are used (e.g., User Profiles, API responses).
- Include a summary comparison table: Python Lists vs. Dictionaries (Structure, Use case, Lookup Speed).
- Include a reference table: Most Frequently Used Python Data Types (String, Integer, Float, Boolean, List, Dictionary) with 3 concrete real-world examples for each.
- Include a summary comparison table: HTTP Request Methods (GET, POST, PUT, DELETE) with 3 real-world examples for each.
- Ensure the end-of-module quiz contains exactly 10 MCQs.
Assignments:
- 1. Agent State Config: Create a Python Dictionary representing an AI Agent profile.
- 2. ReAct Reasoning Loop: Write a while-loop simulating agentic thinking steps.
- 3. Regex Tool Extractor: Extract a tool name from a raw string using `re`.
- 4. Agent Class Design: Write an OOP Class named `MemoryAgent` with a `remember()` method.
- 5. JSON Parsing Challenge: Parse a nested JSON user profile and extract the zip code.
Outcome: Build a solid Python foundation for AI integration capable of handling complex JSON and APIs.
```

### Day 3
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 3: What is an LLM actually doing under the hood?
Problem: You ask an AI a question, but it gives a generic or slightly off-topic answer. Why isn't it "thinking" the way a human does, and how does it actually generate its response?
Discover: Next-token prediction • Context windows • Tokens vs. Words • Why embeddings (numbers) are used instead of text.
Figures:
- Diagram of text being tokenized into subwords.
- Visual of an embedding vector mapping a word into multidimensional space.
Programs:
- Python script using `tiktoken` to count tokens in a string.
- Simple conceptual code showing vector similarity (dot product) between words.
Real Time Examples:
- Autocomplete on a smartphone keyboard predicting the next word, but scaled to billions of parameters.
Outcome: Gain a mental model of an LLM to write better prompts and understand limitations.
```

### Day 4
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 4: Prompt Engineering & Overcoming Hallucinations
Problem: You need an LLM to give precise answers but it sometimes hallucinates or gives generic responses.
Discover: Context • System vs user instructions • Prompt structure • Few-shot prompting • Grounding.
Figures:
- Diagram highlighting the difference between System Prompt, User Prompt, and Context injection.
Programs:
- Python script calling OpenAI/Anthropic API demonstrating a zero-shot vs few-shot prompt.
- Example showing a prompt template with strict formatting rules.
Real Time Examples:
- Asking a junior employee to summarize a document vs providing the document and a strict bullet-point template.
Outcome: Design a robust prompt template that distinguishes known and unknown information.
```

### Day 5
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 5: How do you make an LLM behave like a specialist?
Problem: Take a generic ChatGPT and make it behave like a senior software architect.
Discover: Role • Domain context • Rules • Examples • Constraints • Expected output
Figures:
- Visual map of persona components: Role + Tone + Guardrails + Output Format.
Programs:
- Python API call passing a detailed System Persona for code review.
- Code enforcing JSON output using structured output parameters.
Real Time Examples:
- A medical triage bot that strictly adheres to medical guidelines and refuses non-medical questions.
Outcome: Create and test a specialist prompt.
```

### Day 6
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 6: Can an LLM actually perform work?
Problem: Ask an LLM to calculate something, read data, search information and perform an operation. Determine what the LLM can and cannot do by itself.
Discover: Tools • Function calling • Tool schemas • Arguments • Tool results • LLM-tool loop
Figures:
- Flowchart of the LLM-tool loop: User Prompt -> LLM outputs tool call -> System runs tool -> Result returned to LLM -> Final response.
Programs:
- Python script defining a `get_weather` tool schema in JSON.
- Code showing how to append the tool response back into the message history.
Real Time Examples:
- Asking Siri to "turn off the lights" (mapping natural language to a smart home API call).
Outcome: Build the first working tool-enabled LLM.
```

### Day 7
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 7: How do you make AI follow a repeatable process?
Problem: Build a system that executes Understand → Analyze → Calculate → Verify → Respond. Identify why a single prompt becomes unreliable.
Discover: Prompt chaining • Structured outputs • Intermediate results • Validation • Deterministic workflows
Figures:
- Pipeline diagram showing output of Prompt 1 feeding into Prompt 2.
Programs:
- Python script executing a sequential chain: Classifier -> Extractor -> Summarizer.
Real Time Examples:
- Customer support pipeline: Classify intent, extract order ID, query database, draft response.
Outcome: Week 1 project: AI Problem Solver.
```

### Day 8
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 8: Project Session: AI Problem Solver
Focus: Dedicated hands-on session to build the Week 1 project.
Build: A Python application that accepts a problem, classifies it, breaks it into steps, uses an LLM, validates the output and produces structured results.
Figures:
- Architecture diagram of the AI Problem Solver pipeline.
Programs:
- Complete end-to-end Python script combining prompts, structured output, and basic validation loops.
Real Time Examples:
- An automated IT helpdesk ticket categorizer and resolver.
Outcome: Complete a working AI Problem Solver.
```

---

## Week 2: Workflows and RAG

### Day 9
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 9: Why isn't ChatGPT enough?
Problem: Give an AI a task requiring search, reading, extraction, comparison, analysis and reporting. Determine what must happen for the system to operate as an agent.
Discover: Assistant vs workflow vs agent • Planning • Decision-making • Agentic behavior • Multi-step execution
Figures:
- Diagram distinguishing: Simple Chatbot, Static Workflow, and Autonomous Agent.
Programs:
- Python conceptual loop (while not finished: think -> act -> observe).
Real Time Examples:
- An autonomous research assistant browsing the web, clicking links, and compiling a dossier.
Outcome: Design an agent for a real business task.
```

### Day 10
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 10: Can AI use your software?
Problem: Build an AI that can call a calculator, weather API, database or file reader. The LLM must decide which tool to use.
Discover: Function calling • Pydantic • JSON Schema • Tool descriptions • Tool selection • ReAct
Figures:
- Diagram of the ReAct (Reason + Act) loop.
Programs:
- Python script implementing a basic ReAct loop using Pydantic for tool validation.
Real Time Examples:
- An AI financial advisor querying a stock database and calculating ROI using a math tool.
Outcome: Build an agent that selects and calls tools.
```

### Day 11
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 11: Why doesn't AI know what's inside my documents?
Problem: Give an LLM a large private document and ask a question about information buried deep inside it. Build a system that retrieves the relevant content.
Discover: Documents • Chunks • Embeddings • Vector search • Retrieved context • Grounded generation
Figures:
- Flowchart of the complete RAG (Retrieval-Augmented Generation) pipeline: Ingestion vs Retrieval.
Programs:
- Python script reading a PDF, chunking text, generating embeddings, and storing in a basic vector DB (like Chroma or FAISS).
Real Time Examples:
- Uploading a 500-page employee handbook and asking "What is the maternity leave policy?"
Outcome: Document → chunks → embeddings → retrieval → answer.
```

### Day 12
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 12: Why does RAG sometimes retrieve the wrong information?
Problem: Create a knowledge base containing similar documents. Compare keyword search and semantic search and investigate why retrieval quality changes the final answer.
Discover: Chunk size • Overlap • Embeddings • Similarity • Top-k • Metadata • Hybrid search • Re-ranking
Figures:
- Visualization of semantic vs keyword search (e.g. matching 'dog' with 'canine').
Programs:
- Python code comparing cosine similarity scores of different embedding models.
- Code demonstrating chunk overlap configurations.
Real Time Examples:
- Searching for "Apple" (fruit) vs "Apple" (company) and seeing how semantic search uses surrounding context.
Outcome: Improve retrieval quality using experiments.
```

### Day 13
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 13: Can we build this without writing all the glue code?
Problem: Rebuild the RAG pipeline using LangChain and compare the abstraction with the Python implementation.
Discover: Models • Prompt templates • Retrievers • Chains • LCEL • Output parsers
Figures:
- LangChain architecture diagram showing LCEL (LangChain Expression Language) pipe syntax.
Programs:
- Python script building a RAG chain in 5 lines using `chain = retriever | prompt | llm | output_parser`.
Real Time Examples:
- Using a framework like Django for web dev instead of writing raw socket code—LangChain is the framework for LLMs.
Outcome: Use LangChain as an engineering abstraction.
```

### Day 14
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 14: Can we automate workflows visually using n8n?
Problem: You want to connect multiple tools and an LLM, but writing and maintaining Python glue code for every integration is becoming too slow.
Discover: Visual programming • n8n workflows • Webhooks • HTTP requests • Built-in integrations
Figures:
- Screenshot/Diagram of an n8n node-based visual workflow canvas.
Programs:
- JSON representation of an n8n workflow (for import).
- Python webhook receiver simulating an n8n endpoint.
Real Time Examples:
- Zapier for AI: "When an email arrives, summarize it with AI, and post to Slack."
Outcome: Create a no-code/low-code AI automated workflow.
```

### Day 15
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 15: Can the RAG system decide when to use tools?
Problem: Answer a question that requires both private-document retrieval and an external operation, such as calculating a value or querying a database.
Discover: RAG + tools • Agent decisions • Tool routing • Error handling
Figures:
- Diagram showing an Agent equipped with a "Vector Search Tool" and a "Web Search Tool", making a routing decision.
Programs:
- Python/LangChain script giving an Agent access to a RetrieverTool.
Real Time Examples:
- A sales assistant that queries internal CRM docs for pricing rules, then uses a calculator tool to apply a discount.
Outcome: Week 2 project: Company Knowledge Agent.
```

### Day 16
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 16: Project Session: Company Knowledge Agent
Focus: Dedicated hands-on session to build the Week 2 project.
Build: A RAG-powered agent that searches company documents, answers with evidence, selects tools when required and handles missing information.
Figures:
- System architecture diagram of the Company Knowledge Agent.
Programs:
- Comprehensive Python script combining vector store initialization, tool definitions, and agent execution loop.
Real Time Examples:
- An HR intranet bot that can both read company policies (RAG) and check remaining PTO balance via API (Tool).
Outcome: Complete a working Company Knowledge Agent.
```

---

## Week 3: Complex Multi-Agent Systems & Deployment

### Day 17
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 17: Why isn't a simple agent enough?
Problem: Design an agent that must classify, retrieve, analyze, verify, obtain approval and execute. Some paths branch, some repeat and some require humans.
Discover: Nodes • Edges • State • Conditional routing • Loops
Figures:
- Directed Acyclic Graph (DAG) diagram showing conditional paths and cycles in LangGraph.
Programs:
- Python script setting up a basic `StateGraph` in LangGraph with nodes and edges.
Real Time Examples:
- A supply chain process where step 3 (Quality Control) can loop back to step 1 (Manufacturing) if it fails.
Outcome: Control complex agent workflows with LangGraph.
```

### Day 18
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 18: What happens when an agent fails halfway?
Problem: Make an eight-step agent fail after step five. Determine how to resume without starting from the beginning.
Discover: State • Checkpoints • Persistence • Threads • Resume • Streaming • Interrupt/resume
Figures:
- Diagram showing state being saved to a database at each node execution (checkpointing).
Programs:
- Python script using LangGraph with a SqliteSaver checkpointer to pause, inject state, and resume.
Real Time Examples:
- Playing a video game and saving your progress before a boss fight so you don't restart the whole game if you die.
Outcome: Build a recoverable agent workflow.
```

### Day 19
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 19: Why use multiple agents?
Problem: Build one large agent responsible for research, coding, validation and reporting. Identify where specialization improves control and where it creates unnecessary complexity.
Discover: Supervisor/orchestrator • Specialized agents • Agent-to-agent communication • Architecture trade-offs
Figures:
- Diagram of a Hierarchical Multi-Agent system (Supervisor directing Worker Agents).
Programs:
- Python script defining a Supervisor agent that delegates tasks to a "Researcher" and a "Coder".
Real Time Examples:
- A software development team: Project Manager (Supervisor), Developer (Coder Agent), QA (Reviewer Agent).
Outcome: Design a justified multi-agent architecture.
```

### Day 20
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 20: How can an agent become dangerous?
Problem: Expose an agent to malicious retrieved content, prompt injection and dangerous tools. Determine what permissions and approval gates are required.
Discover: Prompt injection • Indirect injection • Tool abuse • Excessive permissions • Data leakage • Guardrails • Human approval
Figures:
- Diagram showing an attacker inserting malicious instructions into a webpage that an agent is reading (Indirect Prompt Injection).
Programs:
- Python script demonstrating a prompt injection attack and implementing NeMo Guardrails to block it.
Real Time Examples:
- An airline chatbot accidentally selling tickets for $1 because it was manipulated by a user's prompt.
Outcome: Build a guarded agent.
```

### Day 21
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 21: How do you turn your agent into a product?
Problem: Take a working terminal-based agent and turn it into a usable application.
Discover: UI • API • Configuration • Logging • Tracing • Evaluation • Deployment • MCP awareness
Figures:
- System diagram mapping the Agent backend to a REST API and Frontend UI.
Programs:
- Python script using Streamlit or Gradio to wrap the agent logic into a chat interface.
Real Time Examples:
- Turning a Python script that runs locally into a web app accessible by anyone via URL.
Outcome: Deploy a usable agent application.
```

### Day 22
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 22: How do you build and ship a real agent?
Problem: Build an end-to-end engineering assistant combining RAG, tools, memory, routing, human approval and guardrails.
Discover: RAG • Tools • Memory • LangGraph • Conditional routing • Human-in-the-loop • Guardrails • Deployment
Figures:
- Comprehensive blueprint diagram of a production-grade Agentic System.
Programs:
- Python code integrating memory (checkpointers), tools, and a human-in-the-loop pause state using LangGraph.
Real Time Examples:
- A customer service bot that handles refunds automatically up to $50 but routes to a human manager for larger amounts.
Outcome: Week 3 project / Major capstone: production-style agentic system.
```

### Day 23
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 23: Project Session: Recoverable Agent Workflow
Focus: Dedicated hands-on session to build the Week 3 project.
Build: A multi-node LangGraph agent with conditional routing, persistence/checkpointing and human-in-the-loop approval, wrapped in a basic UI.
Figures:
- Diagram detailing the nodes, edges, and human-approval breakpoint.
Programs:
- The full backend code for the recoverable workflow graph.
Real Time Examples:
- Code deployment pipeline: Agent reviews code, runs tests, and pauses to ask a Senior Dev for approval before deploying.
Outcome: Complete a working Recoverable Agent Workflow.
```

### Day 24
**Prompt to use:**
```text
Use the generate-course-module skill for the following topic:

Day 24: Major Capstone: Automotive Engineering Assistant
Focus: Final hands-on session to build and present the major capstone.
Build: An end-to-end system that searches engineering documentation, retrieves specifications, calls diagnostic tools, and requests human approval.
Figures:
- Final capstone architecture showing Document DB, Vector DB, LLM Engine, Tool Integrations, and UI.
Programs:
- Integrated capstone Python application using LangChain, LangGraph, Streamlit, and custom automotive tools.
Real Time Examples:
- A diagnostic assistant in a Tesla repair shop that can read error codes, cross-reference repair manuals, and order replacement parts.
Outcome: Graduate with a production-ready Automotive Engineering Assistant.
```
