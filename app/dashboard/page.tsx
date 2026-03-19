"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page-container">
        <div className="ambient-orb orb-indigo"></div>
        <div className="glass-panel" style={{ maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--danger)' }}>
            <svg style={{ width: '32px', height: '32px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '16px' }}>Access Restricted</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.5 }}>Please authenticate with your verified institution credentials to view the dashboard.</p>
          <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="btn-primary">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const user = session.user as any;

  const StatItem = ({ label, value, highlight = false }: { label: string, value: any, highlight?: boolean }) => (
    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: '1.125rem', fontWeight: highlight ? 600 : 400, color: highlight ? 'var(--accent-blue)' : 'var(--text-primary)' }}>
        {value || "N/A"}
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', paddingBottom: '60px' }}>
      <div className="ambient-orb orb-blue"></div>
      <div className="ambient-orb orb-indigo" style={{ top: '40%' }}></div>
      <div className="ambient-orb orb-blue" style={{ bottom: '-10%', right: '10%', opacity: 0.5 }}></div>

      {/* Header */}
      <header className="dashboard-header glass-panel" style={{ margin: '24px auto', borderRadius: '100px', padding: '16px 32px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="header-user">
          {user?.image ? (
            <img src={user.image} alt={user.name!} className="avatar" />
          ) : (
            <div className="avatar">{(user?.name?.charAt(0) || "S").toUpperCase()}</div>
          )}
          <div>
            <h1 style={{ margin: '0 0 4px 0', fontSize: '1.5rem', fontWeight: 600 }}>
              {user?.name} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>({user?.usn || "No USN"})</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 8px var(--accent-emerald)', animation: 'pulseGlow 2s infinite' }}></span>
              {user?.email} | {user?.branch || "General Branch"}
            </div>
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary">
          Sign Out
        </button>
      </header>

      {/* Main Content Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Highlight Section: Academic Core */}
        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '4px', height: '20px', background: 'var(--accent-indigo)', borderRadius: '4px' }}></span>
            Academic Overview
          </h2>
          <div className="dashboard-grid" style={{ padding: 0, gap: '20px' }}>

            <div className="glass-panel stat-card" style={{ padding: '24px', borderTop: '2px solid var(--accent-indigo)' }}>
              <div className="stat-label">CGPA (Current Sem)</div>
              <div className="stat-value text-gradient-accent" style={{ fontSize: '3rem' }}>{user?.cgpa || "N/A"}</div>
            </div>

            <div className="glass-panel stat-card" style={{ padding: '24px' }}>
              <div className="stat-label">10th Percentage</div>
              <div className="stat-value" style={{ fontSize: '2.5rem' }}>{user?.tenthPercentage || "N/A"}%</div>
            </div>

            <div className="glass-panel stat-card" style={{ padding: '24px' }}>
              <div className="stat-label">12th / Diploma</div>
              <div className="stat-value" style={{ fontSize: '2.5rem' }}>{user?.twelfthPercentage || "N/A"}%</div>
            </div>
          </div>
        </section>

        {/* CSS Grid for Responsive columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>

          {/* Left Column: Personal Information */}
          <section className="glass-panel" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>Personal Profile</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <StatItem label="Personal Email" value={user?.personalEmail} />
              <StatItem label="Mobile Number" value={user?.phone} />
              <StatItem label="Date of Birth" value={user?.dob} />
              <StatItem label="Gender" value={user?.gender} />
              <StatItem label="Native State" value={user?.state} />
              <StatItem label="Native City" value={user?.city} />
              <StatItem label="Admission Quota" value={user?.admissionQuota} />
            </div>
          </section>

          {/* Right Column: Status & Placements */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            <section className="glass-panel" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', color: 'var(--danger)' }}>Backlogs History</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(239, 68, 68, 0.05)', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Active Backlogs</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 600, color: Number(user?.activeBacklogs) > 0 ? 'var(--danger)' : 'var(--accent-emerald)' }}>
                    {user?.activeBacklogs || "0"}
                  </span>
                </div>
                <StatItem label="Current Backlogs (Yes/No)" value={user?.currentBacklogs} />
                <StatItem label="NPTEL Backlog" value={user?.nptelBacklog} />
              </div>
            </section>

            <section className="glass-panel" style={{ padding: '32px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', color: 'var(--accent-emerald)' }}>Internships & Placements</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <StatItem label="Internship Companies" value={user?.internshipCompanies} highlight />
                <StatItem label="Stipend" value={user?.stipend} highlight />
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}