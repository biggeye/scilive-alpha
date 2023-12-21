"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Avatar from "./Avatar";
import SignOut from "./SignOut";

export default function AccountForm() {
  const supabase = createClient();
  const [userId, setUserId] = useState(null); // Initialize userId as null

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else if (data?.user) {
          setUserId(data.user.id); // Set userId when user data is available
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [supabase]);

  const [loading, setLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    avatar_url: "",
  });

  const { first_name, last_name, username, avatar_url, email } = profileDetails;

  const getProfile = useCallback(async () => {
    if (userId) {
      // Check if userId is not null
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select(`first_name, last_name, email, username, avatar_url`)
          .eq("id", userId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setProfileDetails(data);
        }
      } catch (error) {
        alert("Error loading user data!");
      } finally {
        setLoading(false);
      }
    }
  }, [userId, supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile, userId]);

  async function updateProfile(e) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        first_name,
        last_name,
        username,
        email,
        avatar_url,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  return (
    <div className="p-4">
      <Avatar
        supabase={supabase}
        uid={userId}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setProfileDetails({ ...profileDetails, avatar_url: url });
          updateProfile();
        }}
      />
      <form onSubmit={updateProfile}>
        <div className="mt-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={first_name || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
          />
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={last_name || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
          />{" "}
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className={`mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          Update
        </button>
        {/* Button */}
      </form>
      <SignOut />
    </div>
  );
}
