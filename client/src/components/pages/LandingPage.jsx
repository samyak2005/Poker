import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faUsers, faTrophy, faCrown, faFire, faRocket } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate("/multiplayer-lobby");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
            {/* ChipInn Border Loop */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Border - ChipInn repeated */}
                <div className="absolute top-2 left-0 right-0 flex justify-center items-center">
                    <div className="flex space-x-8 text-white/30 text-sm font-bold tracking-wider">
                    <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        
                    </div>
                </div>
                
                {/* Bottom Border - ChipInn repeated */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center">
                    <div className="flex space-x-8 text-white/30 text-sm font-bold tracking-wider">
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                        <span>CHIPINN</span>
                    </div>
                </div>
                
                {/* Left Border - ChipInn repeated vertically */}
                <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between items-center py-8">
                    <div className="flex flex-col space-y-16 text-white/30 text-xs font-bold tracking-wider">
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                        <span className="transform -rotate-90">CHIPINN</span>
                    </div>
                </div>
                
                {/* Right Border - ChipInn repeated vertically */}
                <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-between items-center py-8">
                    <div className="flex flex-col space-y-16 text-white/30 text-xs font-bold tracking-wider">
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                        <span className="transform rotate-90">CHIPINN</span>
                    </div>
                </div>
            </div>
            
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-bounce"></div>
                <div className="absolute top-0 right-4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-bounce"></div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="mb-4">
                        <img 
                            src="chipinn-text.png" 
                            alt="ChipInn Poker" 
                            className="w-96 h-auto mx-auto mb-3 drop-shadow-2xl animate-pulse hover:scale-105 transition-transform duration-300 filter brightness-110 contrast-125"
                            draggable="false"
                        />
                    </div>
                    
                    {/* Subtitle */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-2xl">🃏</span>
                        <h2 className="text-2xl font-semibold text-white/70">
                            Texas Hold'em
                        </h2>
                        <span className="text-2xl">🔥</span>
                    </div>
                    
                    <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
                        The <span className="text-yellow-300 font-bold">HOTTEST</span> multiplayer poker experience! 
                        <br />
                        <span className="text-base text-white/70">No downloads, no waiting, just pure poker vibes ✨</span>
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center max-w-4xl">
                    <div className="bg-gradient-to-br from-purple-500/40 to-pink-500/40 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/40 hover:scale-110 transition-transform duration-300 shadow-xl">
                        <div className="text-3xl font-black text-white mb-1">7</div>
                        <div className="text-white/90 font-bold text-sm">Players Max</div>
                        <div className="text-white/60 text-xs">Full Table</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/40 to-cyan-500/40 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/40 hover:scale-110 transition-transform duration-300 shadow-xl">
                        <div className="text-3xl font-black text-white mb-1">⚡</div>
                        <div className="text-white/90 font-bold text-sm">Real-time</div>
                        <div className="text-white/60 text-xs">Instant Play</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/40 to-orange-500/40 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/40 hover:scale-110 transition-transform duration-300 shadow-xl">
                        <div className="text-3xl font-black text-white mb-1">🎯</div>
                        <div className="text-white/90 font-bold text-sm">Pro AI</div>
                        <div className="text-white/60 text-xs">Smart Logic</div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl">
                    <div className="text-center p-6 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-2xl backdrop-blur-md border border-white/40 hover:scale-110 transition-transform duration-300 shadow-lg">
                        <div className="text-4xl mb-3">👥</div>
                        <h3 className="text-xl font-bold text-white mb-2">Squad Up</h3>
                        <p className="text-white/80 text-sm">Gather your crew and dominate the table together</p>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-500/30 to-orange-600/30 rounded-2xl backdrop-blur-md border border-white/40 hover:scale-110 transition-transform duration-300 shadow-lg">
                        <div className="text-4xl mb-3">🏆</div>
                        <h3 className="text-xl font-bold text-white mb-2">Tournament Mode</h3>
                        <p className="text-white/80 text-sm">Advanced hand evaluation that's actually fair</p>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 rounded-2xl backdrop-blur-md border border-white/40 hover:scale-110 transition-transform duration-300 shadow-lg">
                        <div className="text-4xl mb-3">✨</div>
                        <h3 className="text-xl font-bold text-white mb-2">Aesthetic AF</h3>
                        <p className="text-white/80 text-sm">Beautiful themes that actually look good</p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <button
                        onClick={handleStartGame}
                        className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white text-2xl font-black rounded-full hover:from-pink-600 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 shadow-2xl border-2 border-white/40 hover:border-white/60"
                    >
                        <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                        LET'S GOOO!
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">🔥</span>
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    <p className="text-white/70 mt-4 text-base font-medium">
                        Join a room or create your own • No signup required • 100% free
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;