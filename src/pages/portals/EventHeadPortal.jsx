import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFestival } from '../../context/FestivalContext';
import { flaskApi } from '../../services/api';
import { 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Shield, 
  Calendar, 
  ListChecks, 
  Plus, 
  Search,
  MessageSquare,
  Award
} from 'lucide-react';

export const EventHeadPortal = () => {
  const { user } = useAuth();
  const { teams } = useFestival();

  const myTeam = teams.find(t => t.id === user?.team_id) || {
    id: user?.team_id || 'general',
    name: user?.team_name || 'Design Team',
    department: 'Department Operations',
    venue: 'Department Command Booth',
    quota: 15,
    assignedCount: 8
  };

  const [teamMembers, setTeamMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [memberSearch, setMemberSearch] = useState('');

  // Team Lead Task Checklist
  const [teamTasks, setTeamTasks] = useState([
    { id: '1', title: 'Conduct 09:00 AM Morning Lineup & Radio Handover', assignee: 'All Volunteers', status: 'Completed', priority: 'High' },
    { id: '2', title: 'Verify perimeter checkpoints & visitor badges', assignee: 'Vrunda Dujari', status: 'In Progress', priority: 'Critical' },
    { id: '3', title: 'Station volunteers at Main Auditorium Entrance', assignee: 'Jaideep Kale', status: 'In Progress', priority: 'High' },
    { id: '4', title: 'Prepare evening shift handover report', assignee: 'Team Lead', status: 'Pending', priority: 'Medium' }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');

  // Station Announcement
  const [bulletin, setBulletin] = useState('All team members must report 20 minutes prior to scheduled shift times. Collect official walkie-talkies from Command Desk.');
  const [isEditingBulletin, setIsEditingBulletin] = useState(false);
  const [tempBulletin, setTempBulletin] = useState(bulletin);

  // Fetch team members from Flask
  useEffect(() => {
    setLoadingMembers(true);
    flaskApi.get(`/volunteers?team_id=${myTeam.id}`)
      .then((res) => {
        setTeamMembers(res.data);
      })
      .catch((err) => {
        console.error('Error fetching team members:', err);
      })
      .finally(() => {
        setLoadingMembers(false);
      });
  }, [myTeam.id]);

  const filteredMembers = teamMembers.filter(m =>
    m.full_name?.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.username?.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const toggleTask = (id) => {
    setTeamTasks(prev =>
      prev.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t)
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const item = {
      id: String(Date.now()),
      title: newTaskTitle,
      assignee: newTaskAssignee || 'Unassigned',
      status: 'Pending',
      priority: 'High'
    };
    setTeamTasks(prev => [item, ...prev]);
    setNewTaskTitle('');
    setNewTaskAssignee('');
  };

  return (
    <div className="space-y-8 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Team Lead Header */}
      <div className="bg-white border border-subtle-border rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-olive-50 border border-olive-200 text-olive-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Event Head Portal • {myTeam.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
            {myTeam.name} Operations Hub
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Department Lead: <strong className="text-text-main font-semibold">{user?.full_name}</strong> • Station: {myTeam.venue}
          </p>
        </div>

        {/* Quick Metrics */}
        <div className="flex items-center gap-4 text-xs">
          <div className="p-3 bg-canvas border border-subtle-border rounded-lg text-center min-w-[90px]">
            <span className="text-[11px] text-text-muted uppercase font-semibold block">Team Size</span>
            <span className="text-xl font-bold text-olive-800">{teamMembers.length || myTeam.assignedCount}</span>
          </div>
          <div className="p-3 bg-canvas border border-subtle-border rounded-lg text-center min-w-[90px]">
            <span className="text-[11px] text-text-muted uppercase font-semibold block">Target Quota</span>
            <span className="text-xl font-bold text-olive-800">{myTeam.quota}</span>
          </div>
          <div className="p-3 bg-canvas border border-subtle-border rounded-lg text-center min-w-[90px]">
            <span className="text-[11px] text-text-muted uppercase font-semibold block">Active Tasks</span>
            <span className="text-xl font-bold text-olive-800">{teamTasks.length}</span>
          </div>
        </div>
      </div>

      {/* Station Bulletin */}
      <div className="panel-card p-5 bg-olive-50/40 border-olive-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-olive-900 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-olive-700" />
            <span>Station Briefing & Protocol</span>
          </span>
          <button
            onClick={() => {
              if (isEditingBulletin) setBulletin(tempBulletin);
              setIsEditingBulletin(!isEditingBulletin);
            }}
            className="text-xs text-olive-800 hover:underline font-semibold"
          >
            {isEditingBulletin ? 'Save Notice' : 'Update Notice'}
          </button>
        </div>
        {isEditingBulletin ? (
          <textarea
            value={tempBulletin}
            onChange={(e) => setTempBulletin(e.target.value)}
            className="w-full text-xs p-2.5 bg-white border border-subtle-border rounded focus:outline-none focus:border-olive-600"
            rows="2"
          />
        ) : (
          <p className="text-xs text-olive-900 leading-relaxed font-medium">
            "{bulletin}"
          </p>
        )}
      </div>

      {/* Two Column Layout: Team Roster & Task Assignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1 & 2: Assigned Volunteers Roster */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-subtle-border pb-3">
            <div>
              <h3 className="text-lg font-bold text-text-main">
                {myTeam.name} Roster ({teamMembers.length} Members)
              </h3>
              <p className="text-xs text-text-muted">Field personnel assigned to your operational division</p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search team roster..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-subtle-border rounded focus:outline-none focus:border-olive-600"
              />
            </div>
          </div>

          <div className="bg-white border border-subtle-border rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-subtle-border text-text-muted font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Volunteer</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle-border">
                {filteredMembers.map((m) => (
                  <tr key={m.username} className="hover:bg-olive-50/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-text-main">{m.full_name}</div>
                      <div className="text-[11px] text-text-muted font-mono">{m.username}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-text-muted">
                      {m.phone}
                    </td>
                    <td className="py-3 px-4 text-text-muted">
                      {m.department} {m.year ? `(${m.year})` : ''}
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-[11px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                        {m.role === 'event_head' ? 'Co-Lead' : 'Volunteer'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-text-muted">
                      {loadingMembers ? 'Loading team roster...' : 'No members found for this team.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 3: Team Task Assignment & Checklist */}
        <div className="space-y-4">
          <div className="border-b border-subtle-border pb-3">
            <h3 className="text-lg font-bold text-text-main">Department Task Board</h3>
            <p className="text-xs text-text-muted">Assign and verify operational duties</p>
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="panel-card p-4 space-y-2.5 text-xs">
            <span className="font-bold text-text-main block">Assign New Duty</span>
            <input
              type="text"
              placeholder="Task description..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-2 bg-canvas border border-subtle-border rounded focus:outline-none focus:border-olive-600"
            />
            <input
              type="text"
              placeholder="Assignee name (optional)..."
              value={newTaskAssignee}
              onChange={(e) => setNewTaskAssignee(e.target.value)}
              className="w-full p-2 bg-canvas border border-subtle-border rounded focus:outline-none focus:border-olive-600"
            />
            <button type="submit" className="w-full btn-olive text-xs py-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Duty Checklist</span>
            </button>
          </form>

          {/* Task Items */}
          <div className="space-y-2">
            {teamTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className={`panel-card p-3.5 cursor-pointer panel-hover space-y-1.5 ${
                  t.status === 'Completed' ? 'bg-olive-50/40 border-olive-200' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-xs font-semibold leading-snug ${
                    t.status === 'Completed' ? 'line-through text-text-muted' : 'text-text-main'
                  }`}>
                    {t.title}
                  </span>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                    t.status === 'Completed' ? 'text-olive-700' : 'text-stone-300'
                  }`} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
                  <span>Assignee: <strong className="text-text-main">{t.assignee}</strong></span>
                  <span className="font-mono text-[10px] uppercase font-bold text-olive-800">
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
