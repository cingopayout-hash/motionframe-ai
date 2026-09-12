import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, Video, Sparkles, User, Image, Plus, Trash2, 
  Copy, Layers, Film, Download, Settings, ChevronRight, Wand2, Camera, 
  Zap, MoveRight, HelpCircle, Check, Clapperboard, MonitorPlay, ArrowLeft
} from 'lucide-react';

interface Character {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
}

interface Scene {
  id: string;
  prompt: string;
  duration: number;
  camera: string;
  motion: string;
  characterId?: string;
  status: 'ready' | 'generating' | 'completed';
}

export default function App() {
  const [view, setView] = useState<'landing' | 'studio'>('landing');
  const [creationMode, setCreationMode] = useState<'text' | 'image' | 'character'>('text');
  
  // Character System
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: 'char-1',
      name: 'Alex',
      description: 'Young man with black hair wearing a black hoodie and futuristic cyberpunk jacket.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
    }
  ]);
  const [selectedCharId, setSelectedCharId] = useState<string>('char-1');
  const [isCharModalOpen, setIsCharModalOpen] = useState(false);
  const [newCharName, setNewCharName] = useState('');
  const [newCharDesc, setNewCharDesc] = useState('');

  // Scenes & Timeline
  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: 'scene-1',
      prompt: 'Alex walks through a futuristic neon city at night while light rain falls around him. The camera slowly zooms in.',
      duration: 5,
      camera: 'Zoom In',
      motion: 'Normal',
      characterId: 'char-1',
      status: 'completed'
    },
    {
      id: 'scene-2',
      prompt: 'Alex stops, looks up at a holographic billboard beaming bright pink lights. Raindrops reflect off his visor.',
      duration: 5,
      camera: 'Tracking Shot',
      motion: 'Slow',
      characterId: 'char-1',
      status: 'ready'
    }
  ]);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Settings
  const [style, setStyle] = useState('Cinematic');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');

  // Preview Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genStep, setGenStep] = useState('');

  const currentScene = scenes[activeSceneIndex] || scenes[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenProgress(10);
    setGenStep('Analyzing prompt and character anchors...');

    setTimeout(() => {
      setGenProgress(40);
      setGenStep('Generating visual consistency keyframes...');
    }, 1200);

    setTimeout(() => {
      setGenProgress(75);
      setGenStep('Applying camera path movement & rendering AI frames...');
    }, 2500);

    setTimeout(() => {
      setGenProgress(100);
      setIsGenerating(false);
      setScenes(prev => prev.map((s, idx) => idx === activeSceneIndex ? { ...s, status: 'completed' } : s));
    }, 3800);
  };

  const handleAddCharacter = () => {
    if (!newCharName) return;
    const newChar: Character = {
      id: `char-${Date.now()}`,
      name: newCharName,
      description: newCharDesc || 'Custom character',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
    };
    setCharacters([...characters, newChar]);
    setSelectedCharId(newChar.id);
    setNewCharName('');
    setNewCharDesc('');
    setIsCharModalOpen(false);
  };

  const handleAddScene = () => {
    const newScene: Scene = {
      id: `scene-${Date.now()}`,
      prompt: 'New scene animation prompt...',
      duration: 5,
      camera: 'Static',
      motion: 'Normal',
      characterId: selectedCharId,
      status: 'ready'
    };
    setScenes([...scenes, newScene]);
    setActiveSceneIndex(scenes.length);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* LANDING PAGE VIEW */}
      {view === 'landing' ? (
        <div className="flex-1 flex flex-col justify-between items-center relative overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[250px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

          {/* Header Navigation */}
          <header className="w-full max-w-7xl px-6 py-6 flex justify-between items-center z-10">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="p-2 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl shadow-lg shadow-purple-500/20">
                <Clapperboard className="w-5 h-5 text-white" />
              </div>
              <span>MotionFrame<span className="text-purple-400">.AI</span></span>
            </div>
            <button 
              onClick={() => setView('studio')}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition flex items-center gap-2 backdrop-blur-md"
            >
              Open Studio
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </button>
          </header>

          {/* Hero Section */}
          <main className="w-full max-w-5xl px-6 py-12 flex flex-col items-center text-center z-10 my-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-semibold text-purple-300 mb-8 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation AI Video Creator</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
              Bring Your Characters to Life.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
              Create animated stories, scenes, and short videos with AI. Use your own characters or create something completely new in seconds.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
              <button 
                onClick={() => setView('studio')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 rounded-2xl font-semibold text-white shadow-xl shadow-purple-600/25 transition transform active:scale-95 flex items-center gap-3 text-base"
              >
                <Sparkles className="w-5 h-5" />
                Create Animation
              </button>
              <button 
                onClick={() => setView('studio')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-semibold text-slate-300 transition flex items-center gap-2 text-base backdrop-blur-md"
              >
                <MonitorPlay className="w-5 h-5 text-slate-400" />
                Explore Examples
              </button>
            </div>

            {/* Hero Cinematic Card Preview */}
            <div className="mt-16 w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-xl relative group">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden relative bg-slate-950 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80" 
                  alt="Cinematic Preview" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 text-left max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-purple-600/80 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase rounded-md text-white">Cinematic Anime</span>
                    <span className="text-xs text-slate-400">9:16 Vertical • 1080p</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Cyberpunk Rain Encounter</h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-1">"Alex walks through neon-lit futuristic Tokyo at midnight..."</p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition duration-300">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="w-full max-w-7xl px-6 py-6 border-t border-white/5 text-center text-xs text-slate-500 z-10">
            © 2026 MotionFrame AI. Built for short-form creators on TikTok, Reels, and YouTube Shorts.
          </footer>
        </div>
      ) : (
        /* MAIN STUDIO WORKSPACE */
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Top Bar */}
          <header className="h-14 border-b border-white/10 px-4 flex items-center justify-between bg-[#0e0f14]">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setView('landing')}
                className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 font-bold text-base">
                <div className="p-1.5 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-lg">
                  <Clapperboard className="w-4 h-4 text-white" />
                </div>
                <span>MotionFrame<span className="text-purple-400">.AI</span></span>
              </div>
              <span className="text-xs text-slate-600">/</span>
              <span className="text-xs text-slate-400 font-medium">Cyberpunk Short Story</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-2 border border-white/10">
                <Download className="w-3.5 h-3.5" />
                Export Video
              </button>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 rounded-lg text-xs font-semibold text-white shadow-lg shadow-purple-600/20 flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isGenerating ? 'Generating...' : 'Generate Scene'}
              </button>
            </div>
          </header>

          {/* Main Studio Split Layout */}
          <div className="flex-1 flex overflow-hidden">
            {/* Minimal Left Sidebar */}
            <aside className="w-16 border-r border-white/10 bg-[#0c0d12] flex flex-col items-center py-4 gap-6">
              <button className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30" title="Create">
                <Wand2 className="w-5 h-5" />
              </button>
              <button onClick={() => setIsCharModalOpen(true)} className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition" title="Characters">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition" title="Projects">
                <Film className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition" title="Settings">
                <Settings className="w-5 h-5" />
              </button>
            </aside>

            {/* Main Creation Config & Editor */}
            <div className="w-[420px] border-r border-white/10 bg-[#0e0f14] flex flex-col overflow-y-auto p-5 gap-6">
              {/* Creation Mode Switcher */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Creation Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'text', icon: Wand2, label: 'Text' },
                    { id: 'image', icon: Image, label: 'Image' },
                    { id: 'character', icon: User, label: 'Character' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setCreationMode(mode.id as any)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition text-xs font-medium ${
                        creationMode === mode.id 
                          ? 'bg-purple-600/15 border-purple-500/50 text-purple-300' 
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <mode.icon className="w-4 h-4" />
                      <span>{mode.label} → Anim</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Character Selector Card */}
              <div className="p-4 bg-slate-900/60 border border-white/10 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    Selected Character
                  </span>
                  <button 
                    onClick={() => setIsCharModalOpen(true)}
                    className="text-[11px] text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    New Character
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <img 
                    src={characters.find(c => c.id === selectedCharId)?.avatarUrl} 
                    alt="Character" 
                    className="w-12 h-12 rounded-xl object-cover border border-purple-500/30"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {characters.find(c => c.id === selectedCharId)?.name}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">
                      {characters.find(c => c.id === selectedCharId)?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Animation Prompt Box */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                  Animation Prompt
                </label>
                <textarea 
                  value={currentScene.prompt}
                  onChange={(e) => {
                    const val = e.target.value;
                    setScenes(prev => prev.map((s, idx) => idx === activeSceneIndex ? { ...s, prompt: val } : s));
                  }}
                  rows={4}
                  placeholder="Describe what should happen in this scene..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition resize-none leading-relaxed"
                />
              </div>

              {/* Animation Style */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Visual Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Cinematic', 'Anime', '3D Render', 'Cartoon', 'Ghibli-inspired', 'Comic Book'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium text-left transition ${
                        style === s 
                          ? 'bg-purple-600/20 border-purple-500/50 text-purple-200' 
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motion & Camera Controls */}
              <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Motion Controls</label>
                
                <div>
                  <span className="text-[11px] text-slate-500 mb-1.5 block">Camera Movement</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Static', 'Zoom In', 'Zoom Out', 'Pan Left', 'Pan Right', 'Tracking Shot'].map((cam) => (
                      <button
                        key={cam}
                        onClick={() => {
                          setScenes(prev => prev.map((s, idx) => idx === activeSceneIndex ? { ...s, camera: cam } : s));
                        }}
                        className={`py-1.5 px-2 rounded-md border text-[11px] font-medium transition text-center truncate ${
                          currentScene.camera === cam 
                            ? 'bg-purple-600/20 border-purple-500/50 text-purple-200' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        {cam}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 mb-1.5 block">Motion Speed</span>
                    <select 
                      value={currentScene.motion}
                      onChange={(e) => {
                        const val = e.target.value;
                        setScenes(prev => prev.map((s, idx) => idx === activeSceneIndex ? { ...s, motion: val } : s));
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-slate-300 focus:outline-none"
                    >
                      <option value="Slow">Slow Motion</option>
                      <option value="Normal">Normal Speed</option>
                      <option value="Fast">Fast Dynamic</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-500 mb-1.5 block">Aspect Ratio</span>
                    <select 
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value as any)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-slate-300 focus:outline-none"
                    >
                      <option value="9:16">9:16 (Shorts/Reels)</option>
                      <option value="16:9">16:9 (Landscape)</option>
                      <option value="1:1">1:1 (Square)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Preview Player & Storyboard Timeline */}
            <div className="flex-1 bg-[#08080a] flex flex-col justify-between p-6 relative overflow-hidden">
              {/* Top Aspect Ratio Indicator */}
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-purple-400" />
                  Live Motion Canvas
                </span>
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px]">
                  {aspectRatio} • {style}
                </span>
              </div>

              {/* Main Canvas Preview Player */}
              <div className="flex-1 flex items-center justify-center py-4">
                <div 
                  className={`relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl transition-all duration-300 flex items-center justify-center ${
                    aspectRatio === '9:16' ? 'aspect-[9/16] h-full max-h-[520px]' : 
                    aspectRatio === '16:9' ? 'aspect-[16/9] w-full max-w-[700px]' : 
                    'aspect-square h-full max-h-[500px]'
                  }`}
                >
                  {isGenerating ? (
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
                      <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin mb-4" />
                      <h4 className="text-sm font-semibold text-white mb-1">{genStep}</h4>
                      <p className="text-xs text-slate-400 mb-4">Scene {activeSceneIndex + 1} of {scenes.length}</p>
                      
                      <div className="w-48 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300" 
                          style={{ width: `${genProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : null}

                  <img 
                    src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80" 
                    alt="Scene Preview"
                    className={`w-full h-full object-cover ${isPlaying ? 'scale-105 transition duration-5000' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Play Controls Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <span className="font-mono text-slate-300 text-[11px]">00:02 / 00:05</span>
                  </div>
                </div>
              </div>

              {/* Bottom Storyboard Timeline */}
              <div className="p-4 bg-[#0e0f14] border border-white/10 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-purple-400" />
                    Story Scenes ({scenes.length})
                  </span>
                  <button 
                    onClick={handleAddScene}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Scene
                  </button>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {scenes.map((sc, idx) => (
                    <div 
                      key={sc.id}
                      onClick={() => setActiveSceneIndex(idx)}
                      className={`min-w-[140px] p-2.5 rounded-xl border cursor-pointer transition flex flex-col gap-1.5 relative ${
                        activeSceneIndex === idx 
                          ? 'bg-purple-600/15 border-purple-500/60 ring-1 ring-purple-500/40' 
                          : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span>Scene {idx + 1}</span>
                        <span>{sc.duration}s</span>
                      </div>
                      <p className="text-xs text-slate-200 line-clamp-1 font-medium">{sc.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Character */}
      {isCharModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6">
            <h3 className="text-base font-bold text-white mb-4">Create New AI Character</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Character Name</label>
                <input 
                  type="text" 
                  value={newCharName}
                  onChange={(e) => setNewCharName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Visual Description</label>
                <textarea 
                  value={newCharDesc}
                  onChange={(e) => setNewCharDesc(e.target.value)}
                  placeholder="Young man with black hair, wearing black hoodie..."
                  rows={3}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button 
                onClick={() => setIsCharModalOpen(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium text-slate-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddCharacter}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-semibold text-white"
              >
                Save Character
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}