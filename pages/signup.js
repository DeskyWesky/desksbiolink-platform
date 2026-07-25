import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/db';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) return setError(signUpError.message);

    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: username.toLowerCase(),
    });
    if (profileError) return setError(profileError.message);

    router.push('/edit');
  };

  return (
    <div className="card">
      <h1 className="username">Create Your Page</h1>
      <form onSubmit={handleSignup} className="edit-form">
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p style={{ color: '#ff6b6b', fontSize: '13px' }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
