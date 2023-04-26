import { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import PostModal from "./modal/PostModal";
import PostCard from "./PostCard";
import Image from "./Image";
import { getUser } from "../api/user";
import { getPosts } from "../api/post";

const HomeComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getUserData() {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    }
    getUserData();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8000/subscribe/1`);
    eventSource.addEventListener("message", (event) => {
      console.log(event.data);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <div className="w-full leading-[21px]  text-[14px] font-[500px] font-system-ui">
        <HomeHeader user={user} />
        <div className="bg-[#e5e6d5]  flex align-top pt-8 gap-10 justify-center">
          {/* RIght Side Bar */}
          {/* <div className="w-[20%] flex  flex-col gap-2 h-fit">
            <div className="bg-white w-auto h-[50%] rounded-lg">
              
            </div>
            
          </div> */}
          {/* Main Card */}
          <div className="w-[40%] gap-2 ">
            {/* Post Container */}
            <div className="w-[100%]  bg-white flex items-center h-[70px] rounded-lg">
              <Image src={"https://source.unsplash.com/BP3EU4nq_ao/"} />

              <button
                className="h-[60%] rounded-full w-[85%] outline-none text-left px-5 bg-[#f5f5f5] hover:bg-[#dcdbdb]"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Start Post
              </button>
            </div>
            {posts?.map((post) => {
              return <PostCard key={post._id} post={post} user={user} />;
            })}
            {/* <PostCard key/> */}
          </div>
          {/* Left Side Bar */}
          {/* <div className="w-[20%] bg-white h-fit">
            <div>Poepl you might know</div>
          </div> */}
        </div>
      </div>
      <PostModal isOpen={modalOpen} setIsOpen={setModalOpen} user={user} />
    </>
  );
};

export default HomeComponent;
