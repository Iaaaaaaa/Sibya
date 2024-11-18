import React from "react";

const UserProfile: React.FC = () => {
  return (
    <div className="flex gap-4 self-center max-w-full w-[180px]">
      <div className="flex shrink-0 bg-green-400 rounded-full h-[53px] w-[53px]" />
      <div className="flex flex-col my-auto">
        <div className="text-xl font-bold text-lime-950">Ara Matias</div>
        <div className="self-start text-xs font-medium text-black">
          211-00458
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
