import React from "react";


const TableRow = propsData => {

    const data = propsData.propsData;
    let img_src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
    return(
        <tr>
            <td>{data.city}, {data.country}</td>
            <td>{data.temperature} &#8451;</td>
            <td>{data.main}</td>
            <td> <img src={img_src} className="icon" alt="" /> </td>
        </tr> 
    )
        
}

export default TableRow;