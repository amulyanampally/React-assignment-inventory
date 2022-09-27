import React, { useEffect, useState } from "react";
import classes from './Table.module.css';
const Display=(props)=>{
    //console.log(props.data.name);
    const changeHandler=(event)=>{
        props.onBatchSelectHandler(event.target.value);
    }  
    
    return(
    <>      
    {props.data!=null &&
        <table className={classes['content-table']}>
            <tbody>
                <tr>
                    <td>{props.data.name}</td>
                    <td>
                    <select  id='batch' onChange={changeHandler}>
                <option value='ALL'>ALL</option>
                {props.data.batch.map((batch)=>{return <option value={batch} >{batch}</option>})}

                </select>
                    </td>
                    <td>{props.data.stock}</td>
                    <td>{props.data.deal}</td>
                    <td>{props.data.free}</td>
                    <td>{props.data.mrp}</td>
                    <td>{props.data.rate}</td>
                    <td>{props.data.exp}</td>
                    <td></td>
                </tr>             
            </tbody>
        </table>}
    </>
    );
};
export default Display;