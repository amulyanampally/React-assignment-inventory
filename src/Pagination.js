import React, {useState} from "react";
import classes from './navigation.module.css';
const Pagination =(props)=>{
    let pageNumbers=[];
   
    let a=props.totalPosts/props.postsPerPage;
    let b=Math.ceil(a);
    for(let i=1;i<=b; i++)
    {
        pageNumbers.push(i);
    }
     //console.log('pagenumbers array',pageNumbers)
    // console.log('totalPosts',typeof props.totalPosts)
    // console.log('postsPerpage',typeof props.postsPerPage)
    
    // console.log(a,typeof a)
    // console.log()
    // console.log((props.totalPosts/props.PostsPerPage))
    
    //console.log(props.postsPerPage)
    const [i, setI] = useState(1)
    
    const incrementI=()=>{
        
        setI(i+1);
    }
    const decrementI=()=>{
        setI(i-1);
    }

    return (<>
        {/* {console.log('i',i)} */}
{i<=pageNumbers[pageNumbers.length-10] && 
<div className={classes.pagination}>
{i!==1 && <button onClick={decrementI}>prev</button>}
<button className={classes.pagination} onClick={()=>{props.paginate(i)}}>{i}</button>
<button onClick={()=>{props.paginate(i+1)}}>{i+1}</button>
<button onClick={()=>{props.paginate(i+2)}}>{i+2}</button>
<button onClick={()=>{props.paginate(i+3)}}>{i+3}</button>
<button onClick={()=>{props.paginate(i+4)}}>{i+4}</button>
<button onClick={()=>{props.paginate(i+5)}}>{i+5}</button>
<button onClick={()=>{props.paginate(i+6)}}>{i+6}</button>
<button onClick={()=>{props.paginate(i+7)}}>{i+7}</button>
<button onClick={()=>{props.paginate(i+8)}}>{i+8}</button>
<button onClick={()=>{props.paginate(i+9)}}>{i+9}</button>
{i!==pageNumbers[pageNumbers.length-10] &&<button onClick={incrementI}>next</button>}
    </div>}

   



{/*      
    {pageNumbers.map((number)=>{return <button onClick={()=>{props.paginate(number)}}>{number}</button>})}  */}
    
    
    
    
    </>);
};
export default Pagination;