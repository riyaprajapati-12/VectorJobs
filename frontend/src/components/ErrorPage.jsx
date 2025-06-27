import Navbar from "./Navbar";

let ErrorPage = ()=>{
    return (
        
        <div className="flex flex-col items-center justify-center mt-20 sm:mt-40 opacity-40">
            <img
                width="200"
                height="200"
                src="https://img.icons8.com/officel/160/add-property.png"
                alt="add-property"
                className="opacity-100"
            />
            <p className="w-3/4 sm:w-1/2 text-sm sm:text-md font-medium font-serif text-slate-700 text-center leading-7 mt-5">
                <>
                    <p>Start creating your first Job!</p>
                    <p>Click the 'Add' button to begin.</p>
                    <p>Let's get started!</p>
                </>

            </p>
        </div>
    )
}

export default ErrorPage;