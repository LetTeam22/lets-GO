import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../Redux/actions';
import './Pagination.css';

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

    const handlePrevious = () => {
        if (paginate.currentPage > 1) dispatch(setCurrentPage(paginate.currentPage - 1))
    }
      
    const handleNext = () => {
        if (paginate.currentPage < pageNumber[pageNumber.length - 1]) dispatch(setCurrentPage(paginate.currentPage + 1))
    }

    return (
            <ul className='pagination'>
                {pageNumber.length > 1 && <li className="pagli" onClick={() => handlePrevious()}>{'<'}</li>}
                {pageNumber?.map(num => 
                    <li className={'pagli' + (paginate.currentPage === num ? ' act' : '')} key={num} onClick={() =>handlePage(num)}>
                        <span className='pagspan'>{num}</span>
                    </li>
                )}
                {pageNumber.length > 1 && <li className="pagli" onClick={() => handleNext()}>{'>'}</li>}
            </ul>
    )
};