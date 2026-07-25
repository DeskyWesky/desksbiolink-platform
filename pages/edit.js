import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/db';

export default function Edit() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/signup');

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(data);
    };
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from('profiles').update({
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      background_url: profile.background_url,
      discord_link: profile.discord_link,
      instagram_link: profile.instagram_link,
      cashapp_link: profile.cashapp_link,
    }).eq('id', user.id);

    setSaving(false);
    router.push(`/${profile.username}`);
  };

  if (!profile) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h1 className="username">Edit Your Page</h1>
      <form onSubmit={handleSave} className="edit-form">
        <label>Bio</label>
        <textarea value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />

        <label>Avatar URL</label>
        <input value={profile.avatar_url || ''} onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })} />

        <label>Background Image/Video URL</label>
        <input value={profile.background_url || ''} onChange={(e) => setProfile({ ...profile, background_url: e.target.value })} />

        <label>Discord Link</label>
        <input value={profile.discord_link || ''} onChange={(e) => setProfile({ ...profile, discord_link: e.target.value })} />

        <label>Instagram Link</label>
        <input value={profile.instagram_link || ''} onChange={(e) => setProfile({ ...profile, instagram_link: e.target.value })} />

        <label>CashApp Link</label>
        <input value={profile.cashapp_link || ''} onChange={(e) => setProfile({ ...profile, cashapp_link: e.target.value })} />

        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save & View Page'}</button>
      </form>
    </div>
  );
}
