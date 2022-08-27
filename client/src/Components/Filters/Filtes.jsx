import { useDispatch } from "react-redux";
import { setTypeFilter, setCurrentPage, setTractionFilter } from "../../Redux/actions";


// bikeType OK
// bikeTraction --> mecánica - eléctrica
// bikeWheeelSize --> 20 - 24 - 26 - 29
// getBikeColor --> black - grey - white - red - yellow - green - blue

// orderName
// orderBikePrice
// orderRating


export const Filters = () => {

    const dispatch = useDispatch();

    const handleTypeFilter = e => {
        console.log(e.target.value);
        e.preventDefault();
        dispatch(setTypeFilter(e.target.value));    
        dispatch(setCurrentPage(1));
    };

    const handleTractionFilter = e => {
        console.log(e.target.value);
        e.preventDefault();
        dispatch(setTractionFilter(e.target.value));
        dispatch(setCurrentPage(1));
    };


    return (
        <>
            <h5>Filtros</h5>

            <h5>Tipos</h5>
            <select value='types' onChange={handleTypeFilter}>
                <option value= ''> </option>
                <option value='all'>todos</option>
                <option value='bmx'>BMX</option>
                <option value='city'>city</option>
                <option value='mtb'>mtb</option>
                <option value='tandem'>tandem</option>
                <option value='touring'>touring</option>
                <option value='folding'>folding</option>
            </select>

            <h5>Tracción</h5>
            <select value='traction' onChange={handleTractionFilter}>
                <option value= ''> </option>
                <option value='all'>todas</option>
                <option value='mechanic'>mechanic</option>
                <option value='electric'>electric</option>
            </select>

        </>
    )
};