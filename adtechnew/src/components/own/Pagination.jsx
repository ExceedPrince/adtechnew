import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ pagination, page, setPage }) => {

    function changePage(value) {
        if (value === "left" && page > 1) {
          setPage(prevState => prevState - 1);
        }
    
        if (value === "right" && page < pagination) {
          setPage(prevState => prevState + 1);
        }
    }
    
    return (
        <div id="pagination">
            <Button className='pagination left' onClick={() => changePage("left")} variant="ghost" size="icon">
                <ChevronLeft />
            </Button>
            {JSON.parse(localStorage.getItem("todoList")) && 

                Array(pagination).fill(1).map((num,i) => num + i).map((item, index) => {

                    if (index === 0 || index === pagination - 1 || item === page) {
                        return (<span key={index} className='pagination pagination_number' onClick={() => setPage(item)}>{item}</span>)
                    }

                    if(item === page - 1) {
                        return (
                            <span key={index}>
                                {(pagination > 3 && page === pagination) || (pagination > 4 && pagination - page >= 1) ? "..." : null}
                                <span key={index} className='pagination pagination_number' onClick={() => setPage(item)}>{item}</span>
                            </span>
                        )
                    } else if (item === page + 1) {
                        return (
                            <span key={index}>
                                <span key={index} className='pagination pagination_number' onClick={() => setPage(item)}>{item}</span>
                                {(pagination > 3 && page === 1) || (pagination > 4 && pagination - page >= 2) ? "..." : null}
                            </span>
                        )
                    }
                })
            }
            <Button className='pagination right' onClick={() => changePage("right")} variant="ghost" size="icon">
                <ChevronRight />
            </Button>
        </div>
    )
}

Pagination.propTypes = {
    pagination: PropTypes.number.isRequired, 
    page: PropTypes.number.isRequired, 
    setPage: PropTypes.func.isRequired
}

export default Pagination