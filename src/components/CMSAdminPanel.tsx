import React, { useState } from "react";
import { PerformanceEvent } from "../types";
import { X, Sliders, Palette, PenTool, Plus, Trash2, CheckCircle, RotateCcw, Image as ImageIcon, Upload } from "lucide-react";

interface CMSAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  setBrandName: (name: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  events: PerformanceEvent[];
  setEvents: (events: PerformanceEvent[]) => void;
  homeProfileImage: string;
  setHomeProfileImage: (url: string) => void;
  aboutProfileImage: string;
  setAboutProfileImage: (url: string) => void;
  heroBgImage: string;
  setHeroBgImage: (url: string) => void;
}

const COLOR_PRESETS = [
  { name: "Royal Purple", hex: "#8B5CF6" },
  { name: "Noble Rose", hex: "#f43f5e" },
  { name: "Ocean Cyan", hex: "#06b6d4" },
  { name: "Classic Gold", hex: "#d97706" }
];

export default function CMSAdminPanel({
  isOpen,
  onClose,
  brandName,
  setBrandName,
  accentColor,
  setAccentColor,
  events,
  setEvents,
  homeProfileImage,
  setHomeProfileImage,
  aboutProfileImage,
  setAboutProfileImage,
  heroBgImage,
  setHeroBgImage
}: CMSAdminPanelProps) {
  const [newDate, setNewDate] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newVenue, setNewVenue] = useState("");
  const [newRole, setNewRole] = useState("Guest Soloist");
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState("");

  if (!isOpen) return null;

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newTitle || !newVenue) return;

    const newEvent: PerformanceEvent = {
      date: newDate,
      title: newTitle,
      venue: newVenue,
      details: newRole
    };

    setEvents([newEvent, ...events]);
    setNewDate("");
    setNewTitle("");
    setNewVenue("");
    setNewRole("Guest Soloist");

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleDeleteEvent = (index: number) => {
    const updated = events.filter((_, i) => i !== index);
    setEvents(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "home" | "about") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFeedback(`Optimizing ${target} image...`);

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const result = readerEvent.target?.result;
      if (typeof result !== "string") return;

      const img = new Image();
      img.onload = () => {
        // We will resize the image to a maximum width/height of 800px to guarantee excellent performance and save local storage space
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 800;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress with quality 0.75 as JPEG
          const optimizedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
          
          try {
            if (target === "home") {
              setHomeProfileImage(optimizedDataUrl);
            } else {
              setAboutProfileImage(optimizedDataUrl);
            }
            setUploadFeedback(`Success: ${target} image updated!`);
          } catch (storageErr) {
            console.error(storageErr);
            setUploadFeedback("Storage quota full. Try a smaller image or reset presets.");
          }
        } else {
          try {
            if (target === "home") {
              setHomeProfileImage(result);
            } else {
              setAboutProfileImage(result);
            }
            setUploadFeedback(`Success: ${target} image uploaded!`);
          } catch (storageErr) {
            setUploadFeedback("Storage quota full. Try a smaller image or reset presets.");
          }
        }
        setTimeout(() => setUploadFeedback(""), 4000);
      };
      img.onerror = () => {
        setUploadFeedback("Error: Unsupported image file format.");
        setTimeout(() => setUploadFeedback(""), 4000);
      };
      img.src = result;
    };
    reader.onerror = () => {
      setUploadFeedback("Error: Failed to read file.");
      setTimeout(() => setUploadFeedback(""), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setBrandName("SANGMI KIM");
    setAccentColor("#8B5CF6");
    setHomeProfileImage("https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800");
    setAboutProfileImage("https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800");
    setHeroBgImage("https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=1600");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#121216] border border-purple-900/60 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden text-slate-100">
        
        {/* Decorative background radial glows */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-900/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-900/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="p-6 border-b border-purple-950/50 flex items-center justify-between relative z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">Interactive CMS Dashboard</h3>
              <p className="text-[10px] text-gray-400 font-light">Modify page copy, brand theme & live concerts in real-time</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form area (scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs md:text-sm relative z-10 flex-1">
          
          {/* Section 1: Color Theme */}
          <div className="space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2 text-xs uppercase tracking-wider text-purple-300">
              <Palette className="w-4 h-4" />
              1. Color Accent Configuration
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.hex}
                  onClick={() => setAccentColor(preset.hex)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-purple-950/40 bg-[#08080a] hover:border-purple-800 transition"
                  style={{ borderColor: accentColor === preset.hex ? accentColor : undefined }}
                >
                  <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: preset.hex }} />
                  <span className="text-[10px] font-semibold text-slate-300">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Edit Brand Name */}
          <div className="space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2 text-xs uppercase tracking-wider text-purple-300">
              <PenTool className="w-4 h-4" />
              2. Edit Page Copy (Live Binder)
            </h4>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">Pianist Portfolio Title / Logo Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#08080a] text-white border border-purple-950/60 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                placeholder="e.g. SANGMI KIM"
              />
            </div>
          </div>

          {/* Section 2.5: Media Management */}
          <div className="space-y-4 p-4 bg-[#08080a] rounded-xl border border-purple-950/40">
            <h4 className="font-bold text-white flex items-center gap-2 text-xs uppercase tracking-wider text-purple-300">
              <ImageIcon className="w-4 h-4" />
              2.5 Media & Photography Hub
            </h4>
            
            {/* Home Page Portrait (Unsplash Default) */}
            <div className="space-y-2 border-b border-purple-950/40 pb-4">
              <p className="text-[10.5px] text-gray-300 bg-purple-950/20 p-3 rounded-lg border border-purple-900/30 leading-relaxed mb-3">
                <strong>📸 실제 사진 업로드 (Upload Your Photos):</strong><br />
                인공지능(AI)이 임의로 생성한 가짜 인물 사진 대신, <strong>본인의 실제 사진</strong>을 바로 사용하실 수 있습니다. 
                아래 <strong>"Choose File"</strong> 버튼을 누르거나 사용하고자 하는 사진 파일을 드래그하여 업로드하면 브라우저에 실시간 반영 및 안전하게 저장됩니다.<br />
                <span className="text-gray-400">To replace the default placeholder with your real portrait, click "Choose File" or drag and drop your image below. It will be saved securely to your browser storage.</span>
              </p>
              
              <label className="block text-[11px] text-gray-400 font-semibold uppercase tracking-wider text-purple-200">Home Page Portrait (Hero Section)</label>
              <div className="flex items-center gap-3">
                {homeProfileImage && (
                  <img
                    src={homeProfileImage}
                    alt="Home Profile Preview"
                    className="w-12 h-16 object-cover rounded-lg border border-purple-900/40"
                  />
                )}
                <div className="flex-1">
                  <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-purple-950 hover:border-purple-800 rounded-xl cursor-pointer bg-[#121216]/50 hover:bg-[#121216] transition text-xs text-purple-300 font-semibold">
                    <Upload className="w-4 h-4" />
                    <span>Choose File or Drag Here</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "home")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={homeProfileImage.startsWith("data:") ? "" : homeProfileImage}
                  onChange={(e) => setHomeProfileImage(e.target.value)}
                  placeholder="Paste Custom Image Link"
                  className="flex-1 bg-[#121216] text-white border border-purple-950/60 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                />
                {homeProfileImage && (
                  <button
                    type="button"
                    onClick={() => setHomeProfileImage("https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800")}
                    className="px-2 py-1 bg-rose-950/40 hover:bg-rose-950 border border-rose-900/40 hover:border-rose-800 text-rose-300 hover:text-white text-[10px] rounded transition font-medium whitespace-nowrap"
                  >
                    Reset to Placeholder
                  </button>
                )}
              </div>
            </div>

            {/* About Page Portrait (Unsplash Default) */}
            <div className="space-y-2 border-b border-purple-950/40 pb-4">
              <label className="block text-[11px] text-gray-400 font-semibold uppercase tracking-wider text-purple-200">About Page Portrait (Biography Section)</label>
              <div className="flex items-center gap-3">
                {aboutProfileImage && (
                  <img
                    src={aboutProfileImage}
                    alt="About Profile Preview"
                    className="w-12 h-16 object-cover rounded-lg border border-purple-900/40"
                  />
                )}
                <div className="flex-1">
                  <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-purple-950 hover:border-purple-800 rounded-xl cursor-pointer bg-[#121216]/50 hover:bg-[#121216] transition text-xs text-purple-300 font-semibold">
                    <Upload className="w-4 h-4" />
                    <span>Choose File or Drag Here</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "about")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aboutProfileImage.startsWith("data:") ? "" : aboutProfileImage}
                  onChange={(e) => setAboutProfileImage(e.target.value)}
                  placeholder="Paste Custom Image Link"
                  className="flex-1 bg-[#121216] text-white border border-purple-950/60 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                />
                {aboutProfileImage && (
                  <button
                    type="button"
                    onClick={() => setAboutProfileImage("https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800")}
                    className="px-2 py-1 bg-rose-950/40 hover:bg-rose-950 border border-rose-900/40 hover:border-rose-800 text-rose-300 hover:text-white text-[10px] rounded transition font-medium whitespace-nowrap"
                  >
                    Reset to Placeholder
                  </button>
                )}
              </div>
            </div>

            {/* Background Image */}
            <div className="space-y-2">
              <label className="block text-[11px] text-gray-400">Piano Keyboard Hero Background URL</label>
              <input
                type="text"
                value={heroBgImage}
                onChange={(e) => setHeroBgImage(e.target.value)}
                placeholder="Paste external background link here"
                className="w-full bg-[#121216] text-white border border-purple-950/60 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
              />
            </div>

            {uploadFeedback && (
              <p className="text-[10px] text-purple-400 mt-1 font-semibold text-center">{uploadFeedback}</p>
            )}
          </div>

          {/* Section 3: Concert Manager */}
          <div className="space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2 text-xs uppercase tracking-wider text-purple-300">
              <Sliders className="w-4 h-4" />
              3. Manage Concert Event Entries
            </h4>

            {/* Quick add form */}
            <form onSubmit={handleAddEvent} className="p-4 bg-[#08080a] rounded-xl border border-purple-950/40 space-y-3">
              <p className="text-[10px] text-purple-300 uppercase font-bold tracking-wider">Deploy New Concert Entry</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">Date & Time</label>
                  <input
                    type="text"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. Aug 12, 2026 - 19:00"
                    className="w-full bg-[#121216] text-white border border-purple-950/60 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">Venue Location</label>
                  <input
                    type="text"
                    required
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="e.g. Melba Hall, Melbourne"
                    className="w-full bg-[#121216] text-white border border-purple-950/60 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 mb-1">Event Program Title / Description</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Alicia de Larrocha Legacy Recital - Solo Piano Works"
                  className="w-full bg-[#121216] text-white border border-purple-950/60 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 mb-1">Role / Distinction Details</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#121216] text-white border border-purple-950/60 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none cursor-pointer"
                >
                  <option value="Guest Soloist">Guest Soloist</option>
                  <option value="Collaborative Pianist">Collaborative Pianist</option>
                  <option value="Lecture Presenter">Lecture Presenter</option>
                  <option value="Masterclass Clinician">Masterclass Clinician</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[11px] transition duration-150 uppercase tracking-wider"
              >
                Add Live Event
              </button>
              
              {isSuccess && (
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/30 p-2 border border-emerald-900/30 rounded-lg justify-center">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Successfully deployed new concert event entry!
                </div>
              )}
            </form>

            {/* List of current events */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {events.map((evt, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-[#08080a] rounded-lg border border-purple-950/20 text-[11px]">
                  <div className="min-w-0 flex-1 pr-4">
                    <p className="font-bold text-white truncate">{evt.title}</p>
                    <p className="text-gray-400 truncate text-[10px] mt-0.5">{evt.date} • {evt.venue}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(idx)}
                    className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg transition shrink-0"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-purple-950/50 bg-[#08080a] flex items-center justify-between text-[11px] text-gray-400 relative z-10 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition font-medium text-xs px-3 py-1.5 rounded-lg border border-purple-950/20 bg-purple-950/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restore Presets
          </button>
          
          <button
            onClick={onClose}
            className="bg-purple-950 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800/40 px-5 py-1.5 rounded-lg transition font-semibold text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
