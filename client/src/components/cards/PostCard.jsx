import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import assets from "../../constants/assets";
import PostPopup from "./PostPopup";

export default function PostCardList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

const openPostPopup = (post) => {
    setSelectedPost(post);
    setPopupOpen(true);
};

const closePostPopup = () => {
    setPopupOpen(false);
    setSelectedPost(null);
};


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/random-posts");
                setPosts(res.data); // All randomized posts
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return <p className="text-center mt-10 text-gray-600">Loading...</p>;
    }

    return (
        <div className="mt-7 space-y-10">
            {posts.map(({ post, user }) => (
                <div
                    key={post.id}
                    className="h-fit justify-center rounded-4xl mx-10 bg-white flex flex-col"
                >
                    <div className="flex flex-row pt-8 justify-between items-center px-14">
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-row items-center gap-1.5">
                                <div className="h-12 w-12 rounded-full bg-[#CCCCCC]" />
                                <p className="font-Inria font-medium text-[27px]">{user.name}</p>
                            </div>
                        </div>
                        <button
                        onClick={() => {
                          console.log("Navigating to profile:", user.id); // Debugging line
                          navigate(`/profile/${user.id}`);
                        }}
                        className="bg-[#485AAC] cursor-pointer text-white font-bold font-Inria text-base px-[22px] py-[6px] rounded-xl"
                      >
                        View Profile
                      </button>
                    </div>

                    <div onClick={() => openPostPopup(post)} className="cursor-pointer">
                        <div className="flex flex-col py-6 px-18 gap-2 justify-center h-fit">
                            <p className="font-Albert text-[20px] font-medium">{post.title}</p>
                            <p className="font-Algreya text-lg text-justify">{post.body}</p>
                        </div>

                        <div className="bg-black h-[1px] mx-14" />
                        <div className="flex flex-row justify-between py-4 mb-1 px-18">
                            <div className="flex flex-row gap-14">
                                <div className="flex flex-row gap-1 items-center">
                                    <img src={assets.like} className="w-6 h-6 pb-0.5" />
                                    <p className="font-Inria text-lg">Like</p>
                                </div>
                                <div className="flex flex-row gap-1 items-center">
                                    <img src={assets.comment} className="w-6 h-6 pt-0.5" />
                                    <p className="font-Inria text-lg">Comment</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-1 items-center">
                                <img src={assets.view} className="w-6 h-6" />
                                <p className="font-Inria text-lg">Views</p>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
            {popupOpen && selectedPost && (
                <PostPopup isOpen={popupOpen} onClose={closePostPopup} post={selectedPost} />
            )}

        </div>
    );
}
