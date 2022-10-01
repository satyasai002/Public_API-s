import axios from "axios";
import { useState,useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Api from "../components/Api";
import {HiCubeTransparent} from 'react-icons/hi'

function Random(){
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    useEffect(()=>{
       getData();
       getCat();
    },[])

    const getData= async ()=>{
        const res =  await axios.get("https://api.publicapis.org/random");
        setData(res.data.entries[0]);
        setLoading(true);

    }
    const getCat = async () => {
      const res = await axios.get("https://api.publicapis.org/categories");
      setCategories(res.data.categories);
    };
    return (
      <div>
        <Nav categories={categories} loading={loading} />
        {!loading && (
          <div className="hero h-screen container  max-w-screen-lg mx-auto pb-10 flex justify-center">
            <HiCubeTransparent
              className="animate-spin"
              size={50}
            ></HiCubeTransparent>
          </div>
        )}
        <div>{loading && <Api data={data} loading={loading} />}</div>
        <Footer />
      </div>
    );
}
export default Random;