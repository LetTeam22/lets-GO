import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import Filters from "../Filters/Filters";
import { Card } from "../Card/Card";
import { Pagination } from "../Pagination/Pagination";
import Dates from "../Dates/Dates";
import {
  getBikes,
  getRenderedBikes,
  getUser,
  getAllFavorites,
} from "../../Redux/actions/";
import { NotFound } from "../NotFound/NotFound";
import s from "./Home.module.css";
import Orderings from "../Orderings/Orderings";
import { setCurrentPage, setParameters } from "../../Redux/actions";
import { FiltersSelected } from "../FiltersSelected/FiltersSelected";
import { useAuth0 } from "@auth0/auth0-react";
import ChatBot from "../ChatBot/ChatBot";

export const Home = ({ socket }) => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const allBikes = useSelector((state) => state.allBikes);
  let renderedBikes = useSelector((state) => state.renderedBikes);
  const paginate = useSelector((state) => state.paginate);
  const parameters = useSelector((state) => state.parameters);
  const [show, setShow] = useState(false);

  const bookings = useMemo(() => {
    return JSON.parse(localStorage.getItem("booking")) || [];
  }, []);

  const Adventures = useMemo(() => {
    return JSON.parse(localStorage.getItem("adventure")) || [];
  }, []);

  let [cardId, setCardId] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user?.email) dispatch(getUser(user?.email));
    if (user?.email) dispatch(getAllFavorites(user?.email));
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadParameters();
  }, [parameters]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      Array.isArray(bookings) &&
      Array.isArray(Adventures) &&
      (bookings.length || Adventures.length)
    ) {
      socket?.emit("shoppingCart");
    }
  }, [socket, bookings, Adventures]);

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

  // filtro bicis ya agregadas al carrito
  renderedBikes = renderedBikes.filter(
    (rb) => !bookings.find((bk) => bk.bike === rb.idBike)
  );

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

  const handleShowFilters = () => {
    if (show) setShow(false);
    else setShow(true);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={s.containerHome}>
      <ChatBot />
      <div className={s.encabezado}>
        <img
          src="https://res.cloudinary.com/pflet/image/upload/v1662686147/Let/image/encabezado_fsuvbq.png"
          alt="encabezado"
          className={s.encabezado}
        />
      </div>

      
      
      <div className={s.filterwrapp}>
        <div className={show? s.backgroundGray : s.nothing} onClick={handleShowFilters}></div>
        <div className={`${s.responsiveFilter} ${show ? s.show : s.hidden}`}>
          <div className={s.containerFilter}>


            <div className={`${s.divSticky} ${show? s.down : s.up}`}>
        <div className={s.containFiltersSelected}>
          {!!parameters.search.selected.length && (
            <FiltersSelected
              select={parameters.search}
              handleDelete={deleteSearch}
            />
          )}
          {!!parameters.sorts.selected.length && (
            <FiltersSelected
              select={parameters.sorts}
              handleDelete={deleteSort}
            />
          )}
          {!!parameters.filters.selected.length && (
            <FiltersSelected
              select={parameters.filters}
              handleDelete={deleteFilter}
            />
          )}
        </div>

         <div className={`${s.divDateAndOrder} ${show? s.appear : null}`}>
          <Dates component="home" />
          <Orderings handleParameter={handleParameter} />
        </div> 
      </div>
            <Filters handleParameter={handleParameter} />




          </div>
        </div>
        <button onClick={handleShowFilters} className={s.burguerButton}>
        <span className={s.burguerForm}></span>
      </button>
        <div className={s.divPaginationAndBikes}>
          {!!renderedBikes.length && <Pagination />}
          {notFound && <NotFound />}
          {!loading && !!renderedBikes.length && (
            <div className={s.containerCards}>
              {currentBikes?.map((e) => (
                <div key={e.idBike}>
                  <Card
                    key={e.idBike}
                    name={e.name}
                    type={e.type}
                    image={e.image}
                    traction={e.traction}
                    wheelSize={e.wheelSize}
                    price={e.price}
                    discount={e.discount}
                    rating={e.rating}
                    color={e.color}
                    idBike={e.idBike}
                    id={cardId++}
                    socket={socket}
                  />
                </div>
              ))}
            </div>
          )}
          {!!renderedBikes.length && <Pagination />}
        </div>
      </div>
    </div>
  );
};
