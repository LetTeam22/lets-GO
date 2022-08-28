import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setParameters } from "../../Redux/actions";


// bikeType OK
// bikeTraction --> mecánica - eléctrica
// bikeWheeelSize --> 20 - 24 - 26 - 29
// getBikeColor --> black - grey - white - red - yellow - green - blue

// orderName
// orderBikePrice
// orderRating


export const Filters = () => {

    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters);

    const handleTypeFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, type: e.target.value}}));    
        dispatch(setCurrentPage(1));
    };

    const handleTractionFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, traction: e.target.value}}));    
        dispatch(setCurrentPage(1));
    };

    const handleWheelSizeFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, wheelSize: e.target.value}}));    
        dispatch(setCurrentPage(1));
    };

    const handleColorFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, color: e.target.value}}));    
        dispatch(setCurrentPage(1));
    };

    const handleMinPriceFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, price: {...parameters.filters.price, min: e.target.value}}}));    
        dispatch(setCurrentPage(1));
    };

    const handleMaxPriceFilter = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, filters: {...parameters.filters, price: {...parameters.filters.price, max: e.target.value}}}));    
        dispatch(setCurrentPage(1));
    };

    const handlePriceSort = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, sorts: {...parameters.sorts, price: e.target.value}}));    
        dispatch(setCurrentPage(1));
    };

    const handleRatingSort = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, sorts: {...parameters.sorts, rating: e.target.value}}));    
        dispatch(setCurrentPage(1));
    };

    const handleNameSort = e => {
        e.preventDefault();
        dispatch(setParameters({...parameters, sorts: {...parameters.sorts, name: e.target.value}}));    
        dispatch(setCurrentPage(1));
    };

    return (
        <>
            <h4>Filtros</h4>

            <h4>Tipos</h4>
            <select value='types' onChange={handleTypeFilter}>
                <option value=''>todos</option>
                <option value='bmx'>bmx</option>
                <option value='city'>city</option>
                <option value='mtb'>mtb</option>
                <option value='tandem'>tandem</option>
                <option value='touring'>touring</option>
                <option value='folding'>folding</option>
            </select>

            <h4>Tracción</h4>
            <select value='traction' onChange={handleTractionFilter}>
                <option value=''>todas</option>
                <option value='mechanic'>mechanic</option>
                <option value='electric'>electric</option>
            </select>

            <h4>Tamaño rueda</h4>
            <select value='wheelSize' onChange={handleWheelSizeFilter}>
                <option value=''>todas</option>
                <option value='16'>16</option>
                <option value='20'>20</option>
                <option value='24'>24</option>
                <option value='26'>26</option>
                <option value='29'>28</option>
            </select>

            <h4>Color</h4>
            <select value='color' onChange={handleColorFilter}>
                <option value=''>todas</option>
                <option value='black'>black</option>
                <option value='grey'>grey</option>
                <option value='white'>white</option>
                <option value='red'>red</option>
                <option value='yellow'>yellow</option>
                <option value='blue'>blue</option>
                <option value='green'>green</option>
            </select>

            <h4>Precio Mínimo</h4>
            <input type='number' value={parameters.filters.price.min} onChange={handleMinPriceFilter} />
            
            <h4>Precio Máximo</h4>
            <input type='number' value={parameters.filters.price.max} onChange={handleMaxPriceFilter} />

            <h4>Ordenamientos</h4>

            <h4>Precio</h4>
            <select value='price' onChange={handlePriceSort}>
                <option value=''></option>
                <option value='asc'>asc</option>
                <option value='desc'>desc</option>
            </select>

            <h4>Rating</h4>
            <select value='rating' onChange={handleRatingSort}>
                <option value=''></option>
                <option value='asc'>asc</option>
                <option value='desc'>desc</option>
            </select>

            <h4>Nombre</h4>
            <select value='name' onChange={handleNameSort}>
                <option value=''></option>
                <option value='asc'>asc</option>
                <option value='desc'>desc</option>
            </select>

        </>
    )
};