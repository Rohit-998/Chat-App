import { useState, useEffect, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { colors, getColor } from "../../lib/utils";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import {
  UPDATE_PROFILE_ROUTE,
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
} from "@/utils/constants";

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColour, setSelectedColour] = useState(0);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setSelectedColour(userInfo.selectedColour ?? 0);
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo, userInfo.image]);

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please Setup Your Profile First");
    }
  };

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name Is Requird");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name Is Requird");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColour },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile Update SuccessFully");
          navigate("/chat");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleFileInput = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // ← correct way to get the File
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);

      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.image) {
       setUserInfo({...userInfo,image:response.data.image})
        toast.success("Profile Image Updated Successfully");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
       setUserInfo({ ...userInfo, image: null });
        setImage(null);
        toast.success("Profile Image Deleted Successfully");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  return (
    <div className="bg-[#1b1c24] h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl flex flex-col gap-10">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl text-white cursor-pointer hover:text-5xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Avatar */}
          <div
            className="flex justify-center relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-full w-full text-5xl flex items-center justify-center rounded-full border ${getColor(
                    selectedColour
                  )}`}
                >
                  {firstName ? firstName.charAt(0) : userInfo.email.charAt(0)}
                </div>
              )}
            </Avatar>

            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
                onClick={image ? handleDeleteImage : handleFileInput}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl" />
                ) : (
                  <FaPlus className="text-white text-3xl" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png,.jpg,.jpeg,.svg,.webp"
            />
          </div>

          {/* Input Fields */}
          <div className="flex flex-col gap-5 text-white items-center w-full">
            <Input
              placeholder="Email"
              type="email"
              disabled
              value={userInfo.email}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none w-full"
            />
            <Input
              placeholder="First Name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none w-full"
            />
            <Input
              placeholder="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none w-full"
            />

            {/* Color Selectors */}
            <div className="flex gap-4 mt-4 flex-wrap justify-center">
              {colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer ${color} transition-all duration-300 ${
                    selectedColour === index ? "outline-white/50 outline-2" : ""
                  }`}
                  onClick={() => setSelectedColour(index)}
                ></div>
              ))}

              {/* + Circle */}
              <div
                className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center cursor-pointer"
                onClick={() => setShowColorPicker(true)}
                title="More colors"
              >
                +
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 cursor-pointer hover:rounded-2xl"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>

        {/* Popup for More Colors */}
        {showColorPicker && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#2c2e3b] p-6 rounded-xl shadow-lg w-80 flex flex-wrap gap-3 justify-center">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer ${color} ${
                    selectedColour === index ? "outline-white/50 outline-2" : ""
                  }`}
                  onClick={() => {
                    setSelectedColour(index);
                    setShowColorPicker(false);
                  }}
                ></div>
              ))}
              <button
                className="mt-4 text-sm text-white underline"
                onClick={() => setShowColorPicker(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
