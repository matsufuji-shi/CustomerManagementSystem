// import { useState, useEffect } from 'react';
// import apiService from '../services/api';

// const useCategories = () => {
//     const [categoryList, setCategoryList] = useState([]);

//     const refreshCategories = () => {
//         apiService.getLists().then(response => {
//             setCategoryList(response.data);
//         });
//     };

//     useEffect(() => {
//         refreshCategories();
//     }, []);

//     return { categoryList, refreshCategories };
// };

// export default useCategories;
