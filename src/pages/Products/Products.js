import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CATEGORY_MENU } from './ProductsData';
import './Products.scss';

export default function Product() {
  const [icon, iconChange] = useState('plus');
  const [filtersList, setFiltersList] = useState([FILTER_DATA]);
  const navigate = useNavigate();

  const iconHandler = () => {
    return icon === 'plus' ? iconChange('minus') : iconChange('plus');
  };

  const filterHandler = e => {
    e.preventDefault();
    const { name } = e.target;

    FILTER_DATA.map(element => {
      if (element.filterName === name) {
        element.isFilter === true
          ? (element.isFilter = false)
          : (element.isFilter = true);
      }
      setFiltersList(FILTER_DATA);
    });
  };

  useEffect(() => {
    let queryString = '';
    filtersList.map(element => {
      if (element.isFilter === true) {
        queryString += `taste=${element.name}`;
        console.log(queryString);
      }
    });
  }, [filtersList]);

  console.log(filtersList);

  return (
    <div className="product">
      <div className="productContainer">
        <div className="leftPanel">
          <div className="menuTitle">SHOP</div>
          <ul className="categoryList">
            {CATEGORY_MENU.map(values => (
              <li className="categoryMenu" key={values.id}>
                <Link to="">{values.catName}</Link>
                {values.innerCatList.length > 0 ? (
                  <span
                    className={`expandIcon ${icon}`}
                    onClick={() => iconHandler()}
                  />
                ) : null}
                <ul className={`expandableMenu${icon}`}>
                  {values.innerCatList.map((innerValues, index) => (
                    <li className="" key={index}>
                      <Link to={innerValues.innerCatURL}>
                        {innerValues.innerCatName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="filterContainer">
            {FILTER_DATA.map(taste => {
              return (
                <label key={taste.id}>
                  <input
                    type="checkbox"
                    name={taste.filterName}
                    onClick={e => filterHandler(e)}
                  />
                  {taste.filterName}
                </label>
              );
            })}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

const FILTER_DATA = [
  { id: 1, filterName: 'Apple', isFilter: false },
  { id: 2, filterName: 'Plum', isFilter: false },
  { id: 3, filterName: 'Lime', isFilter: false },
  { id: 4, filterName: 'Peach', isFilter: false },
  { id: 5, filterName: 'Cool', isFilter: false },
  { id: 6, filterName: 'Mango', isFilter: false },
  { id: 7, filterName: 'Passion fruit', isFilter: false },
  { id: 8, filterName: 'Grapefruit', isFilter: false },
  { id: 9, filterName: 'Hibiscus', isFilter: false },
  { id: 10, filterName: 'Floral', isFilter: false },
];
