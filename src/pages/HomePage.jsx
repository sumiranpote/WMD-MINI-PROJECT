import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFestival } from '../context/FestivalContext';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Award,
  Sparkles
} from 'lucide-react';

export const HomePage = () => {
  const { schedule, teams } = useFestival();
  const { isAuthenticated, getPortalRoute } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cultural', 'Sports', 'Gaming & Tech', 'Interactive', 'Stage & Spotlight'];

  const filteredEvents = schedule.filter(evt => 
    selectedCategory === 'All' || evt.category === selectedCategory
  );

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Sleek Hero Banner */}
      <section className="bg-white border border-subtle-border rounded-xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive-50 border border-olive-200 text-olive-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OJUS Student Festival • October 24–26, 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-text-main tracking-tight leading-tight">
            Unified Festival Operations & Workforce Platform
          </h1>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Welcome to the centralized management portal for OJUS 2026. Empowering our 11 operational divisions, 
            providing verified role-based access control, master schedule governance, and volunteer identity credentials.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to={isAuthenticated ? getPortalRoute() : "/auth"}
              className="btn-olive py-2.5 px-5 text-sm"
            >
              <span>{isAuthenticated ? "Go to My Operations Portal" : "Enter Operations Portal"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/teams"
              className="btn-outline py-2.5 px-5 text-sm"
            >
              <span>Explore 11 Festival Teams</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Operational Metrics Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="panel-card p-5 space-y-1">
          <div className="text-xs font-medium text-text-muted uppercase tracking-wider flex items-center justify-between">
            <span>Festival Divisions</span>
            <Layers className="w-4 h-4 text-olive-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-text-main">11 Teams</div>
          <div className="text-[11px] text-text-muted">Includes new Design & UI/UX Division</div>
        </div>

        <div className="panel-card p-5 space-y-1">
          <div className="text-xs font-medium text-text-muted uppercase tracking-wider flex items-center justify-between">
            <span>Verified Workforce</span>
            <Users className="w-4 h-4 text-olive-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-text-main">135+ Members</div>
          <div className="text-[11px] text-text-muted">42 Leads & 93 Volunteers seeded</div>
        </div>

        <div className="panel-card p-5 space-y-1">
          <div className="text-xs font-medium text-text-muted uppercase tracking-wider flex items-center justify-between">
            <span>Master Schedule</span>
            <Calendar className="w-4 h-4 text-olive-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-text-main">3 Full Days</div>
          <div className="text-[11px] text-text-muted">Multi-track sessions across campus</div>
        </div>

        <div className="panel-card p-5 space-y-1">
          <div className="text-xs font-medium text-text-muted uppercase tracking-wider flex items-center justify-between">
            <span>Security & Auth</span>
            <ShieldCheck className="w-4 h-4 text-olive-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-text-main">HS256 RBAC</div>
          <div className="text-[11px] text-text-muted">Cryptographic token pass issuance</div>
        </div>
      </section>

      {/* 3 Role-Based Portals Access Cards */}
      <section className="space-y-4">
        <div className="border-b border-subtle-border pb-3">
          <h2 className="text-xl font-bold text-text-main">Role-Based Access Portals</h2>
          <p className="text-xs text-text-muted mt-0.5">Direct portals configured with tailored functional dashboards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Portal Card */}
          <div className="panel-card p-6 flex flex-col justify-between panel-hover">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded bg-olive-100 text-olive-800 text-[11px] font-bold uppercase tracking-wider">
                Administrator
              </span>
              <h3 className="text-lg font-bold text-text-main">Event Management Head</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Global operational control. Master schedule CRUD, complete personnel roster, and role & team reassignments.
              </p>
            </div>
            <Link to="/auth" className="mt-6 btn-outline text-xs py-2 w-full justify-between">
              <span>Access Admin Panel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Event Head Portal Card */}
          <div className="panel-card p-6 flex flex-col justify-between panel-hover">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded bg-olive-50 text-olive-700 border border-olive-200 text-[11px] font-bold uppercase tracking-wider">
                Team Lead
              </span>
              <h3 className="text-lg font-bold text-text-main">Event Head Portal</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Dedicated departmental view for specific team leads (Security, Creative, Design, etc.) to manage their volunteer team and shifts.
              </p>
            </div>
            <Link to="/auth" className="mt-6 btn-outline text-xs py-2 w-full justify-between">
              <span>Access Lead Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Volunteer Portal Card */}
          <div className="panel-card p-6 flex flex-col justify-between panel-hover">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded bg-stone-100 text-stone-700 text-[11px] font-bold uppercase tracking-wider">
                Field Operations
              </span>
              <h3 className="text-lg font-bold text-text-main">Volunteer Portal</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Personalized volunteer pass, assigned team reporting channel, shift schedule, and real-time task checklist.
              </p>
            </div>
            <Link to="/auth" className="mt-6 btn-outline text-xs py-2 w-full justify-between">
              <span>Access Volunteer Pass</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Master Event Schedule Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-subtle-border pb-3">
          <div>
            <h2 className="text-xl font-bold text-text-main">Festival Master Schedule</h2>
            <p className="text-xs text-text-muted mt-0.5">Official 3-day timeline across campus grounds</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedCategory === cat
                    ? 'bg-olive-800 text-white font-medium'
                    : 'bg-white border border-subtle-border text-text-muted hover:border-olive-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Table / Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="panel-card p-5 space-y-3 panel-hover">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-olive-50 text-olive-800 border border-olive-200">
                  {evt.category}
                </span>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                  evt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {evt.status}
                </span>
              </div>

              <h4 className="text-base font-semibold text-text-main leading-snug">
                {evt.name}
              </h4>

              <div className="space-y-1.5 text-xs text-text-muted pt-2 border-t border-subtle-border">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-olive-700" />
                  <span>{evt.date} • {evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-olive-700" />
                  <span>{evt.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-olive-700" />
                  <span>Coordination Lead: {evt.lead}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
