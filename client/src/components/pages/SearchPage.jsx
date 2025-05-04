import { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar";
import assets from "../../constants/assets";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users only once
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  // Filter users locally when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();

    const filtered = allUsers.filter(user => {
      return (
        user.name?.toLowerCase().includes(q) ||
        user.username?.toLowerCase().includes(q) ||
        user.company?.name?.toLowerCase().includes(q) ||
        user.address?.city?.toLowerCase().includes(q)
      );
    });

    setResults(filtered);
  }, [searchQuery, allUsers]);

  return (
    <>
      <NavBar />
      <div className="h-screen w-full items-center justify-center flex px-10">
        <div className="bg-white mx-20 mt-24 py-8 h-4/5 rounded-4xl w-full flex flex-col items-center">
          <div style={{ flex: 0.1 }} className="w-full h-fit flex items-center justify-center">
            <input
              type="text"
              placeholder="Search by name, username, city or company..."
              className="w-1/2 h-10 py-3 rounded-2xl px-4 border-none bg-[#F4F5F8] focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 mt-8 overflow-y-scroll w-full h-fit" style={{ flex: 2 }}>
            {loading && (
              <div className="text-center text-[#485AAC] font-Inria text-xl">Loading users...</div>
            )}

            {!loading && results.length === 0 && searchQuery.trim() !== "" && (
              <div className="text-center text-gray-400 font-Inria text-lg">No users found</div>
            )}

            {results.map(user => (
              <div
                key={user.id}
                className="flex flex-row items-center mx-12 p-6 px-9 rounded-3xl justify-between bg-[#F4F5F8] my-2"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-row items-center">
                    <div className="h-10 w-10 rounded-full bg-[#CCCCCC]" />
                    <p className="font-Inria pl-3 font-semibold text-3xl text-[#002029]">
                      {user.name}
                    </p>
                  </div>
                  <div className="bg-white ml-11 rounded-4xl px-2.5 w-fit flex flex-row items-center justify-betweeen h-fit py-0.2 pb-0.2 gap-1">
                    <img src={assets.user} className="h-5 w-5" />
                    <p className="font-Kreon text-lg text-[#004052] font-normal truncate">
                      @{user.username}
                    </p>
                  </div>
                  <div className="ml-11 text-[#485AAC] font-Kreon text-md">
                    {user.address.city} • {user.company.name}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="bg-[#485AAC] text-[#ffffff] font-bold font-Inria text-xl px-[29px] py-[9px] rounded-2xl"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
