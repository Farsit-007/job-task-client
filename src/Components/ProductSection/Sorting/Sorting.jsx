
const Sorting = ({sorting,setSorting}) => {
    return (
       <>
        <div className="px-5 flex justify-center">
                <select
                    onChange={e => setSorting(e.target.value)}
                    value={sorting}
                    className='select  bg-[#5D0911] text-rose-100 font-bold text-lg'>
                    <option value=''>Sort by</option>
                    <option value='acs'>Price Low to High</option>
                    <option value='dcs'>Price High to Low</option>
                    <option value='date-acs'>Newest first</option>
                </select>

            </div>
       </>
    );
};

export default Sorting;