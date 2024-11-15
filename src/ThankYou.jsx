export default function ThankYou() {
  return (
    <div>
      <div className="header">
        <img className="headerLogo" src="/assets/img/logo.jpeg" alt="Logo" />
      </div>
      <div className="flex flex-col justify-center items-center h-screen bg-blue-50 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">Obrigado!</h1>
        <p className="text-lg text-center">
          Em breve, você receberá os dados de sua compra em seu email.
        </p>
      </div>
      <footer className="bg-white text-center py-4 mt-6">
        <p className="text-gray-600">
          Teste Six, todos os direitos reservados. 2024.
        </p>
      </footer>
    </div>
  );
}
