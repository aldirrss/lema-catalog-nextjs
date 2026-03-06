'use client';

import Image from 'next/image';
import { useState } from 'react';

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  initials: string;
};

export default function TeamAvatar({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-brand-600 ring-4 ring-white shadow-md">
      {/* Initials selalu ada di belakang sebagai fallback */}
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
        {member.initials}
      </div>

      {/* Foto di atas initials — hilang jika error */}
      {!imgError && (
        <Image
          src={member.photo}
          alt={`Foto ${member.name}`}
          fill
          sizes="96px"
          className="object-cover object-center relative z-10"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}