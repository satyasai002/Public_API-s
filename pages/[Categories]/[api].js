import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Api from "../../components/Api";

function api(){
    const router = useRouter();
    const api = router.query.api;
    const [data,setData] = useState([]);
    const [entry,setEntry]=useState([]);
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
      getdata();
      searchItems(api);
    }, [data]);

    const getdata = async () => {
      const res = await axios.get("https://api.publicapis.org/entries");
      setData(res.data.entries);
      const rescat = await axios.get("https://api.publicapis.org/categories");
      setCategories(rescat.data.categories);
      setLoading(true);
    };
    const searchItems = (searchValue) => {
      if (searchValue !== "") {
        const filteredData = data.filter((item) => {
          return item.API.search(searchValue) != -1;
        });
        setEntry(filteredData[0]);
      }
    };

    return (
      <>
        <Nav categories={categories} loading={loading} />
        {!loading && (
          <div className="hero h-screen container max-w-screen-lg mx-auto pb-10 flex justify-center">
            <img className="" src="/loading.svg"></img>
          </div>
        )}
        <div>{loading && <Api data={entry} loading={loading}></Api>}</div>
        <Footer />
      </>
    );
}
export default api;