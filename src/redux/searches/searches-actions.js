import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const addSearch = createAction('searches/Add', (number) => ({
    payload: {
        id: nanoid(6),
        date: Date.now(),
        number,
    },
}));

const deleteSearchById = createAction('searches/DeleteById');
const deleteSearchByName = createAction('searches/DeleteByName');
const deleteAll = createAction('searches/DeleteAll');

export default { addSearch, deleteSearchById, deleteSearchByName, deleteAll };