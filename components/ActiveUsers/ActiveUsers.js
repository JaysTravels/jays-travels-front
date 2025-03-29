import { useState, useEffect } from "react";

const ActiveUsers = () => {
    const [activeUsers, setActiveUsers] = useState(0);

    useEffect(() => {
        const fetchActiveUsers = async () => {
            try {
                const res = await fetch("/api/active-users");
                const data = await res.json();
                setActiveUsers(data.activeUsers);
            } catch (error) {
                console.error("Error fetching active users:", error);
            }
        };

        fetchActiveUsers();
        const interval = setInterval(fetchActiveUsers, 10000); // Refresh every 10 sec

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: "10px", background: "#f5f5f5", borderRadius: "5px" }}>
            <strong>Active Users:</strong> {activeUsers}
        </div>
    );
};

export default ActiveUsers;
