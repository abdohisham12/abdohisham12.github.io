/**
 * Mission Assistant (Chatbot) Logic
 * 
 * Functions:
 * - Handling user input
 * - Simulating AI processing delay
 * - Mapping keywords to portfolio sections/content
 * - Managing the UI state (open/close, typing indicators)
 */

class MissionAssistant {
    constructor() {
        this.isOpen = false;
        this.chatWindow = null;
        this.messagesContainer = null;
        this.inputField = null;
        this.toggleButton = null;

        // Knowledge Base - Friendly & Advocating Persona
        this.knowledgeBase = {
            'greetings': {
                keywords: ['hello', 'hi', 'hey', 'start', 'begin', 'init', 'yo'],
                response: "Hello! slightly_smiling_face I'm here to show you why Abdulrahman is the perfect addition to your engineering team. Ask me about his <strong>Projects</strong>, <strong>Experience</strong>, or <strong>Skills</strong>!",
                action: null
            },
            'how_are_you': {
                keywords: ['how are you', 'how r u', 'status', 'report'],
                response: "I'm operating at peak efficiency—just like the code Abdulrahman writes! Thanks for asking. How can I help you with your hiring decision?",
                action: null
            },
            'who_are_you': {
                keywords: ['who are you', 'what are you', 'bot', 'assistant'],
                response: "I'm Abdulrahman's personal AI advocate! I exist to help you navigate his portfolio and see why he's a top-tier candidate.",
                action: null
            },
            'hire': {
                keywords: ['why hire', 'hire', 'recommend', 'reason', 'advocate'],
                response: "You should hire him because he combines <strong>Aerospace Engineering domain expertise</strong> with <strong>Production-Grade AI skills</strong>. He doesn't just build models; he solves complex business problems. Check out his Featured Work!",
                action: 'featured-work'
            },
            'projects': {
                keywords: ['project', 'work', 'mission', 'portfolio', 'build', 'create', 'sirb', 'google', 'ionosphere'],
                response: "Excellent choice! Abdulrahman has architected AI systems for space missions and commercial apps. Let me filter his best work for you...",
                action: 'projects'
            },
            'experience': {
                keywords: ['experience', 'job', 'work', 'career', 'history', 'flight', 'log', 'aqmaar', 'invisible'],
                response: "He has impressive professional experience! From leading QA teams at AQMAAR to training LLMs at Invisible. Here's his career timeline...",
                action: 'experience'
            },
            'skills': {
                keywords: ['skill', 'tech', 'stack', 'tool', 'python', 'ai', 'ml', 'machine learning', 'tensorflow', 'pytorch'],
                response: "He's an expert in Python, CloudOps (Azure/AWS), and modern AI frameworks. Bringing up his full technical command center now...",
                action: 'skills'
            },
            'contact': {
                keywords: ['contact', 'email', 'touch', 'comms', 'message', 'hire', 'talk', 'call'],
                response: "I'd love to see him proceed to the next interview round! Opening his direct communication channels for you.",
                action: 'footer'
            },
            'about': {
                keywords: ['about', 'who', 'profile', 'bio', 'background'],
                response: "Abdulrahman is that rare 'Unicorn' engineer—bridging the gap between complex Space Tech and Advanced AI. Let me introduce you...",
                action: 'domain-expertise'
            },
            'education': {
                keywords: ['education', 'degree', 'university', 'study', 'school'],
                response: "He recently graduated with a 3.69 GPA (Excellent with Honors) in Navigation Science & Space Tech. A rock-solid engineering foundation. Viewing details...",
                action: 'education'
            }
        };

        this.init();
    }

    init() {
        this.createChatInterface();
        this.attachEventListeners();
        // Initial greeting after short delay
        setTimeout(() => {
            if (!localStorage.getItem('chat_greeted')) {
                this.addMessage("Hi there! 👋 I'm Abdulrahman's AI assistant. I'm here to show you why he's the perfect fit for your team. What would you like to know?", 'bot');
                localStorage.setItem('chat_greeted', 'true');
            }
        }, 2000);
    }

