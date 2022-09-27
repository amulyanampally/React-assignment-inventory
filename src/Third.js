import React from "react";
import Middle from "./Middle";
const Third =(props)=>{
    return(<>
    {/* {(searchValue!==null) &&	  Object.entries(obj).map((value)=>(<Middle item={value} searchValue={searchValue} onEmpty={emptyHandler} onNotEmpty={notEmptyHandler}/>))}
	{(searchValue===null) &&    Object.entries(notSearchData).map((value)=>(<Middle item={value} searchValue={searchValue} onEmpty={emptyHandler} onNotEmpty={notEmptyHandler} />))} */}
{/* {console.log("from third", props.objArray[0])}    */}
    {props.objArray.map(value=>(<Middle item={value} searchValue={props.searchValue} onEmpty={props.onEmpty} onNotEmpty={props.onNotEmpty} />))}
    
    </>);
};
export default Third;