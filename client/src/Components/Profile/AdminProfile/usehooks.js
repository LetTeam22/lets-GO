import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetElements = ({ getElements, elements }) => {
    const dispatch = useDispatch();
    const allElements = useSelector((state) => state[elements]);

    useEffect(() => {
        dispatch(getElements());
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
      return allElements
}