import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfileSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // ---- Profile Change Handler
  const imageChange = (e) => {
    const file = e.target.files[0];
    // Check file condition
    if (file) {
      // update profile
      setImage(file);

      // Generate url
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };
  // ---- Profile Remove Handler
  const imageRemove = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  // ---- Select Profile Pic
  const selectProfilePic = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={imageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />

          <button type="button" className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1" onClick={selectProfilePic}>
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img src={previewUrl} alt="Profile Photo 404" className="w-20 h-20 rounded-full object-cover" />{" "}
          <button type="button" className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1" onClick={imageRemove}>
            <LuTrash />
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;
