import { SerchString } from "../../components/SerchString/SerchString";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { useRef } from "react";
import styles from "./HomePage.module.scss";
import { FilterBlock } from "../../components/FiltersBolock/FiltersBlock";
import { SelectedStoreCard } from "../../components/SelectedStoreCard/SelectedStoreCard";
import { FilterProductCategories } from "../../components/FilterProductCategories/FilterProductCategories";
import { Modal } from "../../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../../redux/slices/modalSlice";
import { getCategories } from "../../redux/slices/categoriesSlice";
import { CardList } from "../../components/CardList/CardList";
import { useHeaderIntersection } from "../../utils/headerIntersection";

export const HomePage = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((store) => store.modal.isOpen);
  const isIntersection = useSelector((store) => store.modal.isIntersection);

  const headerRef = useRef(null);
  const searchRef = useRef(null);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  useHeaderIntersection({ headerRef, searchRef });

  const openModal = () => {
    dispatch(modalOpen());
  };

  return (
    <>
      <div>
        <Header inHeader={isIntersection} ref={headerRef} />
        <div className={styles.container}>
          <h1 className={styles.main_title}>Прогноз спроса по выбранным ТК</h1>
          <div className={styles.category_container}>
            <SerchString ref={searchRef} />
            <button className={styles.category_btn} onClick={openModal}>
              Выбрать разделы
            </button>
          </div>
          <FilterBlock className={styles.filter_block}></FilterBlock>
        </div>
        <div className={styles.selected_store}>
          <SelectedStoreCard></SelectedStoreCard>
        </div>
        <CardList />
      </div>
      {isOpen ? (
        <Modal active={isOpen}>
          <FilterProductCategories />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};
