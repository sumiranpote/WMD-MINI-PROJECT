import React, { useState } from 'react';
import { useFestival } from '../context/FestivalContext';
import { 
  Search, 
  MapPin, 
  User, 
  Users, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  X
} from 'lucide-react';

export const TeamsDirectoryPage = () => {
  const { teams } = useFestival();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.lead.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-subtle-border pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-olive-800">Operational Workforce</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main mt-1">
            11 Distinct Festival Teams
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl">
            Directory of the operational divisions orchestrating the OJUS Student Festival. Explore team responsibilities, reporting venues, and lead coordinators.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search teams, leads, venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-subtle-border rounded-md focus:outline-none focus:border-olive-600 transition-colors"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeams.map((team) => {
          const quotaPercent = Math.min(100, Math.round((team.assignedCount / team.quota) * 100));

          return (
            <div 
              key={team.id}
              className="panel-card p-6 flex flex-col justify-between panel-hover cursor-pointer"
              onClick={() => setSelectedTeam(team)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-olive-50 text-olive-800 border border-olive-200">
                    {team.department}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {team.assignedCount} / {team.quota} spots
                  </span>
                </div>

                <h3 className="text-lg font-bold text-text-main">
                  {team.name}
                </h3>

                <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                  {team.description}
                </p>

                {/* Quota Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-olive-700 rounded-full" 
                      style={{ width: `${quotaPercent}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-text-muted pt-3 border-t border-subtle-border">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-olive-700" />
                    <span>Lead: <strong className="text-text-main font-medium">{team.lead}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-olive-700" />
                    <span>Venue: {team.venue}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2 flex items-center justify-between text-xs text-olive-800 font-medium">
                <span>View Responsibilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-subtle-border rounded-xl max-w-lg w-full p-6 space-y-5 animate-in fade-in duration-150">
            
            <div className="flex items-start justify-between border-b border-subtle-border pb-4">
              <div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-olive-50 text-olive-800 border border-olive-200">
                  {selectedTeam.department}
                </span>
                <h2 className="text-xl font-bold text-text-main mt-1">{selectedTeam.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedTeam(null)}
                className="text-text-muted hover:text-text-main p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              {selectedTeam.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs bg-olive-50/50 p-3 rounded-lg border border-subtle-border">
              <div>
                <span className="text-[11px] text-text-muted block">Department Lead</span>
                <span className="font-semibold text-text-main">{selectedTeam.lead}</span>
              </div>
              <div>
                <span className="text-[11px] text-text-muted block">Command Station</span>
                <span className="font-semibold text-text-main">{selectedTeam.venue}</span>
              </div>
              <div>
                <span className="text-[11px] text-text-muted block">Current Assigned</span>
                <span className="font-semibold text-text-main">{selectedTeam.assignedCount} Volunteers</span>
              </div>
              <div>
                <span className="text-[11px] text-text-muted block">Target Quota</span>
                <span className="font-semibold text-text-main">{selectedTeam.quota} Total Spots</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-text-main uppercase tracking-wider">Primary Deliverables</h4>
              <ul className="space-y-1.5 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-olive-700" />
                  <span>Mandatory morning briefing at {selectedTeam.venue}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-olive-700" />
                  <span>Execute assigned shift checklists across October 24–26</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-olive-700" />
                  <span>Direct reporting line to {selectedTeam.lead}</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => setSelectedTeam(null)}
                className="btn-olive text-xs py-2 px-4"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
