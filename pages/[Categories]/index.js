import { useRouter } from "next/router";
import {useEffect,useState} from 'react';
import Apis from "../../components/Apis";
import Pagination from "../../components/Pagination";
import Nav from "../../components/Nav";
import axios from "axios";
import Footer from "../../components/Footer";

function Categories() {
  const router = useRouter();
  const cat = router.query.Categories;
  const [data,setData] =useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(1);
  const [entriesPerPage] = useState(20);
  const [categories,setCategories] = useState(null);
  useEffect(() => {
    getdata();
    getcat();
    searchItems(cat)
    
  }, [data]);

  const getdata = async () => {
    const res = await axios.get("https://api.publicapis.org/entries");
    setData(res.data.entries)
    setLoading(true);
  };
  const getcat = async () => {
    const rescat = await axios.get("https://api.publicapis.org/categories");
    setCategories(rescat.data.categories);
  };
  const searchItems = (searchValue) => {
    if (searchValue !== "") {
      const filteredData = data.filter((item) => {
        return item.Category.search(searchValue) != -1;
      });
      setEntries(filteredData);
    }
  };
  
  const indexOfLastEntry = currentEntry * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentEntry(pageNumber);

  return (
    <div className="h-full">
      <Nav categories={categories} loading={loading} />
      <p className="text-3xl m-3 font-mono text-center">{cat}-APIs</p>
      <Apis entries={currentEntries} loading={loading} />
      <Pagination
        entriesPerPage={entriesPerPage}
        totalEntries={entries.length}
        paginate={paginate}
        loading={loading}
      />
      <Footer />
    </div>
  );
}
export default Categories;
