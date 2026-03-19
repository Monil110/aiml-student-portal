"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { status } = useSession();
  const [missingStudents, setMissingStudents] = useState<{ usn: string, name: string }[]>([]);
  const [loadingMissing, setLoadingMissing] = useState(true);

  useEffect(() => {
    fetch("/api/missing-usns")
      .then(res => res.json())
      .then(data => {
        if (data.missing) setMissingStudents(data.missing);
        setLoadingMissing(false);
      })
      .catch(err => setLoadingMissing(false));
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', padding: '60px 20px' }}>
      <div className="ambient-orb orb-blue"></div>
      <div className="ambient-orb orb-indigo" style={{ bottom: '-20%', right: '-10%' }}></div>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px', zIndex: -1 }}></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Header / Hero Section */}
        <div className="glass-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>AIML Student <span className="text-gradient-accent">Placement Portal</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Welcome to the platform. Please sign in to review your academic and personal details. Ensure that all the information is correct and report any discrepancies if found.

          </p>
          <Link href="/login" style={{ textDecoration: 'none' }}>
            {status === "authenticated" ? (
              <button className="btn-primary" style={{ display: 'inline-flex', width: 'auto', padding: '16px 48px' }}>Enter Dashboard</button>
            ) : (
              <button className="btn-primary" style={{ display: 'inline-flex', width: 'auto', padding: '16px 48px' }}>Sign in to Portal</button>
            )}
          </Link>
        </div>

        {/* Content Section: Support & Missing USNs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', alignItems: 'flex-start' }}>

          <div className="glass-panel" style={{ flex: '1 1 400px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <svg style={{ width: '24px', height: '24px', color: 'var(--accent-indigo)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>SPCs Contact Support</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>If there is any problem in the data or logging into the portal, please contact your respective section SPCs</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <div style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>A Section Representatives</div>
                <div style={{ fontSize: '1rem', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}><strong style={{ color: 'var(--text-primary)' }}>Kavya Jain:</strong> <span style={{ color: 'var(--text-secondary)' }}>+91 93519 33986</span></div>
                <div style={{ fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}><strong style={{ color: 'var(--text-primary)' }}>Monil Mehta:</strong> <span style={{ color: 'var(--text-secondary)' }}>+91 91102 34906</span></div>
              </div>
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <div style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>B Section Representatives</div>
                <div style={{ fontSize: '1rem', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}><strong style={{ color: 'var(--text-primary)' }}>Vineet:</strong> <span style={{ color: 'var(--text-secondary)' }}>+91 95079 49221</span></div>
                <div style={{ fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}><strong style={{ color: 'var(--text-primary)' }}>Yuvaraj:</strong> <span style={{ color: 'var(--text-secondary)' }}>+91 63034 76601</span></div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ flex: '1 1 400px', padding: '32px', display: 'flex', flexDirection: 'column', maxHeight: '550px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--danger)' }}>Profiles Pending Registration</h2>
              <span style={{ padding: '6px 14px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                {loadingMissing ? "Loading..." : `${missingStudents.length} Missing`}
              </span>
            </div>

            <div style={{ overflowY: 'auto', paddingRight: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {loadingMissing ? (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>Scanning database...</div>
              ) : missingStudents.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--accent-emerald)', fontSize: '1.1rem', fontWeight: 500 }}>🎉 All student profiles are successfully registered!</div>
              ) : (
                missingStudents.map((student, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)', fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)', width: '130px' }}>{student.usn}</span>
                    <span style={{ flex: 1, color: 'var(--text-primary)', textAlign: 'right' }}>{student.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}