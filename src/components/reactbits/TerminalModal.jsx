import React, { useState, useEffect, useRef } from 'react';
import './TerminalModal.css';

const COMMANDS = {
    help: {
        desc: 'List all available commands',
        execute: () => [
            { text: 'Available commands:', type: 'highlight-text' },
            { text: '  help     - Show this help message', type: 'help-text' },
            { text: '  skills   - List technical competencies', type: 'help-text' },
            { text: '  projects - List featured projects', type: 'help-text' },
            { text: '  contact  - Show contact information', type: 'help-text' },
            { text: '  whoami   - Display current user info', type: 'help-text' },
            { text: '  clear    - Clear the terminal', type: 'help-text' },
            { text: '  exit     - Close the terminal', type: 'help-text' }
        ]
    },
    skills: {
        desc: 'List technical competencies',
        execute: () => [
            { text: 'Loading skill modules...', type: 'help-text' },
            { text: 'LANGUAGES : Java, PHP, JavaScript, C', type: 'success-text' },
            { text: 'FRONTEND  : React, Astro, HTML/CSS', type: 'success-text' },
            { text: 'BACKEND   : Node.js, Express, MySQL', type: 'success-text' },
            { text: 'DEVOPS    : Docker, Kubernetes, AWS', type: 'success-text' },
            { text: 'SECURITY  : CompTIA A+, CompTIA Security+', type: 'highlight-text' }
        ]
    },
    projects: {
        desc: 'List featured projects',
        execute: () => [
            { text: '1. Asante Financial Services', type: 'highlight-text' },
            { text: '   Full-stack loan application portal (PHP, MySQL, JS)', type: 'help-text' },
            { text: '2. SBK.dev Portfolio', type: 'highlight-text' },
            { text: '   High-performance static site (Astro, React, WebGPU)', type: 'help-text' }
        ]
    },
    contact: {
        desc: 'Show contact information',
        execute: () => [
            { text: 'Establishing secure connection...', type: 'help-text' },
            { text: 'EMAIL    : simangalisoblessed@gmail.com', type: 'success-text' },
            { text: 'LINKEDIN : linkedin.com/in/sibongakonke-simamane-371ba7236', type: 'success-text' },
            { text: 'GITHUB   : github.com/sivuhsGorha', type: 'success-text' },
            { text: 'LOCATION : Durban / Umhlanga', type: 'success-text' }
        ]
    },
    whoami: {
        desc: 'Display current user info',
        execute: () => [
            { text: 'guest@sbk.dev', type: 'success-text' },
            { text: 'Welcome to the system. Type "help" to get started.', type: 'help-text' }
        ]
    }
};

export default function TerminalModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([
        { text: 'SBK.dev Terminal [Version 1.0.0]', type: 'help-text' },
        { text: '(c) 2026 Sibongakonke Simamane. All rights reserved.', type: 'help-text' },
        { text: ' ', type: 'help-text' },
        { text: 'Type "help" for a list of commands.', type: 'highlight-text' },
        { text: 'Press ~ or Esc to exit.', type: 'help-text' }
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '`' || e.key === '~') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            } else if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            setInput('');
            
            if (!cmd) {
                setHistory(prev => [...prev, { text: ' ', isCommand: true }]);
                return;
            }

            const newHistory = [...history, { text: `guest@sbk.dev:~$ ${cmd}`, isCommand: true, type: 'command' }];

            if (cmd === 'clear') {
                setHistory([]);
                return;
            }

            if (cmd === 'exit') {
                setIsOpen(false);
                setHistory(prev => [...prev, { text: 'Session terminated.', type: 'help-text' }]);
                return;
            }

            if (COMMANDS[cmd]) {
                const output = COMMANDS[cmd].execute();
                setHistory([...newHistory, ...output]);
            } else {
                setHistory([...newHistory, { text: `Command not found: ${cmd}. Type "help" for available commands.`, type: 'error-text' }]);
            }
        }
    };

    return (
        <div className={`terminal-overlay ${isOpen ? 'is-open' : ''}`} onClick={(e) => {
            if (e.target.classList.contains('terminal-overlay')) setIsOpen(false);
        }}>
            <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
                <div className="terminal-header">
                    <div className="terminal-buttons">
                        <button className="terminal-btn close" onClick={() => setIsOpen(false)} aria-label="Close"></button>
                        <button className="terminal-btn minimize" onClick={() => setIsOpen(false)} aria-label="Minimize"></button>
                        <button className="terminal-btn maximize" aria-label="Maximize"></button>
                    </div>
                    <div className="terminal-title">guest@sbk.dev: ~</div>
                    <div style={{width: '44px'}}></div>
                </div>
                <div className="terminal-body" ref={bodyRef}>
                    <div className="terminal-output">
                        {history.map((line, i) => (
                            <div key={i} className={`terminal-line ${line.type || ''}`}>
                                {line.text}
                            </div>
                        ))}
                    </div>
                    <div className="terminal-input-line">
                        <span className="prompt">guest@sbk.dev:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="terminal-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            spellCheck="false"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
