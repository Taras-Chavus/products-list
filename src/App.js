import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import ProductCard from "./components/ProductCard/ProductCard";
import AddProductModal from "./components/ProductCard/AddProductModal";
import "./App.css";

const url = "http://localhost:3001/products";

function App() {
  const { data: products, isLoading, error } = useFetch(url);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setData(products);
  }, [products]);

  const changeAddModalState = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="app-wrapper">
      <button className="add-btn" onClick={changeAddModalState}>Add Product</button>

      {isOpen && (
        <AddProductModal
          url={url}
          setData={setData}
          changeAddModalState={changeAddModalState}
        />
      )}

      {data.map((product) => (
        <ProductCard
          key={product.id}
          url={url}
          setData={setData}
          id={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          amount={product.count}
          size={product.size}
          weight={product.weight}
          comments={product.comments}
        />
      ))}
    </div>
  );
}

export default App;