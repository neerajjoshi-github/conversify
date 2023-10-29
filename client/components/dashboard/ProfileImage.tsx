import { FC } from "react";
import Image from "next/image";

interface ProfileImageProps {
  imageURL: string;
  size?: "sm" | "md" | "lg";
}

const ProfileImage: FC<ProfileImageProps> = ({ imageURL, size = "md" }) => {
  const sizes = { sm: 30, md: 48, lg: 52 };
  return (
    <div className="relative rounded-full overflow-hidden border-2 border-gray-600">
      <Image
        src={imageURL}
        width={sizes[size]}
        height={sizes[size]}
        alt="Profile Image"
        className=""
      />
    </div>
  );
};

export default ProfileImage;
