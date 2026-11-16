import { Avatar } from "@/components/avatar";
import { DEFAULT_AUTHOR } from "@/lib/posts";

export function ProfileCard() {
  return (
    <aside id="profile" className="wall-panel wall-profile" aria-label="Profile">
      <div className="wall-profile-photo">
        <Avatar author={DEFAULT_AUTHOR} />
      </div>
      <h1 className="wall-profile-name">{DEFAULT_AUTHOR}</h1>
      <p className="wall-muted">Software Developer</p>
      <div className="wall-profile-tabs" role="presentation">
        <span className="wall-profile-tab wall-profile-tab-active">Wall</span>
        <span className="wall-profile-tab">Info</span>
        <span className="wall-profile-tab">Friends</span>
      </div>
    </aside>
  );
}
