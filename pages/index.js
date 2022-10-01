import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState,useEffect  } from 'react';
import axios from 'axios';
import react from 'react'
import Apis from "../components/Apis"
import Pagination from '../components/Pagination';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Home() {
  const [entries,setEntries] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [catLoading,setCatLoading] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(1);
  const [entriesPerPage] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [categories,setCategories] = useState(null);
  useEffect(() => {
    getdata();
    getcat();
  }, []);

  const getdata = async () => {
    const res = await axios.get("https://api.publicapis.org/entries");
    setEntries(res.data.entries);
    setLoading(true);
  };
  const getcat= async () =>{
    const res = await axios.get("https://api.publicapis.org/categories");
    setCatLoading(true);
    setCategories(res.data.categories);

  }
  const searchItems = (searchValue) => {
    setSearchInput(searchValue.toLowerCase());
    if (searchInput !== "") {
      const filteredData = entries.filter((item) => {
        return item.Description.toLowerCase().search(searchInput) != -1;;
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(entries);
    }
  };
  const indexOfLastEntry = currentEntry * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
  const currentFilteredEntries = filteredResults.slice(indexOfFirstEntry, indexOfLastEntry);
  const paginate = (pageNumber) => setCurrentEntry(pageNumber);

  return (
    <div className="h-full">
      <Nav categories={categories} loading={catLoading} />
      <div className="text-center m-4 text-xl">
        <input
          className="rounded-md p-2"
          placeholder="Search..."
          onChange={(e) => searchItems(e.target.value)}
        />
        <p className="font-mono text-3xl m-3">APIs</p>
      </div>
      {searchInput.length > 1 ? (
        <>
          <Apis entries={currentFilteredEntries} loading={loading} />
          <Pagination
            entriesPerPage={entriesPerPage}
            totalEntries={filteredResults.length}
            paginate={paginate}
            loading={loading}
          />
        </>
      ) : (
        <>
          <Apis entries={currentEntries} loading={loading} />
          <Pagination
            entriesPerPage={entriesPerPage}
            totalEntries={entries.length}
            paginate={paginate}
            loading={loading}
          />
        </>
      )}
      <Footer/>
    </div>
  );
}
