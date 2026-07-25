export default function Home() {
  return (
    <div className="card">
      <img src="/avatar.png" className="avatar" alt="avatar" />
      <h1 className="username">yourname</h1>
      <p className="bio">your bio text</p>

      <div className="links">
        <a href="https://discord.com/users/YOURID" target="_blank">Discord</a>
        <a href="https://instagram.com/yourhandle" target="_blank">Instagram</a>
        <a href="https://cash.app/$yourcashtag" target="_blank">CashApp</a>
      </div>

      <a href="/signup" className="make-own-btn">Click To Make Your Own</a>
    </div>
  );
}
