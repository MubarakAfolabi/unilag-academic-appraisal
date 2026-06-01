import React from 'react';
import { userProfile } from '../constant/reviewerDashboard';
import { User, SquarePen } from 'lucide-react';

export const ReviewersProfileAbout: React.FC = () => {
  return (
    <div className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 rounded-xl flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-[hsla(210,79%,46%,1)] text-lg font-semibold md:text-xl">
          <User className="w-5 h-5"/>
          <span>About Me</span>
        </h2>
        <button className="text-blue-600 hover:text-blue-700 transition-colors">
          <SquarePen className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 border border-gray-200 rounded-lg mb-6 bg-white">
        <p className="text-sm text-gray-700 leading-relaxed">
          {userProfile.rank} of {userProfile.department} with research interests in {userProfile.specilaization} and Data Systems.
        </p>
      </div>

      <div className="grid grid-cols-[120px_1fr] gap-y-3 text-base">
        <span className="text-gray-900 font-semibold">Specialization:</span>
        <span className="text-gray-700 ml-45 font-medium">{userProfile.specilaization}</span>

        <span className="text-gray-900 font-semibold">Email:</span>
        <span className="text-gray-700 ml-45 font-medium">{userProfile.email}</span>

        <span className="text-gray-900 font-semibold">Phone:</span>
        <span className="text-gray-700 ml-45 font-medium">{userProfile.phone_number}</span>

        <span className="text-gray-900 font-semibold">Department:</span>
        <span className="text-gray-700 ml-45 font-medium">{userProfile.department}</span>

        <span className="text-gray-900 font-semibold">Faculty:</span>
        <span className="text-gray-700 ml-45 font-medium">{userProfile.faculty}</span>

        <span className="text-gray-900 font-semibold">Rank:</span>
        <span className="text-gray-700 ml-45 font-medium">{userProfile.rank}</span>

        <span className="text-gray-900 font-semibold">Date Joined:</span>
        <span className="text-gray-700 ml-45 font-medium">{userProfile.dateJoined}</span>
      </div>
    </div>
  );
};
