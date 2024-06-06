import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const response = await axios.get("http://localhost:4000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="container py-10">
        <div className="my-4 py-5 ">
          <Link to="add">
            {" "}
            <button className="bg-[#5977d9] p-2 rounded-lg shadow-lg text-white capitalize">
              {" "}
              ajouter un nouveau produit
            </button>
          </Link>
        </div>
        <div>
          <div className=" flex justify-between flex-wrap gap-4 items-center max-md:justify-center">
            {products.map((product) => (
              <div
                key={product.id}
                className="card w-[300px] shadow-lg h-[400px] flex  flex-col justify-between items-center rounded-lg group "
              >
                <div className=" w-full h-[70%] overflow-hidden rounded-lg">
                  <img
                    src={product.url}
                    alt="profil"
                    className=" transition-all group-hover:scale-[1.1] "
                  ></img>
                </div>
                <div>{product.name}</div>
                <div className=" w-full flex border-t border-[#858585]">
                  <Link
                    to={`EditProduct/${product.id}`}
                    className="w-[50%] border-r border-[#858585] flex justify-center items-center py-5 cursor-pointer text-[#5977d9] font-bold"
                  >
                    <div>Edit</div>
                  </Link>

                  <div
                    onClick={() => deleteProduct(product.id)}
                    className="w-[50%] flex justify-center items-center py-5 cursor-pointer text-[#c96565] font-bold"
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
