import React, { createContext, useContext, useState, useEffect } from 'react';
import { TEAMS_DATA, INITIAL_SCHEDULE, flaskApi } from '../services/api';
import { useAuth } from './AuthContext';

const FestivalContext = createContext(null);

export const FestivalProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('eventsphere_schedule');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });
  const [teams, setTeams] = useState(TEAMS_DATA);
  const [allUsers, setAllUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Volunteer Task Checklist initial mock
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Collect official venue walkie-talkie & badge', status: 'Completed', priority: 'High', due: '09:00 AM' },
    { id: 't2', title: 'Verify perimeter crowd flow and barricade checks', status: 'In Progress', priority: 'Critical', due: '11:00 AM' },
    { id: 't3', title: 'Conduct VIP green room welcoming with Hosting Lead', status: 'Pending', priority: 'High', due: '01:30 PM' },
    { id: 't4', title: 'Submit afternoon shift attendance and handover report', status: 'Pending', priority: 'Medium', due: '05:00 PM' }
  ]);

  // Save schedule changes to localStorage
  useEffect(() => {
    localStorage.setItem('eventsphere_schedule', JSON.stringify(schedule));
  }, [schedule]);

  // Fetch all users when Admin logs in
  const refreshUsers = async () => {
    if (!token || user?.role !== 'admin') return;
    setLoadingUsers(true);
    try {
      const res = await flaskApi.get('/admin/users');
      if (res.data?.users) {
        setAllUsers(res.data.users);
      }
    } catch (err) {
      console.error('Failed to load users roster:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      refreshUsers();
    }
  }, [user, token]);

  // 1. ADMIN DELEGATION: Update anyone's Role and Assigned Team
  const updateUserRoleAndTeam = async (username, newRole, newTeamId) => {
    try {
      const targetTeam = teams.find(t => t.id === newTeamId);
      const teamName = targetTeam ? targetTeam.name : newTeamId;

      const res = await flaskApi.put(`/admin/users/${username}`, {
        role: newRole,
        team_id: newTeamId,
        team_name: teamName
      });

      // Update state locally
      setAllUsers((prev) =>
        prev.map((u) =>
          u.username === username
            ? { ...u, role: newRole, team_id: newTeamId, team_name: teamName }
            : u
        )
      );

      return { success: true, data: res.data };
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Failed to update user';
      return { success: false, error: msg };
    }
  };

  // 2. Schedule CRUD (Admin capability)
  const addScheduleEvent = (newEvent) => {
    const id = `evt-${Date.now()}`;
    const item = { ...newEvent, id };
    setSchedule((prev) => [item, ...prev]);
    return item;
  };

  const updateScheduleEvent = (id, updated) => {
    setSchedule((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, ...updated } : evt))
    );
  };

  const deleteScheduleEvent = (id) => {
    setSchedule((prev) => prev.filter((evt) => evt.id !== id));
  };

  // 3. Task toggles
  const toggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  return (
    <FestivalContext.Provider value={{
      schedule,
      teams,
      allUsers,
      loadingUsers,
      tasks,
      refreshUsers,
      updateUserRoleAndTeam,
      addScheduleEvent,
      updateScheduleEvent,
      deleteScheduleEvent,
      toggleTaskStatus
    }}>
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestival = () => {
  const context = useContext(FestivalContext);
  if (!context) {
    throw new Error('useFestival must be used within a FestivalProvider');
  }
  return context;
};
