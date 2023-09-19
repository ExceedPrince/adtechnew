import PropTypes from 'prop-types';
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaginationElement from "../own/PaginationElement";

const Pagination = ({ pagination, page, setPage, editingNumber }) => {

    function changePage(value) {
        if (value === "left" && page > 1) {
          setPage(prevState => prevState - 1);
        }
    
        if (value === "right" && page < pagination) {
          setPage(prevState => prevState + 1);
        }
    }
    
    return (
        <div id="pagination" className={`flex flex-row flex-nowrap justify-center gap-2 transition-opacity ${editingNumber > 0 && 'opacity-10 pointer-events-none'}`}>
            <Button className={`pagination left ${page === 1 && 'opacity-10 pointer-events-none'}`} onClick={() => changePage("left")} variant="ghost" size="icon">
                <ChevronLeft />
            </Button>
            {JSON.parse(localStorage.getItem("todoList")) && 

                Array(pagination).fill(1).map((num,i) => num + i).map((item, index) => {

                    if (index === 0 || index === pagination - 1 || item === page) {
                        
                        return <PaginationElement key={`pagination_${index}`} item={item} page={page} setPage={setPage} />
                    }

                    if(item === page - 1) {
                        return (
                            <span key={index} className='flex leading-10'>
                                {(pagination > 3 && page === pagination) || (pagination > 4 && pagination - page >= 1) ? "..." : null}
                                <PaginationElement key={`pagination_${index}`} item={item} page={page} setPage={setPage} />
                            </span>
                        )
                    } else if (item === page + 1) {
                        return (
                            <span key={index} className='flex leading-10 align-middle'>
                                <PaginationElement key={`pagination_${index}`} item={item} page={page} setPage={setPage} />
                                {(pagination > 3 && page === 1) || (pagination > 4 && pagination - page >= 2) ? "..." : null}
                            </span>
                        )
                    }
                })
            }
            <Button className={`pagination right ${page === pagination && 'opacity-10 pointer-events-none'}`} onClick={() => changePage("right")} variant="ghost" size="icon">
                <ChevronRight />
            </Button>
        </div>
    )
}

Pagination.propTypes = {
    pagination: PropTypes.number.isRequired, 
    page: PropTypes.number.isRequired, 
    setPage: PropTypes.func.isRequired,
    editingNumber: PropTypes.number.isRequired
}

export default Pagination