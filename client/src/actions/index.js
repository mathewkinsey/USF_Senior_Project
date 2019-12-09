import { GET_TABLES, 
    GET_USER, 
    GET_RESULTS, 
    GET_TICKETS, 
    GET_TOTAL_COMPARISONS,
    GET_COMPARISON_COUNT,
    GET_SELECTED_TABLES,
    GET_PREVIOUS_TICKETS
} from './types';
import axios from 'axios';


const userName = [];
export const fetchUser = () => dispatch =>{
    if(Array.isArray(userName) && userName.length === 0){
        dispatch({
            type: GET_USER,
            payload: false
        })
    }
    else{
        dispatch({
            type: GET_USER,
            payload: userName[0]
        })
    }
}
export const setCounter = (count) => dispatch =>{
    dispatch({
        type: GET_COMPARISON_COUNT,
        payload: count
    })
}
export const decreaseCount = (count) => dispatch =>{
    const newCount = count - 1;
    dispatch({
        type: GET_COMPARISON_COUNT,
        payload: newCount
    })
}
export const getTables = (tables) => dispatch =>{
    delete tables.comparisons;
    dispatch({
        type: GET_TABLES,
        payload: tables
    })
}

export const fetchResults = (User) => async dispatch =>{
    const comparisons = await axios.get('/api/scores', {
        params: {
            user: User
        }
    });
    dispatch({
        type: GET_RESULTS,
        payload: comparisons
    })
}
export const fetchTickets = () => async dispatch =>{
    const tickets = await axios.get('/api/tickets');
    dispatch({
        type: GET_TICKETS,
        payload: tickets
    })
}

export const fetchCSV = (exportData) => async dispatch =>{
    const {user, dateOne, dateTwo, selectedExport} = exportData;
    window.open(`http://localhost:5000/api/exportCSV?user=${user}&dateOne=${dateOne}&dateTwo=${dateTwo}&select=${selectedExport}`);
    //window.open(`https://changegear-ticket-system.herokuapp.com/api/exportCSV?user=${user}&dateOne=${dateOne}&dateTwo=${dateTwo}&select=${selectedExport}`);
}

export const fetchAllResults = (user) => async dispatch =>{
    const count = await axios.get('/api/results/total', {
        params: {
            user: user
        }
    });
    dispatch({
        type: GET_TOTAL_COMPARISONS,
        payload: count
    })
}
export const addResult = (item, User) => async dispatch =>{
    await axios.post('/api/results', item);
    const comparisons = await axios.get('/api/scores', {
        params: {
            user: User
        }
    });
    dispatch({
        type: GET_RESULTS,
        payload: comparisons
    })
}
export const addSelectedTables = (tableNames) => dispatch =>{
    dispatch({
        type: GET_SELECTED_TABLES,
        payload: tableNames
    });
}
export const fetchPreviousSelected = (ticket1, ticket2, fields) => async dispatch =>{
    const PreviousSelected = await axios.get('/api/previousScores', {
        params:{
            OID1: ticket1,
            OID2: ticket2,
            selected: fields
        }
    });
    dispatch({
        type: GET_PREVIOUS_TICKETS,
        payload: PreviousSelected
    });
}
export const deleteResult = (id, User) => async dispatch=>{
    await axios.delete(`/api/results/delete/${id}`);
    const updatedResults = await axios.get('/api/scores', {
             params: {
                 user: User
             }
         })
    dispatch({
        type: GET_RESULTS,
        payload: updatedResults
    })
}
export const getUser = (user) => dispatch =>{
    userName.push(user);
}
export const logOut = () => dispatch =>{
    userName.pop();
}

