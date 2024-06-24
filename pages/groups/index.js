import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/groups", {
          headers: {
            Authorization: token,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setGroups(data);
          // console.log("Groups", data);
        } else {
          console.error("Failed to fetch groups");
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ name: groupName }),
      });
      if (res.ok) {
        const group = await res.json();
        setGroups([...groups, group]); // Update state to include newly created group
        setGroupName(""); // Clear input field
      } else {
        console.error("Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Groups</h2>
        <form onSubmit={handleCreateGroup} className="mb-4">
          <div className="flex mb-4">
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Group name"
              required
            />
            <button
              type="submit"
              className="ml-2 text-white bg-blue-500 rounded px-3 py-2 hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
        <ul>
          {groups.map((group) => (
            <li key={group._id} className="mb-2">
              {group.name}
              <button
                onClick={() => router.push(`/groups/${group._id}`)}
                className="ml-2 text-blue-500 underline"
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
