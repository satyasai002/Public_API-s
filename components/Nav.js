import { useState, useEffect } from "react";
import {useTheme} from 'next-themes';
import { HiSun, HiMoon, HiMenu, HiChevronRight } from "react-icons/hi"; 
import SideBarLoading from "./SideBarLoading";
import Link from "next/link";

function Nav({categories, loading }) {
  const [isOpen,setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState(categories);
  const {systemTheme, theme , setTheme} = useTheme();
  const [mounted,setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true);
  },[])
  const renderThemeChanger = () =>{
    if(!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if(currentTheme == 'dark'){
      return(
        <HiSun size={30} role="button" onClick={()=>setTheme('light')}/>
      )
    } else{
      return <HiMoon size={30} role="button" onClick={() => setTheme("dark")} />;
    }
  }
  useEffect(() => {
    setFilteredResults(categories)
  }, [categories]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue.toLowerCase());
    if (searchInput !== "") {
      const filteredData = categories.filter((item) => {
        return item.toLowerCase().search(searchInput) != -1;
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(categories);
    }
  }
  return (
    <>
      <div className="flex flex-wrap justify-between items-center mx-auto font-mono back  ">
        <Link href="/">
          <a className="text-3xl sm:text-5xl font-semi-bold p-4 cursor-pointer">
            Public APIs
          </a>
        </Link>
        <div className="flex right-0 md:text-2xl font-semi-bold cursor-pointer mx-8">
          <div className="hidden lg:flex ">
            <div className="flex my-2 p-2 px-4">{renderThemeChanger()}</div>
            {loading && (
              <>
                <div className="rounded-lg bg-green-500 h-2 p-2 my-6 cursor-default"></div>
                <p className="py-4 p-2 cursor-default">Status</p>
              </>
            )}
            {!loading && (
              <>
                <div className="rounded-lg bg-red-500 h-2 p-2 my-6 cursor-default">
                  {" "}
                </div>
                <p className="py-4 p-2 cursor-default">Status</p>
              </>
            )}
            <Link href="/random">
              <a className="sm: p-4">Random-API</a>
            </Link>
          </div>
          <button className="p-4 " onClick={() => setIsOpen(!isOpen)}>
            <HiMenu size={35} role="button"></HiMenu>
          </button>
        </div>
      </div>
      <div
        className={` ${
          isOpen ? "" : "hidden"
        } p-2 w-1/2 sm:text-xl h-screen bg-white dark:bg-[#6d41a1] z-20 fixed top-0   right-0 shadow-lg rounded-md   sm:w-72  peer-focus:right-0 "`}
      >
        <div className="flex">
          <button onClick={() => setIsOpen(!isOpen)}>
            <HiChevronRight
              size={35}
              className="sm:w-[40px] hover:shadow-lg rounded-md"
            ></HiChevronRight>
          </button>
          <div className=" lg:hidden my-2 p-3">{renderThemeChanger()}</div>
        </div>

        <div className=" w-full flex h-screen justify-center">
          <div className=" flex flex-col scrollbar-hide overflow-y-auto items-center">
            <Link href="/random">
              <a className="p-2 m-2 lg:hidden font-mono bg-black text-white w-full text-center rounded-md hover:bg-white hover:text-black ">
                Random API
              </a>
            </Link>
            <input
              onChange={(e) => searchItems(e.target.value)}
              className="my-3 p-2 bg-gray-200"
              placeholder="Search"
            ></input>
            <div className="  mb-[72px]">
              {!loading && <SideBarLoading />}
              {filteredResults &&
                filteredResults.map((item, i) => (
                  <div
                    key={i}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-black hover:font-medium w-full text-center rounded-md "
                  >
                    <Link href={`/${item}`}>
                      <a>{item}</a>
                    </Link>
                  </div>
                ))}
              <p className="m-8">Public-APIs ™ | © 2022</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Nav;