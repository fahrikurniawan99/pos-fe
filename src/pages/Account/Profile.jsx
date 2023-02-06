import React from "react";
import { useAuth } from "../../app/features/auth/reducer";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Profile</h2>
      <div className="grid grid-cols-2 py-5 border-b">
        <p>Nama</p>
        <p>{user.full_name}</p>
      </div>
      <div className="grid grid-cols-2 py-5">
        <p>Email</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
