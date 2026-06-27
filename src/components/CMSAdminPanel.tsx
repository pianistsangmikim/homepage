import React, { useState } from "react";
import { PerformanceEvent } from "../types";
import { X, Sliders, Palette, PenTool, Plus, Trash2, CheckCircle, RotateCcw, Image, Upload } from "lucide-react";

interface CMSAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  setBrandName: (name: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  events: PerformanceEvent[];
  setEvents: (events: PerformanceEvent[]) => void;
  profileImage: string;
  setProfileImage: (url: string) => void;
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
  profileImage,
  setProfileImage,
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUploadFeedback("Warning: Image is larger than 2MB. Please use a smaller image for best local storage performance.");
    } else {
      setUploadFeedback("");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        setProfileImage(event.target.result);
        setUploadFeedback("Success: Profile photo uploaded and integrated!");
        setTimeout(() => setUploadFeedback(""), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setBrandName("SANGMI KIM");
    setAccentColor("#8B5CF6");
    setProfileImage("https://images.unsplash.com/photo-1571235917583-f848550413a3?q=80&w=1200");
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
              <Image className="w-4 h-4" />
              2.5 Media & Photography Hub
            </h4>
            
            {/* Upload Area */}
            <div className="space-y-2">
              <label className="block text-[11px] text-gray-400">Upload Your Profile Portrait Photo</label>
              <div className="flex items-center gap-3">
                {profileImage && (
                  <img
                    src={profileImage}
                    alt="Sangmi Profile Preview"
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
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {uploadFeedback && (
                <p className="text-[10px] text-purple-400 mt-1 font-semibold">{uploadFeedback}</p>
              )}
            </div>

            {/* Custom URLs */}
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <div>
                <label className="block text-[10px] text-gray-400 mb-1">Or paste custom Profile Photo URL</label>
                <input
                  type="text"
                  value={profileImage.startsWith("data:") ? "" : profileImage}
                  onChange={(e) => {
                    if (e.target.value.trim()) setProfileImage(e.target.value.trim());
                  }}
                  placeholder="Paste external image link here"
                  className="w-full bg-[#121216] text-white border border-purple-950/60 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 mb-1">Piano Keyboard Hero Background URL</label>
                <input
                  type="text"
                  value={heroBgImage}
                  onChange={(e) => setHeroBgImage(e.target.value)}
                  placeholder="Paste external background link here"
                  className="w-full bg-[#121216] text-white border border-purple-950/60 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                />
              </div>
            </div>
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
