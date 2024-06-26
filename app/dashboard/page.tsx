'use client'

import { SignOutButton, useClerk } from '@clerk/nextjs';

const Dashboard = () => {
  const { signOut } = useClerk();

  return (
    // Clicking on this button will sign out a user
    // and reroute them to the "/" (home) page.
    <SignOutButton>
      <button>
        Sign out
      </button>
    </SignOutButton>

    
  );
};

export default Dashboard;