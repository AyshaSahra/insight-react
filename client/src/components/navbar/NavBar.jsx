import {useNavigate } from "react-router-dom"
import assets from "../../constants/assets";

export default function NavBar(){
    const navigate = useNavigate()
    return(
        <>
        <div className="w-full h-[75px] gradient flex items-center p-11 justify-between flex-row fixed top-0 z-50">
            <div>
             <a className="font-Aboreto text-[38px] pl-5 text-white">
                Insights
            </a>
            </div>
            <div className="flex flex-row gap-14 pr-20 items-center">
                <a onClick={() => { navigate('/'); console.log('to the link'); }}
                    className="font-Inria text-[26px] text-white cursor-pointer"
                    >
                    Home
                </a>
                <a className="font-Inria text-[26px] text-white">
                    About
                </a>
                <a onClick={() =>navigate('/search')} className="ml-16 cursor-pointer">
                    <img src={assets.search} className="w-8 h-8"/>
                </a>
            </div>
        </div>
        </>
    )
}