import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

type itemType = {
  category: string;
  description: string;
  id: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};

function AllProducts() {
  const [filteredList, setFilteredList] = useState<itemType[]>([]);

  useEffect(() => {
    async function fetchStoreItems() {
      const { data } = await axios.get<itemType[]>(
        "https://fakestoreapi.com/products"
      );
      setFilteredList(data);
    }
    fetchStoreItems();
  }, []);

  function filterBySearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    let updatedList = [...filteredList];

    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredList(updatedList);
  }

  return (
    <Layout>
      <div className="main">
        <input
          type="text"
          onChange={(event) => {
            filterBySearch(event);
          }}
        />
      </div>
      <div className="item-list">
        <ul>
          {filteredList.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default AllProducts;
