// app/(auth)/profile/page.jsx
'use client';

import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      {user ? (
        <>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}