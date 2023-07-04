import { useEffect, useState } from "react";
import axios from "axios";
import Input from "@mui/joy/Input";
import CircularProgress from "@mui/joy/CircularProgress";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

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
  const [storeItems, setStoreItems] = useState<itemType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStoreItems() {
      const { data } = await axios.get<itemType[]>(
        "https://fakestoreapi.com/products"
      );
      setFilteredList(data);
      setStoreItems(data);
      setLoading(false);
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

    if (query.length < 1) {
      setFilteredList(storeItems);
    }
  }

  return (
    <>
      <div className="main">
        <Input
          type="text"
          color="neutral"
          placeholder="Find your product"
          variant="outlined"
          onChange={(event) => {
            filterBySearch(event);
          }}
        />
      </div>
      {loading && (
        <div
          className="item-list"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress
            determinate={false}
            size="lg"
            value={25}
            variant="plain"
          />
        </div>
      )}
      {!loading && (
        <div className="item-list">
          <ul className="allProducts">
            {filteredList.map((item) => (
              <figure
                key={item.id}
                className="allProducts__item"
                onClick={() => {
                  navigate(`/product/${item.id}`);
                }}
              >
                <img
                  className="allProducts__item--img"
                  src={item.image}
                  alt=""
                />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default AllProducts;
