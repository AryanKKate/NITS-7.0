import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../Components/Navbar";
import axiosInstance from "../AxiosInstance";

const CommunityPage = () => {
  const [communities, setCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [memberFilter, setMemberFilter] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await axiosInstance.get("/communities");
        setCommunities(res.data);
        setFilteredCommunities(res.data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };
    fetchCommunities();
  }, []);

  const handleSearch = () => {
    let filtered = communities;

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (community) => community.category === categoryFilter
      );
    }

    if (memberFilter) {
      filtered = filtered.filter(
        (community) => community.members <= parseInt(memberFilter)
      );
    }

    setFilteredCommunities(filtered);
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      const res = await axiosInstance.post(`/communities/join`, { communityId });
      console.log("Joined community:", res.data);
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  return (
    <div className="bg-gray-900">
      <Navbar />

      <div className="bg-gray-900 min-h-screen p-8">
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Community Hub
        </h1>
        
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Max Members"
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 text-gray-900"
            />
            <select
              onChange={(e) => setCategoryFilter(e.target.value)}
              value={categoryFilter}
              className="px-4 py-2 rounded-lg border-2 text-gray-900"
            >
              <option value="All">All Categories</option>
              <option value="Tech">Tech</option>
              <option value="Finance">Finance</option>
              <option value="Health">Health</option>
            </select>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCommunities.map((community) => (
            <motion.div
              key={community.id}
              className="bg-gray-700 text-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold">{community.name}</h3>
              <p className="mt-2 text-lg">Category: {community.category}</p>
              <p className="mt-2 text-lg">Members: {community.members}</p>

              <button
                onClick={() => setSelectedCommunity(community)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                View/Join Community
              </button>
            </motion.div>
          ))}
        </div>

        {selectedCommunity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-1/2">
              <h3 className="text-2xl font-semibold">{selectedCommunity.name} Details</h3>
              <p className="mt-2">Category: {selectedCommunity.category}</p>
              <p className="mt-2">Description: {selectedCommunity.description}</p>
              <p className="mt-2">Members: {selectedCommunity.members}</p>

              <div className="mt-4">
                <button
                  onClick={() => handleJoinCommunity(selectedCommunity.id)}
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Join Community
                </button>
              </div>
              <button
                onClick={() => setSelectedCommunity(null)}
                className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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

export default CommunityPage;
