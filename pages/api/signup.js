import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/db';

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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f0f1a',
    }}>
      <div style={{
        background: '#1a1a2e',
        padding: '2rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '1.5rem' }}>
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
            <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#3d3d8f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ color: '#888', textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#7f7fff' }}>Log in</a>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  background: '#0f0f1a',
  border: '1px solid #2a2a4a',
  borderRadius: '8px',
  color: 'white',
  fontSize: '1rem',
  boxSizing: 'border-box',
};
