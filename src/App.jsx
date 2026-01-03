import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Lock, RotateCcw, Send, ShieldAlert, Terminal, Brain, ArrowRight, Zap, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';


import logo from './assets/logo.jpg'; 

// --- DATA: RIDDLE QUESTIONS ---
const RIDDLES = [
  { q: "I am the color Green in a world of Red. I am the dopamine hit after hours of struggle. What am I?", a: ["Accepted", "AC"], hint: "The verdict everyone wants." },
  { q: "Your logic is correct, but your method is lazy. The clock ran out before you could finish. What am I?", a: ["Time Limit Exceeded", "TLE"], hint: "O(N^2) instead of O(N log N)." },
  { q: "You passed the Sample Tests, but on 'Test Case 42', I destroyed your confidence. I prove you missed an edge case.", a: ["Wrong Answer", "WA"], hint: "Red verdict." },
  { q: "You tried to reach a memory address that wasn't yours, or divided by zero. I killed your program instantly.", a: ["Runtime Error", "RE"], hint: "Crash!" },
  { q: "You were too greedy with space. You declared an array bigger than RAM allowed. What am I?", a: ["Memory Limit Exceeded", "MLE"], hint: "Overflowing the heap." },
  { q: "I do all the calculations and thinking for the computer, but I have no imagination. What am I?", a: ["CPU", "Processor"], hint: "The brain of the PC." },
  { q: "I hold all your open apps, but the moment you turn off the power, I forget everything instantly.", a: ["RAM", "Memory"], hint: "Random Access..." },
  { q: "I only know two words: 'Yes' and 'No' (0 and 1). Yet, I can create virtual worlds.", a: ["Binary"], hint: "Base 2." },
  { q: "Every computer on the internet has one. I look like 192.168.0.1.", a: ["IP", "IP Address"], hint: "Internet Protocol." },
  { q: "I run the same code over and over again until a condition is met. What am I?", a: ["Loop", "For Loop", "While Loop"], hint: "Iteration." },
  { q: "I have a name and I hold a value. You can change what's inside me anytime.", a: ["Variable"], hint: "x = 10" },
  { q: "In C++ or Java, if you forget me at the end of a line, the code will crash.", a: ["Semicolon", ";"], hint: ";" },
  { q: "I am a block of code designed to do one specific job. You 'call' me to work.", a: ["Function", "Method"], hint: "def myCode():" },
  { q: "I store a list of items in strict order. You find items by index.", a: ["Array", "List", "Vector"], hint: "[0, 1, 2]" },
  { q: "I am a tiny mistake in your code that causes big problems. Named after an insect.", a: ["Bug"], hint: "🐛" },
  { q: "You type me to enter your account. Never share me with your best friend.", a: ["Password"], hint: "*******" },
  { q: "When you have an error, you search for me on Google. A site where devs help devs.", a: ["Stack Overflow"], hint: "Copy paste source." },
  { q: "I stand between your computer and the internet, blocking hackers.", a: ["Firewall"], hint: "Security wall." },
  { q: "Programmers love me because I turn the bright white screen into black.", a: ["Dark Mode", "Dark Theme"], hint: "Eye saver." },
  { q: "I store your files 'up there', accessible from anywhere. Not on your hard drive.", a: ["Cloud"], hint: "☁️" },
  { q: "What is 10 modulo 3?", a: ["1", "One"], hint: "Remainder of 10 / 3." },
  { q: "Evaluate: 5 XOR 5?", a: ["0", "Zero"], hint: "Bitwise XOR of same numbers is 0." },
  { q: "What is 0! (Zero Factorial)?", a: ["1", "One"], hint: "It is NOT zero." },
  { q: "Binary '101' in Decimal?", a: ["5", "Five"], hint: "4 + 0 + 1." },
  { q: "Total subsets of a set with 3 elements?", a: ["8", "Eight"], hint: "Formula: 2^n." },
  { q: "What is the Greatest Common Divisor (GCD) of 8 and 12?", a: ["4", "Four"], hint: "Highest number that divides both." },
  { q: "Base 8 number system is called?", a: ["Octal"], hint: "Octopus has 8 legs." },
  { q: "Integer result of 7 / 2 in C++?", a: ["3", "Three"], hint: "It ignores the decimal part (.5)." },
  { q: "The next prime number after 7?", a: ["11", "Eleven"], hint: "Not 9." },
  { q: "How many ways can you arrange the letters 'ABC'?", a: ["6", "Six"], hint: "3 Factorial (3 x 2 x 1)." },
  { q: "Hexadecimal 'A' equals which decimal number?", a: ["10", "Ten"], hint: "Digits go 0-9, then A-F." },
  { q: "Evaluate: 1 << 3 (Left Shift)", a: ["8", "Eight"], hint: "Multiplies by 2 three times (1->2->4->8)." },
  { q: "Minimum edges to connect 5 nodes?", a: ["4", "Four"], hint: "N - 1." },
  { q: "Log base 2 of 16?", a: ["4", "Four"], hint: "2 to the power of what is 16?" },
  { q: "The smallest perfect number?", a: ["6", "Six"], hint: "1 + 2 + 3 = 6." },
  { q: "15 modulo 4?", a: ["3", "Three"], hint: "15 = 4*3 + ?" },
  { q: "If A=True and B=False, what is A AND B?", a: ["False", "0"], hint: "Both must be true." },
  { q: "Square root of 256?", a: ["16", "Sixteen"], hint: "2^8 = 256." },
  { q: "Sum of binary 1 + 1?", a: ["10", "Ten"], hint: "In binary, 2 is written as..." },
  { q: "How many bits in 2 Bytes?", a: ["16", "Sixteen"], hint: "8 x 2." }
];

