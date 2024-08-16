import { IoReload } from "react-icons/io5";
const Searching = ({ handleSearch, setReloadBtn, reloadbtn,refetch,setSearch}) => {
    
    const handleReload = ()=>{
        setReloadBtn(false)
        setSearch('')
        refetch()
    }
    return (
        <div className="flex gap-3 items-center">
            <form onSubmit={handleSearch}>
                <div className="flex gap-1 items-center">
                    <div>
                        <input type="text" name="search" className="p-3 border rounded-lg" />
                    </div>
                    <div>
                        <input type="submit" className="btn" value="Search" />
                    </div>
                </div>
            </form>
            {
                reloadbtn && <div>
                    <button onClick={handleReload} className="flex justify-center items-center">
                        <IoReload size={30} />
                    </button>
                </div>
            }
        </div>
    );
};

export default Searching;