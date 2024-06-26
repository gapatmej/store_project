import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IProduct, defaultValue } from 'app/shared/model/inventory/product.model';

export const ACTION_TYPES = {
  FETCH_PRODUCT_LIST: 'product/FETCH_PRODUCT_LIST',
  FETCH_PRODUCT_PUBLIC_LIST: 'product/FETCH_PRODUCT_PUBLIC_LIST',
  FETCH_PRODUCT: 'product/FETCH_PRODUCT',
  CREATE_PRODUCT: 'product/CREATE_PRODUCT',
  UPDATE_PRODUCT: 'product/UPDATE_PRODUCT',
  PARTIAL_UPDATE_PRODUCT: 'product/PARTIAL_UPDATE_PRODUCT',
  DELETE_PRODUCT: 'product/DELETE_PRODUCT',
  SET_BLOB: 'product/SET_BLOB',
  RESET: 'product/RESET',
  ADD_PRODUCT_CART: 'product/ADD_PRODUCT_CART',
  DELETE_PRODUCT_CART: 'product/DELETE_PRODUCT_CART',
  CHANGE_QUANTITY_PRODUCT_CART: 'product/CHANGE_QUANTITY_PRODUCT_CART',
  CLEAN_CART: 'product/CLEAN_CART'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProduct>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  productsOnCart: [],
};

export type ProductState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductState = initialState, action): ProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_PUBLIC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCT):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCT):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCT):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_PUBLIC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCT):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCT):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PRODUCT):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_PUBLIC_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCT):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCT):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    case ACTION_TYPES.ADD_PRODUCT_CART: {
      const { product } = action.payload;
      const { productsOnCart } = state;

      const foundElement = productsOnCart.find(p => p.id === product.id);

      if (foundElement) {
        foundElement.quantity = foundElement.quantity + 1;
      } else {
        product["quantity"] = 1;
        productsOnCart.push(product);
      }

      return {
        ...state,
        productsOnCart: [...productsOnCart],
      };
    }
    case ACTION_TYPES.DELETE_PRODUCT_CART: {
      const { product } = action.payload;
      const { productsOnCart } = state;
      return {
        ...state,
        productsOnCart: productsOnCart.filter(item => item.id !== product.id),
      };
    }
    case ACTION_TYPES.CHANGE_QUANTITY_PRODUCT_CART: {
      const { productId, quantity } = action.payload;
      const { productsOnCart } = state;

      const foundElement = productsOnCart.find(p => p.id === productId);

      if (foundElement) {
        foundElement.quantity = quantity;
      }

      return {
        ...state,
        productsOnCart: [...productsOnCart],
      };
    }
    case ACTION_TYPES.CLEAN_CART:
      return {
        ...state,
        productsOnCart:[]
      };
    default:
      return state;
  }
};

const apiUrl = 'services/inventory/api/products';
const apiPublicUrl = 'services/inventory/api/public/products';

// Actions

export const getEntities: ICrudGetAllAction<IProduct> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_LIST,
    payload: axios.get<IProduct>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getPublicEntities = (categories, search, page, size, sort) => {
  const requestUrl = `${apiPublicUrl}?categories=${categories}&name=${search}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_PUBLIC_LIST,
    payload: axios.get<IProduct>(requestUrl),
  };
};

export const getEntity: ICrudGetAction<IProduct> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT,
    payload: axios.get<IProduct>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCT,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PRODUCT,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProduct> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const addProduct = (product) => ({
  type: ACTION_TYPES.ADD_PRODUCT_CART,
  payload: {
    product,
  },
});

export const changeQuantityProductCart = (productId, quantity) => ({
  type: ACTION_TYPES.CHANGE_QUANTITY_PRODUCT_CART,
  payload: {
    productId,
    quantity
  },
});

export const deleteProduct = (product) => ({
  type: ACTION_TYPES.DELETE_PRODUCT_CART,
  payload: {
    product,
  },
});

export const cleanShoppingCar = () => ({
  type: ACTION_TYPES.CLEAN_CART,
});
