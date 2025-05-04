import { useParams } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import assets from "../../constants/assets";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PostPopup from "../cards/PostPopup";

export default function ProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPosts, setShowPosts] = useState(false);
    const postSectionRef = useRef(null); // For scrolling to posts

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchPosts = async () => {
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
                const filteredPosts = res.data.filter(post => post.userId === parseInt(userId));
                setPosts(filteredPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        console.log("Profile Page loaded for userId:", userId);

        fetchUser();
        fetchPosts();
    }, [userId]);

    if (!user) {
        return <p className="text-center mt-10 text-gray-600">Loading...</p>;
    }

    const openPostPopup = (post) => {
        setSelectedPost(post);
        setIsOverlayOpen(true);
    };

    const closePostPopup = () => {
        setIsOverlayOpen(false);
        setSelectedPost(null);
    };

    const handleViewPosts = () => {
        setShowPosts(prev => {
            const next = !prev;
            if (next) {
                setTimeout(() => {
                    const offsetTop = postSectionRef.current?.offsetTop || 0;
                    window.scrollTo({
                        top: offsetTop - 110, // adjust -60 if you have a fixed header
                        behavior: "smooth"
                    });
                }, 100); // slight delay to ensure DOM is updated
            }
            return next;
        });
    };

    return (
        <>
            <NavBar />
            <div className="h-screen overflow-y-scroll w-full items-center justify-center flex px-10">
                <div className="bg-white mx-26 mt-24 py-4 h-fit rounded-4xl w-full">
                    <div className="w-full flex flex-row justify-between items-center px-14 py-7 pt-10">
                        <div className="flex flex-row items-center justify-between w-full gap-4">
                            <div className="flex flex-row items-start gap-1">
                                <div className="h-18 w-18 rounded-full bg-[#CCCCCC]" />
                                <div className="flex flex-col items-start gap-1.5">
                                    <p className="font-Inria pl-3 font-semibold text-4xl text-[#002029]">
                                        {user.name}
                                    </p>
                                    <div className="bg-white rounded-4xl px-2.5 flex flex-row items-center justify-center h-fit py-0.2 pb-0.2 gap-1">
                                        <img src={assets.user} className="h-5 w-5" />
                                        <p className="font-Kreon text-lg text-[#1f1f1f] font-normal">
                                            {user.username}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleViewPosts}
                                className="bg-[#485AAC] text-[#ffffff] font-bold font-Inria text-xl px-[29px] py-[9px] rounded-2xl"
                            >
                                {showPosts ? "Hide Posts" : "View Post"}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-7 px-22 py-9 w-full font-Albert text-xl">
                        <div className="flex flex-row items-start gap-60">
                            <div className="flex flex-col gap-7 items-start">
                                <div className="flex flex-row gap-1 items-center">
                                    <img src={assets.location} className="w-6.5 h-6.5" />
                                    <p>{user.address.city}</p>
                                </div>
                                <div className="flex flex-row gap-1 items-start">
                                    <img src={assets.website} className="w-6.5 h-6.5" />
                                    <p>{user.website}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-7 items-start">
                                <div className="flex flex-row gap-1">
                                    <img src={assets.mail} className="w-6 h-6" />
                                    <p>{user.email}</p>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <img src={assets.phone} className="w-6 h-6" />
                                    <p>{user.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                            <div className="flex flex-row gap-1">
                                <img src={assets.company} className="w-6 h-6" />
                                <p>{user.company.name}</p>
                            </div>
                            <div className="px-8">
                                <p className="text-sm font-Algreya">{user.company.catchPhrase}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showPosts && (
                <div ref={postSectionRef} className="h-fit m-5">
                    <div className="h-fit items-center flex-col justify-center flex px-24 gap-7">
                        <p className="font-inria font-bold text-4xl mb-4">Posts</p>
                        <div className="grid grid-cols-2 gap-6 w-full">
                            {posts.map(post => (
                                <div
                                    key={post.id}
                                    className="bg-white w-full h-89 p-9 flex flex-col rounded-3xl justify-evenly"
                                >
                                    <div className="flex flex-row items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-[#CCCCCC]" />
                                        <p className="font-Inria font-medium text-2xl">{user.username}</p>
                                    </div>
                                    <div className="flex flex-col gap-3 pt-4 pb-16 cursor-pointer "
                                     onClick={() => openPostPopup(post)}>
                                        <p className="font-Albert text-2xl font-bold mt-6 cursor-pointer hover:underline"                                        >
                                            {post.title.length > 25 ? post.title.slice(0, 25) + "..." : post.title}
                                        </p>
                                        <p className="font-Algreya text-lg text-justify font-normal cursor-pointer"
                                        >
                                            {post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body}
                                        </p>
                                    </div>
                                    <hr className="bg-black h-[1px] mx-0.5 mt-1" />
                                    <div  onClick={() => openPostPopup(post)}
                                    className="flex flex-row justify-between items-center py-5 mt-auto">
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
                            ))}
                            <PostPopup
                                isOpen={isOverlayOpen}
                                onClose={closePostPopup}
                                post={selectedPost}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