const MainGame = () => {
  const [activeTab, setActiveTab] = useState('guess'); // 'guess' or 'riddle'

  return (
    <div className="min-h-screen bg-slate-900 text-cyan-400 font-mono p-4 md:p-6 flex flex-col items-center justify-center relative overflow-hidden selection:bg-cyan-500 selection:text-white">
      
      {}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute w-[600px] h-[600px] opacity-[0.10]">
            <img src={logo} alt="Background Logo" className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-10 left-10 text-[10rem] md:text-[15rem] font-black leading-none opacity-5 select-none">01</div>
        <div className="absolute bottom-10 right-10 text-[10rem] md:text-[15rem] font-black leading-none opacity-5 select-none">00</div>
        <div className="absolute w-[1000px] h-[1000px] bg-cyan-900 rounded-full blur-[200px] opacity-20"></div>
      </div>

      {/* HEADER WITH NAVIGATION */}
      <div className="z-20 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-cyan-900/50 border-2 border-cyan-500 overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                   <img src={logo} alt="Club Logo" className="w-full h-full object-cover" /> 
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-black tracking-widest text-white">AUST PIC</h1>
                    <p className="text-xs md:text-sm text-cyan-600 font-bold tracking-[0.2em]">SYSTEM_OS v2.0</p>
                </div>
          </div>

          {/* TAB BUTTONS */}
          <div className="flex bg-slate-800/80 p-1 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
             <button 
                onClick={() => setActiveTab('guess')}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-md font-bold transition-all ${activeTab === 'guess' ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:text-white'}`}
             >
                <Lock size={16} /> NUMBER HACK
             </button>
             <button 
                onClick={() => setActiveTab('riddle')}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-md font-bold transition-all ${activeTab === 'riddle' ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'text-slate-400 hover:text-white'}`}
             >
                <Brain size={16} /> BRAIN TEASER
             </button>
          </div>
      </div>

      {/* CONTENT AREA */}
      <AnimatePresence mode='wait'>
        {activeTab === 'guess' ? (
            <GuessGame key="guess" />
        ) : (
            <RiddleGame key="riddle" />
        )}
      </AnimatePresence>

      <div className="mt-8 text-slate-500 text-xs font-bold text-center tracking-widest uppercase z-10">
        <p>AUST Programming and Informatics Club © 2026</p>
      </div>

    </div>
  );
};

const GuessGame = () => {
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState("SYSTEM INITIALIZED...");
  const [attempts, setAttempts] = useState(5);
  const [history, setHistory] = useState([]);
  const [gameState, setGameState] = useState('playing'); 
  const [isShake, setIsShake] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMessage("ENTER PASSCODE TO HACK"), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (gameState !== 'playing' || !guess) return;

    const num = parseInt(guess);
    if (isNaN(num)) { setMessage("ERROR: NaN DETECTED."); return; }

    const newHistory = [...history, num];
    setHistory(newHistory);
    
    if (num === targetNumber) {
      setGameState('won'); setMessage(`ACCESS GRANTED. CODE: ${targetNumber}`);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#06b6d4', '#ffffff'] });
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts); setGuess(''); setIsShake(true); setTimeout(() => setIsShake(false), 500);

      if (newAttempts === 0) {
        setGameState('lost'); setMessage(`SYSTEM LOCKED. CODE WAS: ${targetNumber}`);
      } else {
        const diff = Math.abs(targetNumber - num);
        let roast = diff > 40 ? "WAY OFF!" : diff > 20 ? "WRONG SECTOR." : diff > 10 ? "CLOSE..." : "EXTREMELY CLOSE!";
        setMessage(`${roast} GO ${num < targetNumber ? "HIGHER ▲" : "LOWER ▼"}`);
      }
    }
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(5); setHistory([]); setMessage("SYSTEM REBOOTED."); setGameState('playing'); setGuess('');
  };

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className={`z-10 w-full max-w-4xl bg-slate-800/90 backdrop-blur-xl border-2 ${isShake ? 'border-red-500' : 'border-cyan-500/50'} rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden`}
    >
        {/* OLD HEADER DESIGN */}
        <div className="bg-slate-950 p-6 border-b-2 border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-cyan-900/50 flex items-center justify-center border-2 border-cyan-500 overflow-hidden">
                   <img src={logo} alt="Club Logo" className="w-full h-full object-cover" /> 
                </div>
                <div>
                    <h1 className="text-4xl font-black tracking-widest text-white">AUST PIC</h1>
                    <p className="text-lg text-red-500 font-bold animate-pulse flex items-center gap-2">
                        <ShieldAlert size={18} /> Protocol: GUESS_OR_REGRET
                    </p>
                </div>
            </div>
            <div className="hidden md:flex flex-col items-end">
                <span className="text-slate-400 text-sm uppercase tracking-widest">Target Range</span>
                <span className="text-3xl font-bold text-white bg-slate-800 px-4 py-1 rounded border border-cyan-500/30">01 - 100</span>
            </div>
        </div>

        {/* SCREEN */}
        <div className="p-10 min-h-[250px] flex flex-col justify-center bg-black/60 border-b-2 border-cyan-500/20 relative">
             <p className={`text-3xl md:text-5xl font-bold leading-tight text-center ${gameState === 'lost' ? 'text-red-500' : gameState === 'won' ? 'text-green-400' : 'text-cyan-300'}`}>
                {message}
             </p>
        </div>

        {/* STATS BAR (BATTERY) */}
        <div className="grid grid-cols-2 gap-px bg-cyan-500/30">
            <div className="bg-slate-900 p-6 flex flex-col items-center">
                <span className="text-sm text-slate-400 uppercase tracking-widest mb-2">Attempts Remaining</span>
                <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-8 h-16 rounded-sm transition-all ${i < attempts ? 'bg-cyan-400 shadow-[0_0_15px_cyan]' : 'bg-slate-800 opacity-30'}`} />
                    ))}
                </div>
            </div>
            <div className="bg-slate-900 p-6 flex flex-col items-center justify-center">
                <span className="text-sm text-slate-400 uppercase tracking-widest mb-2">Risk Level</span>
                <div className="text-3xl font-black text-red-500 flex items-center gap-3"><Lock size={32} /> EXTREME</div>
            </div>
        </div>

        {/* INPUT */}
        <div className="p-10 bg-slate-800">
            {gameState === 'playing' ? (
                <form onSubmit={handleGuess} className="relative">
                    <Cpu className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-600" size={32} />
                    <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="ENTER CODE (01-100)" autoFocus
                        className="w-full bg-slate-900 border-2 border-cyan-500/50 rounded-xl py-8 pl-20 pr-20 text-white text-4xl font-bold tracking-widest focus:ring-4 focus:ring-cyan-500/20 outline-none" />
                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-white"><Send size={32}/></button>
                </form>
            ) : (
                <button onClick={resetGame} className={`w-full py-8 rounded-xl font-black text-3xl flex items-center justify-center gap-4 ${gameState === 'won' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                    <RotateCcw size={32} /> {gameState === 'won' ? 'HACK NEXT TARGET' : 'RETRY PROTOCOL'}
                </button>
            )}
            <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
                <span className="text-slate-500 text-sm font-bold block mb-2">HISTORY:</span>
                {history.map((h, i) => <span key={i} className="text-cyan-400 font-mono text-2xl font-bold bg-slate-900 px-3 py-1 rounded border border-cyan-900">[{h}]</span>)}
            </div>
        </div>
    </motion.div>
  );
};


const RiddleGame = () => {
    const [qIndex, setQIndex] = useState(0);
    const [input, setInput] = useState("");
    const [status, setStatus] = useState("thinking"); // thinking, correct, failed
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [shuffledQuestions] = useState(() => [...RIDDLES].sort(() => 0.5 - Math.random()));

    const currentQ = shuffledQuestions[qIndex];

    const handleAnswer = (e) => {
        e.preventDefault();
        if (status !== 'thinking') return;

        const cleanInput = input.trim().toLowerCase();
        const isCorrect = currentQ.a.some(ans => ans.toLowerCase() === cleanInput);
        
        if (isCorrect) {
            setStatus("correct");
            confetti({ particleCount: 100, spread: 60, origin: { y: 0.7 }, colors: ['#a855f7', '#ffffff'] });
        } else {
            const newAttempts = attemptsLeft - 1;
            setAttemptsLeft(newAttempts);
            setInput(""); 
            if (newAttempts === 0) {
                setStatus("failed");
            }
        }
    };

    const nextQuestion = () => {
        setQIndex((prev) => (prev + 1) % shuffledQuestions.length);
        setStatus("thinking");
        setAttemptsLeft(3); // Reset attempts
        setInput("");
    };

    return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          className="z-10 w-full max-w-4xl bg-slate-800/90 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden"
        >
            <div className="bg-slate-950 p-6 border-b border-purple-500/30 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <span className="text-purple-400 font-bold animate-pulse flex gap-2 items-center text-xl"><Brain /> NEURAL_LINK_TEST</span>
                </div>
                <div className="flex flex-col items-end">
                     <span className="text-slate-400 font-mono text-xs uppercase">Progress</span>
                     <span className="text-purple-300 font-bold">{qIndex + 1}/{shuffledQuestions.length}</span>
                </div>
            </div>

            {/* Question Display */}
            <div className="p-10 min-h-[250px] flex flex-col items-center justify-center bg-black/40 border-b border-purple-500/20 text-center relative">
                <p className="text-2xl md:text-4xl font-bold text-white leading-relaxed">"{currentQ.q}"</p>
                
                {/* ATTEMPTS INDICATOR */}
                {status === 'thinking' && (
                    <div className="absolute bottom-4 flex items-center gap-2">
                        <span className="text-slate-500 text-xs font-bold uppercase">Attempts Left:</span>
                        {[...Array(3)].map((_, i) => (
                             <div key={i} className={`w-3 h-3 rounded-full ${i < attemptsLeft ? 'bg-red-500' : 'bg-slate-800'}`} />
                        ))}
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-10 bg-slate-800">
                {status === 'correct' ? (
                    <div className="text-center">
                        <h3 className="text-4xl font-black text-green-400 mb-2">CORRECT!</h3>
                        <p className="text-slate-400 mb-6">Answer: {currentQ.a[0]}</p>
                        <button onClick={nextQuestion} className="w-full py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-2xl flex items-center justify-center gap-2 transition-all">
                            NEXT CHALLENGE <ArrowRight />
                        </button>
                    </div>
                ) : status === 'failed' ? (
                     <div className="text-center">
                        <h3 className="text-4xl font-black text-red-500 mb-2">FAILED</h3>
                        <p className="text-white text-xl mb-6">Correct Answer: <span className="text-purple-300 font-bold">{currentQ.a[0]}</span></p>
                        <button onClick={nextQuestion} className="w-full py-6 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-2xl flex items-center justify-center gap-2 transition-all">
                            NEXT QUESTION <ArrowRight />
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleAnswer} className="relative">
                        <Terminal className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-500" size={32} />
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            placeholder="TYPE ANSWER..." 
                            autoFocus
                            className={`w-full bg-slate-900 border-2 ${attemptsLeft < 3 ? 'border-red-500' : 'border-purple-500/50'} rounded-xl py-8 pl-20 pr-20 text-white text-3xl font-bold tracking-wide focus:ring-4 focus:ring-purple-500/20 outline-none transition-all`} 
                        />
                        <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white">
                            <Zap size={32} />
                        </button>
                    </form>
                )}
                
                {/* HINT SHOWS ON LAST ATTEMPT */}
                {status === 'thinking' && attemptsLeft === 1 && (
                     <p className="text-center text-yellow-400 font-bold mt-4 animate-bounce">💡 HINT: {currentQ.hint}</p>
                )}
            </div>
        </motion.div>
    );
};

export default MainGame;