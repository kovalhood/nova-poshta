import { nanoid } from 'nanoid'
import { createAction } from '@reduxjs/toolkit'

const addSearch = createAction('searches/Add', (number) => ({
    payload: {
        id: nanoid(6),
        number,
    },
}));

const deleteSearchById = createAction('searches/DeleteById');
const deleteSearchByName = createAction('searches/DeleteByName');
const deleteAll = createAction('searches/DeleteAll');

export default { addSearch, deleteSearchById, deleteSearchByName, deleteAll };