import { createStore } from 'easy-peasy'; 
import storeModel from '../models/storeModel';

const store = createStore(storeModel); 

export default store;