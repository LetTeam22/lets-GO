import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPage } from '../../Redux/actions';


export const Pagination = ({ allBikes , bikesPerPage }) => {

    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage)

    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(allBikes / bikesPerPage); i++) { 
        pageNumber.push(i)
    }

    const handlePage = num => {
        if (currentPage !== num) dispatch(changeCurrentPage(num))
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