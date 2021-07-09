export const sumOf = (data, propertyName = null)=>{
    let total = 0;
    for (let x = 0; x < data.length; x++) {
        const item = data[x];
        if(propertyName){
            total += Number(item[propertyName]);
        }else{
            total += item;
        }
    }
    return   total;
}

Array.prototype.filterByMonthAndYear = function (month,year,datePropertyName = 'date') {
    let input = this;
    return input.filter(item => {
        const date = new Date(item[datePropertyName]);
        return date.getMonth() === month && date.getFullYear() === year;
    });
}