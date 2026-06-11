import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { normalizeApiData } from "@/utils/helpers";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    userService
      .getMe()
      .then((response) => {
        if (active) setProfile(normalizeApiData(response).user);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || "Unable to load profile");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { profile, loading, error, setProfile };
};
