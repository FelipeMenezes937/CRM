import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [view, setView] = useState('dashboard')
  const [clients, setClients] = useState([])
  const [tasks, setTasks] = useState([])
  const [clientForm, setClientForm] = useState({ name: '', email: '', phone: '', company: '', status: 'lead', value: 0, notes: '' })
  const [taskForm, setTaskForm] = useState({ client_id: '', title: '', description: '', status: 'pending', due_date: '' })
  const [editingClientId, setEditingClientId] = useState(null)
  const [editingTaskId, setEditingTaskId] = useState(null)

  useEffect(() => {
    fetchClients()
    fetchTasks()
  }, [])

  const fetchClients = async () => {
    try {
      const res = await fetch('/clients')
      const data = await res.json()
      setClients(data)
    } catch (err) {
      console.error('Error fetching clients:', err)
    }
  }

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks')
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      console.error('Error fetching tasks:', err)
    }
  }

  const handleClientSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingClientId) {
        await fetch(`/clients/${editingClientId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientForm)
        })
        setEditingClientId(null)
      } else {
        await fetch('/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientForm)
        })
      }
      setClientForm({ name: '', email: '', phone: '', company: '', status: 'lead', value: 0, notes: '' })
      fetchClients()
    } catch (err) {
      console.error('Error saving client:', err)
    }
  }

  const handleTaskSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingTaskId) {
        await fetch(`/api/tasks/${editingTaskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskForm)
        })
        setEditingTaskId(null)
      } else {
        await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskForm)
        })
      }
      setTaskForm({ client_id: '', title: '', description: '', status: 'pending', due_date: '' })
      fetchTasks()
    } catch (err) {
      console.error('Error saving task:', err)
    }
  }

  const handleEditClient = (client) => {
    setClientForm({ name: client.name, email: client.email || '', phone: client.phone || '', company: client.company || '', status: client.status || 'lead', value: client.value || 0, notes: client.notes || '' })
    setEditingClientId(client.id)
  }

  const handleDeleteClient = async (id) => {
    if (confirm('Delete this client?')) {
      try {
        await fetch(`/clients/${id}`, { method: 'DELETE' })
        fetchClients()
      } catch (err) {
        console.error('Error deleting client:', err)
      }
    }
  }

  const handleEditTask = (task) => {
    setTaskForm({ client_id: task.client_id || '', title: task.title, description: task.description || '', status: task.status, due_date: task.due_date || '' })
    setEditingTaskId(task.id)
  }

  const handleDeleteTask = async (id) => {
    if (confirm('Delete this task?')) {
      try {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
        fetchTasks()
      } catch (err) {
        console.error('Error deleting task:', err)
      }
    }
  }

  const stats = {
    total: clients.length,
    leads: clients.filter(c => c.status === 'lead').length,
    customers: clients.filter(c => c.status === 'customer').length,
    totalValue: clients.reduce((sum, c) => sum + (parseFloat(c.value) || 0), 0),
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    completedTasks: tasks.filter(t => t.status === 'completed').length
  }

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo">
          <h2>CRM</h2>
        </div>
        <ul className="nav-links">
          <li className={view === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')}>
            <span>Dashboard</span>
          </li>
          <li className={view === 'clients' ? 'active' : ''} onClick={() => setView('clients')}>
            <span>Clients</span>
          </li>
          <li className={view === 'tasks' ? 'active' : ''} onClick={() => setView('tasks')}>
            <span>Tasks</span>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        {view === 'dashboard' && (
          <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue">{clients.length}</div>
                <div className="stat-info">
                  <span className="stat-label">Total Clients</span>
                  <span className="stat-value">All</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orange">{stats.leads}</div>
                <div className="stat-info">
                  <span className="stat-label">Leads</span>
                  <span className="stat-value">New</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">{stats.customers}</div>
                <div className="stat-info">
                  <span className="stat-label">Customers</span>
                  <span className="stat-value">Converted</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon purple">R$ {stats.totalValue.toLocaleString()}</div>
                <div className="stat-info">
                  <span className="stat-label">Total Value</span>
                  <span className="stat-value">Revenue</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon red">{stats.pendingTasks}</div>
                <div className="stat-info">
                  <span className="stat-label">Pending Tasks</span>
                  <span className="stat-value">To Do</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon teal">{stats.completedTasks}</div>
                <div className="stat-info">
                  <span className="stat-label">Completed</span>
                  <span className="stat-value">Done</span>
                </div>
              </div>
            </div>

            <div className="sections-grid">
              <div className="section">
                <h3>Recent Clients</h3>
                <div className="recent-list">
                  {clients.slice(0, 5).map(c => (
                    <div key={c.id} className="recent-item">
                      <span>{c.name}</span>
                      <span className={`status-badge ${c.status}`}>{c.status}</span>
                    </div>
                  ))}
                  {clients.length === 0 && <p className="empty-text">No clients yet</p>}
                </div>
              </div>
              <div className="section">
                <h3>Pending Tasks</h3>
                <div className="recent-list">
                  {tasks.filter(t => t.status === 'pending').slice(0, 5).map(t => (
                    <div key={t.id} className="recent-item">
                      <span>{t.title}</span>
                      <span className="task-client">{t.client_name}</span>
                    </div>
                  ))}
                  {tasks.filter(t => t.status === 'pending').length === 0 && <p className="empty-text">No pending tasks</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'clients' && (
          <div className="page">
            <div className="page-header">
              <h1>Clients Management</h1>
              <button className="btn-primary" onClick={() => { setClientForm({ name: '', email: '', phone: '', company: '', status: 'lead', value: 0, notes: '' }); setEditingClientId(null) }}>
                + Add Client
              </button>
            </div>

            <div className="form-card">
              <h3>{editingClientId ? 'Edit Client' : 'New Client'}</h3>
              <form onSubmit={handleClientSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name *</label>
                    <input value={clientForm.name} onChange={e => setClientForm({...clientForm, name: e.target.value})} placeholder="Client name" required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input value={clientForm.email} onChange={e => setClientForm({...clientForm, email: e.target.value})} placeholder="email@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} placeholder="(11) 99999-9999" />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input value={clientForm.company} onChange={e => setClientForm({...clientForm, company: e.target.value})} placeholder="Company name" />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select value={clientForm.status} onChange={e => setClientForm({...clientForm, status: e.target.value})}>
                      <option value="lead">Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="proposal">Proposal</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Value (R$)</label>
                    <input type="number" value={clientForm.value} onChange={e => setClientForm({...clientForm, value: e.target.value})} placeholder="0.00" />
                  </div>
                  <div className="form-group full-width">
                    <label>Notes</label>
                    <textarea value={clientForm.notes} onChange={e => setClientForm({...clientForm, notes: e.target.value})} placeholder="Additional notes..." rows={2} />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">{editingClientId ? 'Update' : 'Save'}</button>
                  {editingClientId && <button type="button" className="btn-secondary" onClick={() => { setEditingClientId(null); setClientForm({ name: '', email: '', phone: '', company: '', status: 'lead', value: 0, notes: '' }) }}>Cancel</button>}
                </div>
              </form>
            </div>

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Value</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(client => (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>{client.company}</td>
                      <td><span className={`status-badge ${client.status}`}>{client.status}</span></td>
                      <td>R$ {parseFloat(client.value || 0).toLocaleString()}</td>
                      <td>
                        <button className="btn-icon edit" onClick={() => handleEditClient(client)}>Edit</button>
                        <button className="btn-icon delete" onClick={() => handleDeleteClient(client.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {clients.length === 0 && <tr><td colSpan={7} className="empty-text">No clients found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'tasks' && (
          <div className="page">
            <div className="page-header">
              <h1>Tasks Management</h1>
              <button className="btn-primary" onClick={() => { setTaskForm({ client_id: '', title: '', description: '', status: 'pending', due_date: '' }); setEditingTaskId(null) }}>
                + Add Task
              </button>
            </div>

            <div className="form-card">
              <h3>{editingTaskId ? 'Edit Task' : 'New Task'}</h3>
              <form onSubmit={handleTaskSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Client</label>
                    <select value={taskForm.client_id} onChange={e => setTaskForm({...taskForm, client_id: e.target.value})}>
                      <option value="">Select client</option>
                      {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Title *</label>
                    <input value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})} placeholder="Task title" required />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select value={taskForm.status} onChange={e => setTaskForm({...taskForm, status: e.target.value})}>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Due Date</label>
                    <input type="date" value={taskForm.due_date} onChange={e => setTaskForm({...taskForm, due_date: e.target.value})} />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} placeholder="Task description..." rows={2} />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">{editingTaskId ? 'Update' : 'Save'}</button>
                  {editingTaskId && <button type="button" className="btn-secondary" onClick={() => { setEditingTaskId(null); setTaskForm({ client_id: '', title: '', description: '', status: 'pending', due_date: '' }) }}>Cancel</button>}
                </div>
              </form>
            </div>

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.client_name || '-'}</td>
                      <td><span className={`status-badge ${task.status}`}>{task.status.replace('_', ' ')}</span></td>
                      <td>{task.due_date || '-'}</td>
                      <td>
                        <button className="btn-icon edit" onClick={() => handleEditTask(task)}>Edit</button>
                        <button className="btn-icon delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {tasks.length === 0 && <tr><td colSpan={5} className="empty-text">No tasks found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App