import React, {useEffect, useState} from "react";
import Display from "./Display";
import classes from './Table.module.css';
const Middle =(props)=>{
    const [batchDisplay, setBatchDisplay]=useState('ALL');
    const [data, setData]=useState(props.item[1]);
    const [empty, setEmpty]=useState(false);

//    console.log("from middle basic", props.item[1])
    useEffect(()=>{
        // if(props.searchValue!==null && batchDisplay==='ALL')
        // {
        //     setData(props.item[1]);
        //     console.log("searchValue", props.searchValue);
        //     console.log("every time set data", data);
        //     console.log("useEffecteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        // }
        if(batchDisplay==='ALL')
        setData(props.item[1])
    });
    
    
    const [newItem, setNewItem]=useState(null);
    let batchArray=[];
    props.item[1].forEach(element => {
        if(!batchArray.includes(element.batch))
        {

            batchArray.push(element.batch);
        }
        
    });
        
             


   

    const batchChangeHandler=(selectedBatch)=>{
        setBatchDisplay(selectedBatch); 
    }

    useEffect(()=>{     
       // console.log(batchDisplay)   
        if(batchDisplay==='ALL')
        {
            
        setData(props.item[1]);
        }
        else
        {   
            let newData=[...props.item[1]]
            let arr = newData.filter(element => {
                return element.batch===batchDisplay;
                
            });
            setData(arr);
            // console.log("seeeeettttinggggggggggg", arr)
        }

    },[batchDisplay]);

    useEffect(()=>{  
        // console.log("afterrrrrrrrrrr seting", data)      
            let stockArray=[];
            let dealArray=[];
            let freeArray=[];
            let mrpArray=[];
            let rateArray=[];
            let dateArray=[];
        
            data.map((value)=>{
                stockArray.push(value.stock);
                dealArray.push(value.deal);
                freeArray.push(value.free);
                mrpArray.push(value.mrp);
                rateArray.push(value.rate);
                
                const month=value.exp.slice(3,5);
                const date=value.exp.slice(0,2);
                const year=value.exp.slice(6,10);
                let dateString=year+'/'+month+'/'+date;
                dateArray.push(new Date(dateString));          
        
            })
            const stockSum=stockArray.reduce((total, num)=>parseInt(total)+parseInt(num));
            let newCreatedItem={};
            newCreatedItem.batch=[...batchArray];
            newCreatedItem.name=props.item[0];
            newCreatedItem.deal=Math.min(...dealArray);
            newCreatedItem.stock=stockSum;
            newCreatedItem.free=Math.min(...freeArray);
            newCreatedItem.mrp=Math.max(...mrpArray);
            newCreatedItem.rate=Math.max(...rateArray);
            const minDate=(new Date(Math.min.apply(null,dateArray))).toLocaleDateString();
            newCreatedItem.exp=minDate;
        
        setNewItem(newCreatedItem)
        
        },[data]);  
    
    
return (
    <>
    {/* {console.log('from middle strong', newItem)} */}
        {newItem?<Display className={classes['content-table']} data={newItem} onBatchSelectHandler={batchChangeHandler} />:props.onEmpty()}
        {newItem && props.onNotEmpty()}

         
    </>
)

};
export default Middle;