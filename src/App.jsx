import React, { useState } from 'react';
import { MapPin, Camera, Send, AlertTriangle } from 'lucide-react';

// Simple styles object (Inline styles for simplicity in a single file)
const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '20px' },
  header: { background: '#2563eb', color: 'white', padding: '20px', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', gap: '10px' },
  title: { margin: 0, fontSize: '1.5rem' },
  card: { background: 'white', padding: '20px', borderRadius: '0 0 12px 12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  inputGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#374151' },
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', minHeight: '100px', boxSizing: 'border-box' },
  button: { width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' },
  issueItem: { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', marginTop: '15px', background: '#f9fafb' },
  badge: { display: 'inline-block', padding: '4px 8px', borderRadius: '9999px', fontSize: '0.8rem', background: '#fee2e2', color: '#991b1b', marginBottom: '8px' }
};

function App() {
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({ title: '', location: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location) return;

    const newIssue = {
      id: Date.now(),
      ...formData,
      status: 'Reported',
      date: new Date().toLocaleDateString()
    };

    setIssues([newIssue, ...issues]);
    setFormData({ title: '', location: '', description: '' });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <AlertTriangle size={28} />
        <h1 style={styles.title}>CivicConnect</h1>
      </div>

      <div style={styles.card}>
        {/* Submission Form */}
        <h2 style={{marginTop: 0}}>Report an Issue</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Issue Type</label>
            <input 
              style={styles.input} 
              type="text" 
              placeholder="e.g., Pothole, Broken Streetlight"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Location</label>
            <div style={{position: 'relative'}}>
              <input 
                style={styles.input} 
                type="text" 
                placeholder="Street name or landmark"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
              <MapPin size={20} style={{position: 'absolute', right: '10px', top: '10px', color: '#9ca3af'}} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea 
              style={styles.textarea} 
              placeholder="Describe the problem..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button type="submit" style={styles.button}>
            <Send size={18} /> Submit Report
          </button>
        </form>

        {/* List of Reported Issues */}
        {issues.length > 0 && (
          <div style={{marginTop: '30px'}}>
            <h3>Recent Reports</h3>
            {issues.map(issue => (
              <div key={issue.id} style={styles.issueItem}>
                <span style={styles.badge}>{issue.status}</span>
                <h4 style={{margin: '5px 0'}}>{issue.title}</h4>
                <p style={{color: '#6b7280', fontSize: '0.9rem', margin: '5px 0'}}>📍 {issue.location} • {issue.date}</p>
                <p style={{margin: '10px 0 0 0'}}>{issue.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
