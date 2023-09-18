import PropTypes from "prop-types";

const PaginationElement = ({ item, page, setPage }) => {
    return <span 
                className={`pagination_number leading-10 px-1 font-semibold transition-all ${page !== item ? 'cursor-pointer' : 'bg-black text-white rounded-sm pointer-events-none hover:bg-black'} hover:bg-gray-100`} 
                onClick={() => setPage(item)}
                >
                {item}
            </span>;
};

PaginationElement.propTypes = {
    item: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired
};

export default PaginationElement;
