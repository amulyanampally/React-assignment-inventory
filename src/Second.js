import React, { useState } from "react";
import Third from './Third';
import Pagination from './Pagination';
const Second = (props)=>{
    const [currentPage, setCurrentPage]=useState(1);
    const [postsPerPage, setPostsPerPage]=useState(8);
    const [clicked, setClicked]= useState(false)

    const indexOfLastPost = currentPage*postsPerPage;
    const indexOfFirstPost = indexOfLastPost-postsPerPage;
    const currentPost=Object.entries(props.obj).slice(indexOfFirstPost,indexOfLastPost);

    // console.log("indexofLastPost", indexOfLastPost);
    // console.log("indexofFirstPost", indexOfFirstPost);
    // console.log("currentPost", currentPost);

    //console.log('currrrrrrrrrrrrrrrrrrrrr',currentPost);

    const paginate=(pageNumber)=>{
        //console.log("pagenumber from paginate before", pageNumber)
        setCurrentPage(pageNumber)
        //console.log("pagenumber from paginate after", pageNumber)
        setClicked(true);

    }
    //console.log('pos',postsPerPage)


    return (
    <>
    {/* {console.log(Object.entries(props.obj).length)} */}
    <Third objArray={currentPost} searchValue={props.searchValue} onEmpty={props.onEmpty} onNotEmpty={props.onNotEmpty} />
    {/* //{console.log("kkkkkk",postsPerPage)} */}
    <Pagination postsPerPage={postsPerPage} totalPosts={Object.entries(props.obj).length} paginate={paginate}/>
    
    </>);
};
export default Second;