    createChatInterface() {
        // HTML Structure to be injected
        const chatHTML = `
            <div id="mission-assistant-trigger" class="mission-trigger">
                <i class="fas fa-robot"></i>
                <span class="trigger-label">Mission Assist</span>
            </div>
            
            <div id="mission-assistant-window" class="mission-window hidden">
                <div class="mission-header">
                    <div class="header-status">
                        <span class="status-light"></span>
                        <span class="status-text">SYSTEM ONLINE</span>
                    </div>
                    <button id="mission-close" class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div id="mission-messages" class="mission-messages">
                    <!-- Messages go here -->
                </div>
                <div class="mission-input-area">
                    <input type="text" id="mission-input" placeholder="Enter command..." autocomplete="off">
                    <button id="mission-send" class="send-btn"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = chatHTML;
        document.body.appendChild(container);

        this.chatWindow = document.getElementById('mission-assistant-window');
        this.messagesContainer = document.getElementById('mission-messages');
        this.inputField = document.getElementById('mission-input');
        this.toggleButton = document.getElementById('mission-assistant-trigger');
    }

    attachEventListeners() {
        this.toggleButton.addEventListener('click', () => this.toggleChat());

        document.getElementById('mission-close').addEventListener('click', () => this.toggleChat());

        const sendBtn = document.getElementById('mission-send');
        sendBtn.addEventListener('click', () => this.handleInput());

        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleInput();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatWindow.classList.toggle('hidden', !this.isOpen);
        if (this.isOpen) {
            this.inputField.focus();
        }
    }

    handleInput(directInput = null) {
        const text = directInput || this.inputField.value.trim();
        if (!text) return;

        // User message
        this.addMessage(text, 'user');
        this.inputField.value = '';

        // Processing indicator
        this.showTyping();

        // Simulate AI "analysis" time
        setTimeout(() => {
            this.processQuery(text.toLowerCase());
        }, 800 + Math.random() * 500);
    }

    showTyping() {
        const typingId = 'typing-' + Date.now();
        const typingHTML = `
            <div class="message bot-message typing" id="${typingId}">
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </div>
        `;
        this.messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
        return typingId;
    }

    removeTyping() {
        const indicators = this.messagesContainer.querySelectorAll('.typing');
        indicators.forEach(el => el.remove());
    }

    processQuery(query) {
        this.removeTyping();

        let match = null;
        let highestScore = 0;

        // Simple keyword matching
        for (const [key, data] of Object.entries(this.knowledgeBase)) {
            let score = 0;
            data.keywords.forEach(word => {
                if (query.includes(word)) score++;
            });

            if (score > highestScore) {
                highestScore = score;
                match = data;
            }
        }

        if (match) {
            this.addMessage(match.response, 'bot');
            if (match.action) {
                this.executeAction(match.action);
            }
        } else {
            // Friendly fallback with options
            const fallbackHTML = `
                We are here to talk about Abdulrahman, aren't we? wink
                <div class="suggestion-chips">
                    <button class="suggestion-chip" data-command="Who is Abdulrahman">Who is Abdulrahman?</button>
                    <button class="suggestion-chip" data-command="Why hire Abdulrahman">Why hire Abdulrahman?</button>
                    <button class="suggestion-chip" data-command="Show me projects">Show me Projects</button>
                    <button class="suggestion-chip" data-command="Contact him">Contact Info</button>
                </div>
            `;
            this.addMessage(fallbackHTML, 'bot');
        }
    }

    executeAction(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth' });
                // Highlight effect
                section.style.transition = 'box-shadow 0.5s ease';
                section.style.boxShadow = '0 0 20px var(--color-primary)';
                setTimeout(() => {
                    section.style.boxShadow = '';
                }, 2000);
            }, 1000);
        }
    }

    addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        msgDiv.className = `message ${sender}-message`;
        msgDiv.innerHTML = text; // Use innerHTML to allow styling and buttons
        this.messagesContainer.appendChild(msgDiv);
        // Add click event listeners for any suggestion chips we just added
        const chips = msgDiv.querySelectorAll('.suggestion-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const command = e.target.dataset.command;
                this.handleInput(command); // Feed it back as input
            });
        });
        this.scrollToBottom();
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new MissionAssistant();
});
