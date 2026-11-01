import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFestival } from '../../context/FestivalContext';
import { 
  Users, 
  Calendar, 
  Layers, 
  Shield, 
  Search, 
  Edit2, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  X,
  UserCheck,
  RefreshCw
} from 'lucide-react';

export const AdminPortal = () => {
  const { user } = useAuth();
  const { 
    schedule, 
    teams, 
    allUsers, 
    loadingUsers, 
    updateUserRoleAndTeam, 
    addScheduleEvent, 
    updateScheduleEvent, 
    deleteScheduleEvent,
    refreshUsers
  } = useFestival();

  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'schedule' | 'teams'

  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All');
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('volunteer');
  const [newTeamId, setNewTeamId] = useState('design');
  const [delegationStatus, setDelegationStatus] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Schedule CRUD Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    name: '',
    category: 'Cultural',
    date: '2026-10-24',
    time: '10:00 AM - 01:00 PM',
    venue: 'Main Auditorium',
    volunteersRequired: 15,
    status: 'Confirmed',
    lead: user?.full_name || 'Admin'
  });

  // Filtered Users
  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = 
      (u.full_name && u.full_name.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.username && u.username.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.department && u.department.toLowerCase().includes(userSearch.toLowerCase()));
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesTeam = teamFilter === 'All' || u.team_id === teamFilter;
    return matchesSearch && matchesRole && matchesTeam;
  });

  // Open Edit Role & Team Modal
  const openEditModal = (targetUser) => {
    setEditingUser(targetUser);
    setNewRole(targetUser.role || 'volunteer');
    setNewTeamId(targetUser.team_id || 'event-management');
    setDelegationStatus(null);
  };

  // Submit Role & Team Delegation
  const handleSaveDelegation = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsUpdating(true);
    setDelegationStatus(null);
    const res = await updateUserRoleAndTeam(editingUser.username, newRole, newTeamId);
    setIsUpdating(false);

    if (res.success) {
      setDelegationStatus({
        type: 'success',
        message: `Successfully updated ${editingUser.full_name}'s role to ${newRole.toUpperCase()} in ${teams.find(t=>t.id===newTeamId)?.name || newTeamId}!`
      });
      setTimeout(() => {
        setEditingUser(null);
        setDelegationStatus(null);
      }, 1200);
    } else {
      setDelegationStatus({
        type: 'error',
        message: res.error || 'Failed to update user role and team.'
      });
    }
  };

  // Schedule Form Handlers
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventForm({
      name: '',
      category: 'Cultural',
      date: '2026-10-24',
      time: '10:00 AM - 01:00 PM',
      venue: 'Central Auditorium',
      volunteersRequired: 15,
      status: 'Confirmed',
      lead: user?.full_name || 'Admin'
    });
    setIsScheduleModalOpen(true);
  };

  const handleOpenEditEvent = (evt) => {
    setEditingEvent(evt);
    setEventForm(evt);
    setIsScheduleModalOpen(true);
  };

  const handleSaveSchedule = (e) => {
    e.preventDefault();
    if (editingEvent) {
      updateScheduleEvent(editingEvent.id, eventForm);
    } else {
      addScheduleEvent(eventForm);
    }
    setIsScheduleModalOpen(false);
  };

  return (
    <div className="space-y-8 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner */}
      <div className="bg-white border border-subtle-border rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-olive-100 text-olive-900 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
            Event Management Head Portal
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Logged in as <strong className="text-text-main font-semibold">{user?.full_name}</strong> ({user?.username}) • Global Governance across all 11 Teams
          </p>
        </div>

        {/* Quick Metrics */}
        <div className="flex items-center gap-4 text-xs">
          <div className="p-3 bg-canvas border border-subtle-border rounded-lg text-center min-w-[90px]">
            <span className="text-[11px] text-text-muted uppercase font-semibold block">Total Staff</span>
            <span className="text-xl font-bold text-olive-800">{allUsers.length || 136}</span>
          </div>
          <div className="p-3 bg-canvas border border-subtle-border rounded-lg text-center min-w-[90px]">
            <span className="text-[11px] text-text-muted uppercase font-semibold block">Divisions</span>
            <span className="text-xl font-bold text-olive-800">11 Teams</span>
          </div>
          <div className="p-3 bg-canvas border border-subtle-border rounded-lg text-center min-w-[90px]">
            <span className="text-[11px] text-text-muted uppercase font-semibold block">Sessions</span>
            <span className="text-xl font-bold text-olive-800">{schedule.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-subtle-border gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'users'
              ? 'text-olive-800 border-b-2 border-olive-800 font-semibold'
              : 'text-text-muted hover:text-text-main'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Delegation & Role Reassignment</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-olive-50 text-olive-800 font-mono">
            {filteredUsers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'schedule'
              ? 'text-olive-800 border-b-2 border-olive-800 font-semibold'
              : 'text-text-muted hover:text-text-main'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Master Event Schedule CRUD</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-mono">
            {schedule.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('teams')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'teams'
              ? 'text-olive-800 border-b-2 border-olive-800 font-semibold'
              : 'text-text-muted hover:text-text-main'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>11 Teams Quotas</span>
        </button>
      </div>

      {/* TAB 1: USER DELEGATION & REASSIGNMENT */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-subtle-border">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, username, department..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-canvas border border-subtle-border rounded focus:outline-none focus:border-olive-600"
              />
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto text-xs">
              <span className="text-text-muted">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="py-1.5 px-2 bg-canvas border border-subtle-border rounded text-text-main focus:outline-none focus:border-olive-600"
              >
                <option value="All">All Roles</option>
                <option value="admin">Admin</option>
                <option value="event_head">Event Head</option>
                <option value="volunteer">Volunteer</option>
              </select>

              <span className="text-text-muted ml-2">Team:</span>
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="py-1.5 px-2 bg-canvas border border-subtle-border rounded text-text-main focus:outline-none focus:border-olive-600 max-w-[160px]"
              >
                <option value="All">All 11 Teams</option>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>

              <button
                onClick={refreshUsers}
                title="Refresh user list from Flask"
                className="p-1.5 border border-subtle-border rounded hover:bg-stone-50 text-text-muted"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white border border-subtle-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-canvas border-b border-subtle-border text-text-muted font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Personnel</th>
                    <th className="py-3 px-4">Contact Phone</th>
                    <th className="py-3 px-4">Current Role</th>
                    <th className="py-3 px-4">Assigned Team</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4 text-right">Admin Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-subtle-border">
                  {filteredUsers.map((u) => (
                    <tr key={u.username} className="hover:bg-olive-50/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-text-main">{u.full_name}</div>
                        <div className="text-[11px] text-text-muted font-mono">{u.username}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-text-muted">
                        {u.phone}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-olive-100 text-olive-900 border border-olive-300'
                            : u.role === 'event_head'
                            ? 'bg-amber-50 text-amber-900 border border-amber-300'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {u.role === 'admin' ? 'Admin' : u.role === 'event_head' ? 'Event Head' : 'Volunteer'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-text-main">
                          {u.team_name || teams.find(t=>t.id===u.team_id)?.name || u.team_id}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-muted">
                        {u.department} {u.year ? `(${u.year})` : ''}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => openEditModal(u)}
                          className="btn-outline text-[11px] py-1 px-2.5"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Reassign</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-text-muted">
                        No personnel match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MASTER EVENT SCHEDULE CRUD */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-main">Festival Event Roster</h3>
              <p className="text-xs text-text-muted">Create, edit, and orchestrate all festival track sessions.</p>
            </div>
            <button
              onClick={handleOpenAddEvent}
              className="btn-olive text-xs py-2 px-3.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event Session</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.map((evt) => (
              <div key={evt.id} className="panel-card p-5 space-y-3 panel-hover flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-olive-50 text-olive-800 border border-olive-200">
                      {evt.category}
                    </span>
                    <span className="text-xs text-text-muted font-mono">{evt.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-text-main">{evt.name}</h4>
                  <div className="text-xs text-text-muted space-y-1">
                    <div>Venue: <strong className="text-text-main font-medium">{evt.venue}</strong></div>
                    <div>Timing: {evt.time}</div>
                    <div>Volunteers: {evt.volunteersRequired} required</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-subtle-border flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditEvent(evt)}
                    className="p-1.5 text-text-muted hover:text-olive-800 rounded border border-subtle-border"
                    title="Edit Event"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteScheduleEvent(evt.id)}
                    className="p-1.5 text-text-muted hover:text-rose-600 rounded border border-subtle-border"
                    title="Delete Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 11 TEAMS QUOTAS */}
      {activeTab === 'teams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((t) => (
            <div key={t.id} className="panel-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-olive-50 text-olive-800 border border-olive-200">
                  {t.department}
                </span>
                <span className="text-xs font-mono font-medium text-olive-900">
                  {t.assignedCount} / {t.quota}
                </span>
              </div>
              <h4 className="text-base font-bold text-text-main">{t.name}</h4>
              <div className="text-xs text-text-muted space-y-1">
                <div>Lead: <strong className="text-text-main font-medium">{t.lead}</strong></div>
                <div>Station: {t.venue}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: REASSIGN USER ROLE & TEAM */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-subtle-border rounded-xl max-w-md w-full p-6 space-y-5 animate-in fade-in duration-150">
            <div className="flex items-start justify-between border-b border-subtle-border pb-3">
              <div>
                <span className="text-xs font-bold uppercase text-olive-800">Admin Role Delegation</span>
                <h3 className="text-lg font-bold text-text-main mt-0.5">
                  Reassign {editingUser.full_name}
                </h3>
                <span className="text-xs text-text-muted font-mono">{editingUser.username} • {editingUser.phone}</span>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-text-muted hover:text-text-main p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {delegationStatus && (
              <div className={`p-3 rounded text-xs flex items-center gap-2 ${
                delegationStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {delegationStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{delegationStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleSaveDelegation} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-text-main block">
                  Select New Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-2 bg-canvas border border-subtle-border rounded focus:outline-none focus:border-olive-700"
                >
                  <option value="admin">Administrator (Event Management Head)</option>
                  <option value="event_head">Event Head (Team Lead)</option>
                  <option value="volunteer">Volunteer (Field Operations)</option>
                </select>
                <span className="text-[10px] text-text-muted block">
                  Changes access privileges on their next login session.
                </span>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-text-main block">
                  Assign to Festival Division (11 Teams)
                </label>
                <select
                  value={newTeamId}
                  onChange={(e) => setNewTeamId(e.target.value)}
                  className="w-full p-2 bg-canvas border border-subtle-border rounded focus:outline-none focus:border-olive-700"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-subtle-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="btn-outline text-xs py-1.5 px-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn-olive text-xs py-1.5 px-4"
                >
                  {isUpdating ? 'Saving Update...' : 'Save Reassignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT SCHEDULE EVENT */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-subtle-border rounded-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-subtle-border pb-3">
              <h3 className="text-lg font-bold text-text-main">
                {editingEvent ? 'Edit Festival Session' : 'Create New Festival Session'}
              </h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-text-muted hover:text-text-main p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-text-main block">Session Name</label>
                <input
                  type="text"
                  required
                  value={eventForm.name}
                  onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                  placeholder="e.g. Neon Cricket Arena Finale"
                  className="w-full p-2 bg-canvas border border-subtle-border rounded focus:outline-none focus:border-olive-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-text-main block">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full p-2 bg-canvas border border-subtle-border rounded"
                  >
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Gaming & Tech">Gaming & Tech</option>
                    <option value="Interactive">Interactive</option>
                    <option value="Stage & Spotlight">Stage & Spotlight</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-text-main block">Date</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full p-2 bg-canvas border border-subtle-border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-text-main block">Time Slot</label>
                  <input
                    type="text"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    placeholder="e.g. 02:00 PM - 05:00 PM"
                    className="w-full p-2 bg-canvas border border-subtle-border rounded"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-text-main block">Venue</label>
                  <input
                    type="text"
                    value={eventForm.venue}
                    onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                    placeholder="e.g. Open Air Amphitheatre"
                    className="w-full p-2 bg-canvas border border-subtle-border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-text-main block">Volunteers Required</label>
                  <input
                    type="number"
                    value={eventForm.volunteersRequired}
                    onChange={(e) => setEventForm({ ...eventForm, volunteersRequired: Number(e.target.value) })}
                    className="w-full p-2 bg-canvas border border-subtle-border rounded"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-text-main block">Status</label>
                  <select
                    value={eventForm.status}
                    onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}
                    className="w-full p-2 bg-canvas border border-subtle-border rounded"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-subtle-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="btn-outline text-xs py-1.5 px-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-olive text-xs py-1.5 px-4"
                >
                  {editingEvent ? 'Save Changes' : 'Create Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
