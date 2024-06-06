import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [prev, setPrev] = useState("");

  const navigate = useNavigate();
  const loadImg = (e) => {
    const images = e.target.files[0];
    setFile(images);
    setPrev(URL.createObjectURL(images));
  };
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
   
    try {
      await axios.post("http://localhost:4000/products", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="container h-screen flex justify-center items-center">
        <div className="">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between flex-wrap"
            onSubmit={saveProduct}
          >
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Nom du Titre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Titre du produit"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  images du produit
                </label>
                <input
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="file"
                  onChange={loadImg}
                />
              </div>
            </div>
            {prev ? (
              <div className="w-[300px] bg-red-300 rounded">
                <img src={prev} alt="image product" />
              </div>
            ) : (
              ""
            )}

            <div className="flex items-center justify-between w-full">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
