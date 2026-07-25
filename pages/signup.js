import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/db';
import ParticleBackground from '../components/ParticleBackground';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        username: username.toLowerCase().trim(),
        email: email,
        created_at: new Date().toISOString(),
      });

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    router.push(`/${username.toLowerCase().trim()}`);
  };

  return (
    <>
      <ParticleBackground />

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <div
          style={{
            background: 'rgba(26, 26, 46, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '2.5rem',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px',
            border: '1px solid rgba(127, 127, 255, 0.15)',
            boxShadow: '0 0 40px rgba(127, 127, 255, 0.12)',
          }}
        >
          <h1
            style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: '1.75rem',
              fontSize: '1.8rem',
              fontWeight: 700,
            }}
          >
            Create Your Page
          </h1>

          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />

            {error && (
              <p
                style={{
                  color: '#ff6b6b',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                background: 'linear-gradient(135deg, #4b4bcf, #3d3d8f)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 0 20px rgba(127, 127, 255, 0.3)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 0 28px rgba(127, 127, 255, 0.45)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 0 20px rgba(127, 127, 255, 0.3)';
              }}
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <p
            style={{
              color: '#888',
              textAlign: 'center',
              marginTop: '1.25rem',
              fontSize: '0.85rem',
            }}
          >
            Already have an account?{' '}
            <a href="/login" style={{ color: '#8f8fff', textDecoration: 'none' }}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.85rem',
  marginBottom: '1rem',
  background: 'rgba(15, 15, 26, 0.8)',
  border: '1px solid rgba(127, 127, 255, 0.2)',
  borderRadius: '10px',
  color: 'white',
  fontSize: '1rem',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.15s ease',
};
