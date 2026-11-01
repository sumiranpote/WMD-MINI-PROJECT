import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFestival } from '../../context/FestivalContext';
import { 
  User, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  QrCode, 
  Award,
  AlertCircle
} from 'lucide-react';

export const VolunteerPortal = () => {
  const { user } = useAuth();
  const { teams, tasks, toggleTaskStatus } = useFestival();

  const assignedTeam = teams.find(t => t.id === user?.team_id) || {
    id: user?.team_id || 'creative',
    name: user?.team_name || 'Creative',
    department: 'Campus & Stage Aesthetics',
    lead: 'Jinal Dinesh Kumar Jain',
    venue: 'Creative Workshop (Room 204)'
  };

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="space-y-8 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner */}
      <div className="bg-white border border-subtle-border rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-olive-50 border border-olive-200 text-olive-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Volunteer Operations Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
            Welcome, {user?.full_name || 'Festival Volunteer'}
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Assigned to <strong className="text-text-main font-semibold">{assignedTeam.name}</strong> • Reporting to {assignedTeam.lead}
          </p>
        </div>

        {/* Shift Snapshot */}
        <div className="flex items-center gap-3 bg-canvas p-3 rounded-lg border border-subtle-border text-xs">
          <Clock className="w-5 h-5 text-olive-700" />
          <div>
            <span className="font-semibold text-text-main block">Oct 24–26 • Shift A</span>
            <span className="text-[11px] text-text-muted">08:30 AM Briefing @ {assignedTeam.venue}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Identity Pass & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Official Digital Festival Pass */}
        <div className="space-y-4">
          <div className="border-b border-subtle-border pb-3">
            <h3 className="text-lg font-bold text-text-main">Digital Volunteer Pass</h3>
            <p className="text-xs text-text-muted">Official verified festival access credential</p>
          </div>

          <div className="bg-white border-2 border-olive-700 rounded-xl p-6 space-y-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-subtle-border pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-olive-800">OJUS FESTIVAL 2026</span>
                <h4 className="text-base font-bold text-text-main">Volunteer Identity Pass</h4>
              </div>
              <div className="w-8 h-8 rounded bg-olive-800 flex items-center justify-center text-white font-bold text-xs">
                ES
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[11px] text-text-muted block">Full Name</span>
                <span className="text-sm font-bold text-text-main">{user?.full_name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-text-muted block">Assigned Division</span>
                  <span className="font-semibold text-olive-900">{assignedTeam.name}</span>
                </div>
                <div>
                  <span className="text-[11px] text-text-muted block">Festival Role</span>
                  <span className="font-semibold text-text-main capitalize">{user?.role || 'Volunteer'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-text-muted block">Department / Year</span>
                  <span className="font-medium text-text-main">{user?.department || 'Engineering'}</span>
                </div>
                <div>
                  <span className="text-[11px] text-text-muted block">Pass ID</span>
                  <span className="font-mono text-xs font-bold text-olive-800">ESP-2026-{user?.phone ? user.phone.slice(-4) : '9814'}</span>
                </div>
              </div>
            </div>

            {/* Simulated Verified Security Bar */}
            <div className="pt-4 border-t border-subtle-border flex items-center justify-between text-[11px] text-text-muted font-mono">
              <span>SECURITY HASH VERIFIED</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VALID
              </span>
            </div>
          </div>

          {/* Reporting Lead Card */}
          <div className="panel-card p-4 space-y-2 text-xs bg-olive-50/30">
            <span className="font-bold text-text-main flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-olive-700" />
              <span>Reporting Event Head</span>
            </span>
            <div className="text-text-muted space-y-1 pt-1">
              <div>Name: <strong className="text-text-main font-semibold">{assignedTeam.lead}</strong></div>
              <div>Station: <strong className="text-text-main">{assignedTeam.venue}</strong></div>
              <div>Duty Line: Active during festival hours</div>
            </div>
          </div>
        </div>

        {/* Right Column: Duty Checklist & Schedule */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Duty Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-subtle-border pb-3">
              <div>
                <h3 className="text-lg font-bold text-text-main">Assigned Duty Checklist</h3>
                <p className="text-xs text-text-muted">Click any item to toggle completed status</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-olive-800 font-mono">
                  {completedCount} of {tasks.length} Done ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-olive-700 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {tasks.map((task) => {
                const isDone = task.status === 'Completed';

                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`panel-card p-4 flex items-start justify-between gap-4 cursor-pointer panel-hover transition-colors ${
                      isDone ? 'bg-olive-50/40 border-olive-300' : 'bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          task.priority === 'Critical' ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-olive-50 text-olive-800 border border-olive-200'
                        }`}>
                          {task.priority} Priority
                        </span>
                        <span className="text-xs text-text-muted">Target: {task.due}</span>
                      </div>

                      <h4 className={`text-sm font-semibold leading-snug ${
                        isDone ? 'line-through text-text-muted' : 'text-text-main'
                      }`}>
                        {task.title}
                      </h4>
                    </div>

                    <div className={`p-1 rounded-full ${isDone ? 'text-olive-700' : 'text-stone-300'}`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Emergency & Key Stations */}
          <div className="panel-card p-5 space-y-3 text-xs">
            <h4 className="font-bold text-text-main uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-olive-700" />
              <span>Campus Coordination Hotlines</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-text-muted">
              <div className="p-2.5 bg-canvas rounded border border-subtle-border">
                <span className="text-[10px] text-text-muted uppercase block font-semibold">Central Ops Room</span>
                <span className="font-mono text-xs font-bold text-text-main">Ext. 201 / Audi 1</span>
              </div>
              <div className="p-2.5 bg-canvas rounded border border-subtle-border">
                <span className="text-[10px] text-text-muted uppercase block font-semibold">Security Command</span>
                <span className="font-mono text-xs font-bold text-text-main">Ext. 911 / Main Gate</span>
              </div>
              <div className="p-2.5 bg-canvas rounded border border-subtle-border">
                <span className="text-[10px] text-text-muted uppercase block font-semibold">Emergency First-Aid</span>
                <span className="font-mono text-xs font-bold text-text-main">Ext. 108 / Medical Bay</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
