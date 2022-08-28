import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../Redux/actions';


export const Pagination = () => {

    const dispatch = useDispatch();
    const renderedBikes = useSelector(state => state.renderedBikes)
    const paginate = useSelector(state => state.paginate);

    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(renderedBikes.length / paginate.bikesPerPage); i++) { 
        pageNumber.push(i)
    }

    const handlePage = num => {
        if (paginate.currentPage !== num) dispatch(setCurrentPage(num))
    }

    return (
            <ul>
                {pageNumber?.map(num => 
                    <li key={num} onClick={() =>handlePage(num)}>
                        <span>{num}</span>
                    </li>
                )}
            </ul>
    )
};