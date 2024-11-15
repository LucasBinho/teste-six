import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Form({ productId, closeModal }) {
  const navigate = useNavigate();
  const token = import.meta.env.VITE_API_KEY;
  const [errors, setErrors] = useState({
    email: "",
    phone_number: "",
    street_number: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reseta os erros antes de submeter
    setErrors({
      email: "",
      phone_number: "",
      street_number: "",
    });

    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());
    payload.product_id = productId;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(payload.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Por favor, insira um email válido.",
      }));
      return;
    }

    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(payload.phone_number)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone_number:
          "Por favor, insira um número de telefone válido (apenas números, 10 ou 11 dígitos).",
      }));
      return;
    }
    payload.phone_number = Number(payload.phone_number);

    if (isNaN(payload.street_number) || payload.street_number <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        street_number: "Por favor, insira um número de rua válido.",
      }));
      return;
    }

    payload.street_number = Number(payload.street_number);

    console.log('payload: ', payload);

    try {
      const response = await fetch(
        `https://api-candidate.ogruposix.com/buy/${payload.product_id}`,
        {
          method: "POST",
          headers: {
            "user-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();
      console.log("Resposta da API:", responseData);

      if (response.ok) {
        closeModal();
        navigate("/thank-you");
      } else {
        console.error("Erro ao enviar dados:", responseData);
        alert("Erro ao realizar a compra. Detalhes: " + responseData.message);
      }
    } catch (error) {
      const errorDetails = await response.json();
      console.error("Erro da API:", errorDetails);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 submitForm">
      <div className="relative">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded w-full"
          required
        />
        {errors.email && <small className="text-red-500">{errors.email}</small>}
      </div>
      <div className="relative">
        <input
          type="tel"
          name="phone_number"
          placeholder="Telefone"
          className="border p-2 rounded w-full"
          required
        />
        {errors.phone_number && (
          <small className="text-red-500">{errors.phone_number}</small>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          name="street_number"
          placeholder="Número da Rua"
          className="border p-2 rounded w-full"
          required
        />
        {errors.street_number && (
          <small className="text-red-500">{errors.street_number}</small>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          name="street"
          placeholder="Rua"
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="relative">
        <input
          type="text"
          name="district"
          placeholder="Bairro"
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="relative">
        <input
          type="text"
          name="city"
          placeholder="Cidade"
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="relative">
        <input
          type="text"
          name="state"
          placeholder="Estado"
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Confirmar Compra
      </button>
    </form>
  );
}

export default Form;
