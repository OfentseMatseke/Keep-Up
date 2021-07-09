import {http} from './httpService';
import * as helper from "../utils/helpers";


const currentMonth = new Date().getMonth();
export const getAll = async () => {
    try {
    const { data } =  await http.get(`/getDonations`);
    return data;
    } catch (error) {
    throw new Error(error.message);
    }
}

export  const getMonthlyDonations =async (suburb) =>{
    try {

        const moneyReceivedArr = [];
        const allDonations =await getAll(suburb);
        for (let x = 0; x <= currentMonth; x++) {
            const results =allDonations.filter(donation=>new Date(donation.transactionDate).getMonth() === x);
            const sum = helper.sumOf(results, 'amount');
            moneyReceivedArr.push(sum);
        }
        return moneyReceivedArr;

    }catch (e) {
        throw  new Error(e.message);
    }
}
export const getAllByMonthAndSuburb = async (suburb, month, year =null)=>{
    try {
        if(year === null) year = new Date().getFullYear();

        let results = await getAllBySuburb(suburb);

        if( results.length > 0 )
           return  results.filterByMonthAndYear(month,year,'transactionDate');

        return results;
    } catch (error) {
        throw new Error(error.message)
    }
}


export const getAllBySuburb =async (suburb)=>{
    try {
        let result =  await getAll();

        if( result.length > 0 )
          return  result.filter(donation => donation.reference.toLowerCase() === suburb.toLowerCase());

        return result;

    } catch (error) {

        throw new Error(error.message); 
    }
}

