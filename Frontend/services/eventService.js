import {http } from './httpService';
const currentDate = new Date();

export const getAllByMonthAndSuburb = async (suburb,month, year = currentDate.getFullYear() )=>{

    try {
        let results = await getAllBySuburb(suburb);
        return  results.filterByMonthAndYear(month,year);
    } catch (error) {
        throw new Error(error.message);
    }   
}

export const getAllBySuburb = async (suburb)=>{

    const urlPath = `getEvents?suburb=${suburb}`;

    try {
        const {data } =await http.get(urlPath);
        return data;

    } catch (error) {
        
        throw new Error(error.message);
    }
}

export const getAllUpComing =async (suburb)=>{

    try {
        let  result ;
        result = await getAllBySuburb(suburb);

        if(result.length >  0 ){
           return  result.filter(event =>new Date(event.date).getTime() > currentDate.getTime());
        }
        return result;

    } catch (error) {

        throw new Error(error.message);
    }
}

export const getCompleted = async(suburb, month = null) =>{

    try {
        let result ;

        if(month != null)
            result = await getAllByMonthAndSuburb(suburb,month,currentDate.getFullYear());
        else
            result = await getAllBySuburb(suburb);

        if(result.length > 0 )
            return result.filter(event => new Date(event.date).getTime() < currentDate.getTime());

        return  result;

    } catch (error) {

        throw new Error(error.message);
    }
}