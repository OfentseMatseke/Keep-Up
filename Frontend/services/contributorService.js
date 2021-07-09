import {http} from './httpService';

const currentDate =new Date();
export const getAllBySuburb =async (suburb) =>{
    const path = `/getContributors?suburb=${suburb}`;
    try {
        
        const {data } =await http.get(path);
        return data;

    } catch (error) {
        throw new Error(error);
    }
}

export const getAllByMonthAndSuburb = async (suburb, month, year = currentDate.getFullYear()) =>{
    try {
        let result ;
         result = await getAllBySuburb(suburb);
         return  result.filterByMonthAndYear(month,year);

    } catch (error) {
        throw new Error(error.message);
    }
}

