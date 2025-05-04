import assets from "../../constants/assets";
import PostCard from "../cards/PostCard";
import NavBar from "../navbar/NavBar";

export default function HomePage(){
    return(
        <>          
             <NavBar/>
             <div className="w-full h-screen flex flex-row">
                <div style={{flex: 2}} className="pt-30 pb-14 overflow-y-scroll">
                        <PostCard/>
                        
                </div>
                <div style={{flex:1.2}} className="">
                    <div className=" bg-white mx-[18px] field-sizing-fixed mt-[170px] rounded-4xl flex flex-col items-end px-6 py-5">
                        <div className="flex flex-row gap-3 w-full items-center my-5">
                            <img src={assets} className="bg-[#cccccc] rounded-full h-12 w-12"/>
                            <div className="rounded-2xl text-start bg-[#F4F5F8] w-full py-4 px-6">
                                <p>Ask or Share something...</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 items-center bg-[#485AAC] px-5 py-1.5 rounded-2xl">
                            <img src={assets.create} className="h-5 w-5"/>
                            <p className="text-white">Post</p>
                        </div>
                    </div>
                </div>
             </div>
        </>
    )
}