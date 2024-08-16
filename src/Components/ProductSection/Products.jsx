import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import Category from "./Category/Category";
import Sorting from "./Sorting/Sorting";
import Searching from "./Searching/Searching";
const Products = () => {

    //Search 
    const [reloadbtn,setReloadBtn] = useState()
    const[search,setSearch] = useState('')

    //Sorting
    const[sorting,setSorting] = useState('')

    const [minPriceFocused, setMinPriceFocused] = useState(false);
    const [maxPriceFocused, setMaxPriceFocused] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [filters, setFilters] = useState({
        selectedBrands: [],
        selectedCategories: [],
        minPrice: '',
        maxPrice: ''
    });


    const [productPerPage, setProduct] = useState(6)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    //Search Button
    const handleSearch = e=>{
        e.preventDefault()
        const text = e.target.search.value
        setSearch(text)
        setReloadBtn(true)
        setCurrentPage(1)
    }

    //Category Apply BUtton
    const handleApply = () => {
        if (minPriceFocused && maxPriceFocused || (!minPriceFocused && !maxPriceFocused)) {
            setFilters({
                selectedBrands,
                selectedCategories,
                minPrice,
                maxPrice,
            });
            setCurrentPage(1);
        } else if (minPriceFocused && !maxPriceFocused) {
            alert("Please interact with both min and max price fields before applying.");
        }
        else {
            alert("Please interact with both min and max price fields before applying.");
        }
    };

    //Fetch All Product
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products', filters, currentPage, search, sorting],
        queryFn: async () => {
            let url = `${import.meta.env.VITE_API_URL}/products?page=${currentPage}&size=${productPerPage}&sorting=${sorting}&search=${search}`;

            filters.selectedBrands.forEach(brand => {
                url += `&brands=${brand}`;
            });

            filters.selectedCategories.forEach(category => {
                url += `&categories=${category}`;
            });

            if (filters.minPrice) {
                url += `&minPrice=${filters.minPrice}`;
            }

            if (filters.maxPrice) {
                url += `&maxPrice=${filters.maxPrice}`;
            }
            const { data } = await axios.get(url);
            return data;
        }
    });


    const updateDataAndCount = async () => {
        let countUrl = `${import.meta.env.VITE_API_URL}/products-count?page=${currentPage}&size=${productPerPage}&search=${search}`;

        filters.selectedBrands.forEach(brand => {
            countUrl += `&brands=${brand}`;
        });

        filters.selectedCategories.forEach(category => {
            countUrl += `&categories=${category}`;
        });

        if (filters.minPrice) {
            countUrl += `&minPrice=${filters.minPrice}`;
        }

        if (filters.maxPrice) {
            countUrl += `&maxPrice=${filters.maxPrice}`;
        }

        const { data } = await axios.get(countUrl);
        setCount(data.count);
    };

    //Category Clear
    const handleClear = () => {
        setSelectedBrands([]);
        setSelectedCategories([]);
        setMinPrice('');
        setMaxPrice('');
        setMinPriceFocused(false);
        setMaxPriceFocused(false);
        setMinPriceFocused(false);
        setMaxPriceFocused(false);
        setFilters({
            selectedBrands: [],
            selectedCategories: [],
            minPrice: '',
            maxPrice: ''
        });
        setCurrentPage(1);
    }

    useEffect(() => {
        updateDataAndCount();
        refetch();
    }, [currentPage, productPerPage, filters, sorting, search]);
    
    const TotalPages = Math.ceil(count / productPerPage);
    const pages = [...Array(TotalPages).keys()].map(e => e + 1);

    const handleButton = (value) => {
        if (value >= 1 && value <= TotalPages) {
            setCurrentPage(value);
        }
    };




    return (
        <>
            <div className="flex justify-center gap-5 items-center">
                <Category handleApply={handleApply} setSelectedBrands={setSelectedBrands}
                    setSelectedCategories={setSelectedCategories} selectedCategories={selectedCategories} selectedBrands={selectedBrands} setMaxPrice={setMaxPrice}
                    setMinPrice={setMinPrice} setMinPriceFocused={setMinPriceFocused} setMaxPriceFocused={setMaxPriceFocused} maxPrice={maxPrice} minPrice={minPrice}
                    handleClear={handleClear}
                ></Category>
                <Sorting sorting={sorting} setSorting={setSorting}></Sorting>
                <Searching handleSearch={handleSearch}
                setReloadBtn={setReloadBtn}
                reloadbtn={reloadbtn}
                setSearch={setSearch}
                ></Searching>
                
            </div>


            <div className="max-w-6xl mx-auto py-10 px-4 lg:px-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    products.map(p => <ProductCard key={p._id} p={p}></ProductCard>)
                }
            </div>
            <div className='flex justify-center my-12'>

                {products.length > 0 &&

                    <button
                        disabled={currentPage === 1}
                        onClick={() => handleButton(currentPage - 1)}
                        className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#5D0911] hover:text-white'>
                        <div className='flex items-center -mx-1'>
                            <IoIosArrowBack />
                        </div>
                    </button>
                }


                {pages.map(btnNum => (
                    <button
                        onClick={() => handleButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-[#5D0911] text-white' : ''}
                 px-4 py-2 mx-1 transition-colors duration-300 transform rounded-full sm:inline hover:bg-[#5D0911] hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}


                {products.length > 0 &&
                    <button
                        disabled={currentPage === TotalPages}
                        onClick={() => handleButton(currentPage + 1)}
                        className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-[#5D0911] disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                        <div className='flex items-center -mx-1'>
                            <IoIosArrowForward />

                        </div>
                    </button>
                }
            </div>

        </>

    );
};

export default Products;