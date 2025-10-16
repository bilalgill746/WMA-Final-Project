import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { followUser, unfollowUser } from "@/redux/slices/authSlice";

const useFollowUnfollow = (targetUserId) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [isLoading, setIsLoading] = useState(false);

  const isFollowing = user?.following?.includes(targetUserId) || false;

  const toggleFollow = async () => {
    if (!user || isLoading) return;

    setIsLoading(true);
    const wasFollowing = isFollowing;

    // Optimistic update: Update UI immediately
    if (wasFollowing) {
      dispatch(unfollowUser(targetUserId));
    } else {
      dispatch(followUser(targetUserId));
    }

    try {
      const res = await axios.get(
        `/api/users/followOrUnfollow/${targetUserId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        // Revert on failure
        if (wasFollowing) {
          dispatch(followUser(targetUserId));
        } else {
          dispatch(unfollowUser(targetUserId));
        }
        toast.error("Failed to update follow status");
      }
    } catch (error) {
      // Revert on error
      if (wasFollowing) {
        dispatch(followUser(targetUserId));
      } else {
        dispatch(unfollowUser(targetUserId));
      }
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isFollowing, toggleFollow, isLoading };
};

export default useFollowUnfollow;
