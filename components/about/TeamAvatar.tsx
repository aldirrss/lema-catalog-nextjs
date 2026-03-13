'use client';

import Image from 'next/image';
import { useState } from 'react';

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo: string;
  initials: string;
  expertise?: string[];
  linkedin?: string;
  instagram?: string;
  portfolio?: string;
  contact?: string;
  projects?: string | number;
};

export default function TeamAvatar({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-2xl bg-brand-600 ring-4 ring-white shadow-lg transition-transform hover:scale-105">
      {/* Initials fallback */}
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
        {member.initials}
      </div>

      {/* Photo */}
      {!imgError && (
        <Image
          src={member.photo}
          alt={`Photo of ${member.name}`}
          fill
          sizes="( max-width: 640px ) 100vw, 128px"
          className="object-cover object-center relative z-10"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}
