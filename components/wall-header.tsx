import Link from "next/link";

export function WallHeader() {
  return (
    <header className="wall-topbar">
      <div className="mx-auto flex h-full max-w-[900px] items-center justify-between gap-4 px-3">
        <Link href="/" className="wall-logo">
          the wall <span>2008</span>
        </Link>
        <nav aria-label="Wall navigation" className="wall-nav">
          <a href="#feed" aria-current="page">
            Home
          </a>
          <a href="#profile">Profile</a>
          <span>Friends</span>
        </nav>
      </div>
    </header>
  );
}
