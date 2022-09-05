import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import Filters from "../Filters/Filters";
import { Card } from "../Card/Card";
import { Pagination } from "../Pagination/Pagination";
import Dates from "../Dates/Dates";
import { getBikes, getRenderedBikes } from "../../Redux/actions/";
import { NotFound } from "../NotFound/NotFound";
import s from "./Home.module.css";
import encabezado from "../../image/encabezado.png";
import Orderings from "../Orderings/Orderings";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { FiltersSelected } from "../FiltersSelected/FiltersSelected";

export const Home = () => {
  const dispatch = useDispatch();
  const allBikes = useSelector((state) => state.allBikes);
  const renderedBikes = useSelector((state) => state.renderedBikes);
  const paginate = useSelector((state) => state.paginate);
  const parameters = useSelector((state) => state.parameters);
  let [cardId, setCardId] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadParameters();
  }, [parameters]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeIdCard = () => {
    setCardId(1);
  };

  const loadParameters = () => {
    dispatch(getRenderedBikes(parameters));
  };

  // info desde back en primer renderizado
  if (!allBikes.length) dispatch(getBikes());

  // defino loading
  let loading = false;
  if (!allBikes.length) loading = true;

  // defino notFound
  let notFound = false;
  if (!renderedBikes.length) notFound = true;

  // paginado
  const indexLastBike = paginate.currentPage * paginate.bikesPerPage;
  const indexFirstBike = indexLastBike - paginate.bikesPerPage;
  const currentBikes = renderedBikes.slice(indexFirstBike, indexLastBike);

  // parametros
  const handleParameter = (e, property, value, label, id, parameter) => {
    e.preventDefault();
    let newParameters = parameters[parameter].selected.filter(
      (p) => p !== property
    );
    let newLabels = parameters[parameter].labels.filter((l) => l !== label);
    let newIds = parameters[parameter].ids.filter((i) => i !== id);
    if (value === "") {
      if (id) document.getElementById(id).value = "";
    } else {
      newParameters = [...newParameters, property];
      newLabels = [...newLabels, label];
      if (id) newIds = [...newIds, id];
    }
    let newParametersValues = { ...parameters };
    newParametersValues[parameter].selected = newParameters;
    newParametersValues[parameter].labels = newLabels;
    newParametersValues[parameter].ids = newIds;
    property === "max" || property === "min"
      ? (newParametersValues[parameter].price[property] = value)
      : (newParametersValues[parameter][property] = value);
    dispatch(setParameters(newParametersValues));
    dispatch(setCurrentPage(1));
    handleChangeIdCard();
  };

  const deleteFilter = (e, property, label, id) => {
    handleParameter(e, property, "", label, id, "filters");
  };

  const deleteSort = (e, property, label, id) => {
    handleParameter(e, property, "", label, id, "sorts");
  };

  const deleteSearch = (e) => {
    e.preventDefault();
    dispatch(
      setParameters({ ...parameters, search: { selected: [], search: "" } })
    );
    dispatch(setCurrentPage(1));
  };

  return (
      loading? <Loading />
      :
    <div className={s.containerHome}>

      <div className={s.encabezado}>
        <img src={encabezado} alt="encabezado" className={s.encabezado} />
      </div>

      <div className={s.divSticky}>
        <div className={s.containFiltersSelected}>
          {!!parameters.search.selected.length && (<FiltersSelected select={parameters.search} handleDelete={deleteSearch} />)}
          {!!parameters.filters.selected.length && (<FiltersSelected select={parameters.filters} handleDelete={deleteFilter} />)}
          {!!parameters.sorts.selected.length && (<FiltersSelected select={parameters.sorts} handleDelete={deleteSort} />)}
        </div>

        <div className={s.divDateAndOrder}>
          {/* comento el Dates hasta que se cambie, este componente no deja modificar estilos */}
          <Dates />
          <Orderings handleParameter={handleParameter} />
        </div>
      </div>
      <div className={s.filterwrapp}>
        <div className={s.containerFilter}><Filters handleParameter={handleParameter} /></div>
        <div className={s.divPaginationAndBikes}>
          {!!renderedBikes.length && <Pagination />}
          {notFound && <NotFound />}
          {!loading && !!renderedBikes.length && (
            <div className={s.containerCards}>
              {currentBikes?.map((e) => (
                <div key={e.idBike}>
                    <Card key={e.idBike}
                      name={e.name}
                      type={e.type}
                      image={e.image}
                      traction={e.traction}
                      wheelSize={e.wheelSize}
                      price={e.price}
                      rating={e.rating}
                      color={e.color}
                      idBike={e.idBike}
                      id={cardId++}
                    />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
