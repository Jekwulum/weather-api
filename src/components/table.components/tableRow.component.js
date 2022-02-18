import React from "react";

const degree_calculator = (value) => {
    return (value - 273.15).toFixed(2);
}

const TableRow = propsData => {

    const data = propsData.propsData;
    let img_src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
    let temp = degree_calculator(data.temperature);
    return(
        <tr>
            <td>{data.city}, {data.country}</td>
            <td>{temp} C</td>
            <td>{data.main}</td>
            <td> <img src={img_src} className="icon" alt="" /> </td>
        </tr> 
    )
        
}

export default TableRow;