import './left-home.scss';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getPublicEntities } from 'app/entities/inventory/category/category.reducer';
import { getPublicEntities as searchProducts } from 'app/entities/inventory/product/product.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ILeftHomeProps extends StateProps, DispatchProps { }

export const LeftHome = (props: ILeftHomeProps) => {
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const nameRef = useRef(null);

  useEffect(() => {
    props.getPublicEntities();
  }, []);

  useEffect(() => {
    handleSearchProduct();

  }, [categoriesSelected]);

  const handleSearchProduct = () => {
      props.searchProducts(categoriesSelected, nameRef.current.value, 0, 0, false);
  }

  const manageCategoriesSelected = (id, checked) => {    
    let cS = [...categoriesSelected];
    if (checked) {
      cS.push(id);
    } else {
      cS = cS.filter(c => c !== id);
    }
    setCategoriesSelected([...cS]);
  };

  return (
    <div className="panel-container">
      <h2>Buscar por nombre</h2>
      <input type="text" ref={nameRef} onChange={handleSearchProduct} />
      <div className='line'></div>
      <h2>Categorías</h2>
      {props.categoryList.map(c => {
        return (
          <label key={c.id} className="item">
            <input type="checkbox" className='op-checkbox' name="checkbox" onChange={e => manageCategoriesSelected(c.id, e.target.checked)} />
            {c.name}
          </label>
        );
      })}
      <div className='line'></div>
    </div>
  );
};

const mapStateToProps = ({ category }: IRootState) => ({
  categoryList: category.entities,
});

const mapDispatchToProps = {
  getPublicEntities,
  searchProducts,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LeftHome);
