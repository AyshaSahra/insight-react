import React, { useState, useEffect } from 'react';
import assets from '../../constants/assets';

const PostPopup = ({ isOpen, onClose, post }) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments when the popup opens
  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, post]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Fetch the comments for the post
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${post.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
      setLoadingComments(false);
    } catch (err) {
      setError(err.message);
      setLoadingComments(false);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div
      className="fixed inset-0 flex items-center h-screen w-full justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div
        className="gap-0.5 grid grid-cols-2 w-full mx-28 h-[500px] mt-18"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Post content */}
        <div
          style={{ flex: 1 }}
          className="bg-white h-full py-5 px-11 shadow-xl flex flex-col justify-between rounded-md"
        >
          {/* Show post */}
          <div className="flex flex-col gap-3 pt-4 pb-14">
            <p className="font-Albert text-2xl font-bold mt-6">{post.title}</p>
            <p className="font-Algreya text-lg text-justify font-normal px-3">{post.body}</p>
          </div>

          {/* Like and comment section */}
          <div className="flex flex-col">
            <hr className="bg-black h-[1px] mx-0.5 mt-2" />
            <div className="flex flex-row justify-between h-full items-center py-4">
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

        {/* Right: Comments */}
        <div
          className="bg-white h-full py-5 px-11 shadow-xl overflow-hidden flex flex-col justify-start gap-4 rounded-md"
          style={{ flex: 1 }}
        >
          <p className="font-Inria text-2xl font-semibold mt-6">Comments</p>

          {loadingComments ? (
            <p>Loading comments...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex flex-col gap-5 overflow-y-scroll my-5 mx-2">
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments available.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#CCCCCC]" />
                      <p className="font-Inria font-medium text-xl">{comment.email}</p>
                    </div>
                    <p className="font-Algreya text-lg text-justify px-7 font-normal">{comment.body}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
