import { supabase } from '../lib/db';

export default function UserProfile({ profile }) {
  if (!profile) return <div className="card">User not found</div>;

  return (
    <>
      <div
        className="bg-cover"
        style={{ backgroundImage: `url(${profile.background_url || ''})` }}
      />
      <div className="card">
        <img src={profile.avatar_url || '/avatar.png'} className="avatar" alt="avatar" />
        <h1 className="username">{profile.username}</h1>
        <p className="bio">{profile.bio}</p>
        <div className="links">
          {profile.discord_link && <a href={profile.discord_link} target="_blank">Discord</a>}
          {profile.instagram_link && <a href={profile.instagram_link} target="_blank">Instagram</a>}
          {profile.cashapp_link && <a href={profile.cashapp_link} target="_blank">CashApp</a>}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username.toLowerCase())
    .single();

  return { props: { profile: data || null } };
}
