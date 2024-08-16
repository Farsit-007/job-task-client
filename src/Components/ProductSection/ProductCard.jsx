import { Link } from "react-router-dom";

const ProductCard = ({p}) => {
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
        <figure className="" style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
            <img
                src={p.productImage}
                className="block object-cover rounded-lg h-full w-full "
            />

        </figure>
        <div className="card-body text-center">
           <div className="flex justify-center">
           <h2 className="card-title ">{p.productName.slice(0,50)}</h2>
           <p> {new Date(p.creationDate).toLocaleDateString()}</p>
           </div>
            <p>{p.description.slice(0,90)}.....</p>
            <p>{p.brandName}</p>
            <p>{p.category}</p>
            <p>{p.price}</p>
            <div className="card-actions justify-center">
                <Link to={`/public-p-details/${p._id}`} className=" px-8 btn transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md text-xl hover:text-[#5D0911]">Read More</Link>
            </div>
        </div>
    </div>
    );
};

export default ProductCard;