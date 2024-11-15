import "./index.css";

import { useEffect, useState } from "react";
import Form from "./Form";

export default function App() {
  const token = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api-candidate.ogruposix.com/checkout/95BD9233-8FDC-48AD-B4C5-E5BAF7578C15",
          {
            headers: {
              "user-token": token,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setData(result.object[0]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1] || url.split("youtu.be/")[1];
    if (videoId) {
      const id = videoId.split("&")[0];
      return `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&modestbranding=1`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="header">
        <img className="headerLogo" src="/assets/img/logo.jpeg" alt="Logo" />
      </div>
      <section className="p-6 text-center bg-white shadow-md">
        <div className="max-w-5xl my-0 mx-auto">
          <h1 className="text-3xl font-bold mb-3">{data.video_headline}</h1>
          <p className="text-gray-600 mb-4">{data.video_sub_headline}</p>
        </div>
        <div className="yt-video aspect-w-16 aspect-h-5 max-w-4xl my-0 mx-auto">
          <iframe
            src={getEmbedUrl(data.video_url)}
            title="Vídeo Promocional"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="arrow flex justify-center mt-6 ">
          <img className="arrow-img animate-move-up-down" src="/assets/img/arrow-down.svg" alt="" />
        </div>
      </section>

      <section className="p-6">
        <h1 className="text-5xl font-semibold text-center mb-10">
          Nossos Produtos:
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center gap-6">
          {data.products && data.products.length > 0 ? (
            data.products.map((product) => (
              <div
                key={product.product_id}
                className="bg-white p-4 rounded-lg shadow-lg "
              >
                <div className="overflow-hidden rounded-lg mb-4 hover:shadow-xl transition-transform transform hover:scale-105">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <div className="flex gap-2">
                  <p className="price mb-2">R$ {product.price}</p>
                  {product.best_choice && (
                    <p className="best-offer w-fit">Melhor Escolha!</p>
                  )}
                </div>
                {product.discount > 0 ? (
                  <p className="text-green-500 mb-2">
                    Desconto: {product.discount}%
                  </p>
                ) : (
                  <p className="bg-red-500 text-white p-2 rounded mb-2 w-fit">
                    Sem descontos
                  </p>
                )}

                <p className=" font-bold">{product.freight}</p>
                <button
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  onClick={() => handleOpenModal(product.product_id)}
                >
                  Comprar
                </button>
              </div>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg relative w-5/6 md:w-96">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Preencha seus dados:</h2>
            <Form productId={selectedProductId} closeModal={handleCloseModal} />
          </div>
        </div>
      )}

      <footer className="bg-white text-center py-4 mt-6">
        <p className="text-gray-600">
          Teste Six, todos os direitos reservados. 2024.
        </p>
      </footer>
    </div>
  );
}
