import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { trackUsers, clearUsers } from "@/store/ActiveUsersSlice";

export default function UserTracker() {
  const dispatch = useDispatch(); // ✅ Now useDispatch is inside a child component

  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }

    const trackUser = async () => {
      try {
        const trackUsersData = { 
          sessionId,
          userId: null,
          ip: ""
        };

        await dispatch(trackUsers(trackUsersData))
          .unwrap()
          .then((result) => console.log("User Track Response:", result))
          .catch((error) => console.error("Error tracking user:", error));
      } catch (error) {
        console.error("Error tracking user:", error);
      }
    };

    trackUser();
    const interval = setInterval(trackUser, 60000); // Update every 60 sec

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const cleanup = async () => {
      try {
        const clearuserData = { 
            sessionId : "",
            userId: null,
            ip: ""
          };
        await dispatch(clearUsers(clearuserData))
          .unwrap()
          .then((result) => console.log("Clear user Response:", result))
          .catch((error) => console.error("Error clearing user:", error));
      } catch (error) {
        console.error("Error cleaning up users:", error);
      }
    };

    const interval = setInterval(cleanup, 300000);//300000 Run every 5 minutes
    return () => clearInterval(interval);
  }, [dispatch]);

  return null; // This component doesn't render anything
}
