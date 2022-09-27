import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import Middle from './Middle';
import Second from './Second';
import classes from './Table.module.css';

const allowedExtensions = ["csv"];

function App() {
	const searchRef = useRef(null);
	const [empty, setEmpty]=useState(false)
	const [displayError, setDisplayError]=useState(false)
	const [isParsed, setIsParsed]=useState(false);
	const [obj, setObj]=useState({});
	const [objectData, setObjectData] = useState({});
	const [searchValue, setSearchValue]=useState(null);
    const [parData, setParData] = useState([]);
	const [headings, setHeadings] = useState([]);
	const [data, setData] = useState([]);	
	const [error, setError] = useState("");	
	const [file, setFile] = useState("");
	
	const emptyHandler=()=>{
		setEmpty(true)
	}
	const notEmptyHandler=()=>{
		setEmpty(false)
	}

	useEffect(()=>{	
		if(searchValue!=null)
		{
			if(!empty)
			{
					setDisplayError(false);
			}
			else
			{
					setDisplayError(true);
			}
		}
		else
		{
				setDisplayError(false);
		}

	},[empty, searchValue])
	

	const searchHandler=()=>{
		setSearchValue(searchRef.current.value);
		if(searchRef.current.value.trim()==='')
		{
			setSearchValue(null);
		}
	}

	const searchCancelHandler=(event)=>{
		if(event.target.value.trim()==='')
		{
			setSearchValue(null);
		}		
	}
	
	const handleFileChange = (e) => {
		setError("");		
		if (e.target.files.length) {
			const inputFile = e.target.files[0];		
			const fileExtension = inputFile.type.split("/")[1];      
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}
			setFile(inputFile);
		}
	};

	const handleParse = () => {		
		setIsParsed(true);
		if (!file) return setError("Enter a valid file");
		const reader = new FileReader();		
		reader.onload = async ({ target }) => 
		{
		const csv = Papa.parse(target.result, { header: true });
		const parsedData = csv.data;
		const columns = Object.keys(parsedData[0]);
		setParData(parsedData)
		setData(columns);
		setHeadings(columns);    
		};
		reader.readAsText(file);		
	};

useEffect(()=>{
	let objec={};
	parData.forEach(value=>{
		let i=value.name
		if(value.name in objec)
		{
			objec[i].push(value);
		}
		else
		{
			objec[i]=[value];
		}

		if(searchValue!==null)
		{
		let newObj={};
		Object.entries(objec).forEach((element)=>{
			if(element[1][0].name.toLowerCase().includes(searchValue.trim().toLowerCase()))
			{
				if(element[0] in newObj)
				{
					
				}
				else{
					newObj[element[0]]=[...element[1]];
				}
			}
		})
		setObj(newObj);
		}
		else
		{
		setObj(objec);
		}

	})
},[searchValue, parData]);



	let notSearchData={};
	parData.forEach(value=>{
		let i=value.name;
		if(value.name in notSearchData)
		{
			notSearchData[i].push(value);
		}
		else
		{
			notSearchData[i]=[value];
		}});
	
	
let newHeadings=[...headings];
 newHeadings.pop();
 newHeadings.pop();
 newHeadings.shift();

  return (
   <>
   <div >
			

<center className={classes.cn} >
	
			<h1>Inventory</h1>

			<label htmlFor="csvInput" style={{ display: "block" }}>
				Insert File
			</label>
			<input  style={{ display: "block" }}   
				onChange={handleFileChange}
				id="csvInput"
				name="file"
				type="File"
			/>
			<div>
				<button onClick={handleParse}>Submit</button>
			</div>
			<div>
				{/* {isParsed && <label htmlFor="search">Search:</label>} */}
				{isParsed && <input type='search' name='search here' placeholder="search" id="search" ref={searchRef} onChange={searchCancelHandler}/>}
				{isParsed && <button onClick={searchHandler}>Search</button>}
			</div>
</center>
			
				{
				!displayError &&      
				<table className={classes['content-table']} >     
	  				<thead>
						<tr>

        				{newHeadings.map((value)=>(<th>{value}</th>))}
						</tr>
      				</thead>
    			</table>
				}
		{/* {console.log(obj,notSearchData)} */}


{(searchValue!==null) && <Second obj={obj} searchValue={searchValue} onEmpty={emptyHandler} onNotEmpty={notEmptyHandler}/>}
{(searchValue===null) && <Second obj={notSearchData} searchValue={searchValue} onEmpty={emptyHandler} onNotEmpty={notEmptyHandler}/>}

				{/* {(searchValue!==null) &&	  Object.entries(obj).map((value)=>(<Middle item={value} searchValue={searchValue} onEmpty={emptyHandler} onNotEmpty={notEmptyHandler}/>))}
				{(searchValue===null) &&    Object.entries(notSearchData).map((value)=>(<Middle item={value} searchValue={searchValue} onEmpty={emptyHandler} onNotEmpty={notEmptyHandler} />))}
     */}
				{displayError && <h1>Sorry, no items to display</h1>}					
			</div>
   </>
  );
};

export default App;
