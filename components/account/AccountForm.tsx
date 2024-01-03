"use client";
import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Avatar from "./Avatar";
import SignOut from "../Auth/SignOut";
import { createClient } from "@/utils/supabase/client"; // Import supabase
import { Database } from "@/types_db"; // Import your database types

// Define the structure of profile details
interface ProfileDetails {
  full_name: string | null;
  avatar_url: string | null;
}

export default function AccountForm() {
  const supabase = createClient();
  const user = supabase ? supabase.auth.getUser() : null;
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // rest of the code


  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    full_name: "",
    avatar_url: "",
  });

  // Destructure for convenience
  const { full_name, avatar_url } = profileDetails;


  const getProfile = async () => {
    if (user && userId) {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select(`full_name, avatar_url`)
          .eq("id", userId)
          .single() as { data: Database['public']['Tables']['users']['Row'], error: Error | null };

        if (data) {
          // Construct full_name from first_name and last_name
          setProfileDetails({
            full_name: data.full_name,
            avatar_url: data.avatar_url,
          });
        }
        if (error) throw error;
      } catch (error) {
        alert("Error loading user data: " + error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  useEffect(() => {
    getProfile();
  }, [userId]);

  const updateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID is not available!");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        full_name,
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
      getProfile();
      setLoading(false);
    }
  };

  const updateProfileFromUpload = async (avatar_url: string) => {
    if (!userId) {
      alert("User ID is not available!");
      return;
    }
  
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        full_name,
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
      getProfile();
      setLoading(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  return (

    <div className="p-4">
      <Avatar
        uid={userId}
        url={avatar_url}
        size={150}
        onUpload={(url: string) => {
          setProfileDetails({ ...profileDetails, avatar_url: url });
          updateProfileFromUpload(url);
        }}
        supabase={supabase}
      />
      <form onSubmit={updateProfile}>
        <div className="mt-4">
                  
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={full_name || ""}
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