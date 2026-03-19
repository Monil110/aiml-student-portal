"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: '20px' }}>
      {/* Background Orbs */}
      <div className="ambient-orb orb-blue"></div>
      <div className="ambient-orb orb-indigo"></div>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px', zIndex: -1 }}></div>

      {/* Login Navigation Back */}
      <Link href="/" style={{ position: 'absolute', top: '40px', left: '40px', color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
        <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Home
      </Link>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        {/* RVCE Logo */}
        <div style={{ marginBottom: '2rem', width: '100px', height: '100px', borderRadius: '24px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px -10px rgba(255, 255, 255, 0.1)', animation: 'pulseGlow 6s ease-in-out infinite', overflow: 'hidden', padding: '10px' }}>
          <img src="/rvce_logo.jpeg" alt="RVCE Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Student <span className="text-gradient-accent">Login</span></h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
          Authenticate using your official rvce email <strong style={{ color: 'var(--accent-blue)' }}>@rvce.edu.in</strong> identity.
        </p>
        <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="btn-primary" style={{ marginBottom: '1.5rem' }}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="btn-icon" alt="Google logo" />
          Sign in with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        </div>
      </div>
    </div>
  );
}