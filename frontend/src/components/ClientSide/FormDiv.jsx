function FormDiv({ temp }) {
  return (
    <div className="flex justify-center items-center h-full p-4">
      <button
        onClick={temp}
        className="bg-[rgba(66,63,193,.8)] border-md text-white font-bold text-[32px] py-4 px-6 w-20 h-20 rounded-3xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
}

export default FormDiv;

