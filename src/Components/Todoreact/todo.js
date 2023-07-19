import React, {useState,useEffect} from 'react';
import "./style.css";

const getLocalData=()=>{
    const lists=localStorage.getItem("mylist");

    if(lists){
        return JSON.parse(lists);
        
    }
    else
    return [];
}


const Todo = () => {
    const[inputData,setInputData]=useState("");
    const[items,setItems]=useState([getLocalData()]);

    const addItem=()=>{
        if(!inputData)
        alert('Fill the form');
        else
        {
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputData,
            };
            setItems([...items,myNewInputData]);
            setInputData("");
        }
    };

    const deleteItem=(index)=>{
        const updatedItems=items.filter((curElem)=>{
            return curElem.id!==index;
        });
        setItems(updatedItems);
    };

    const removeAll=()=>{
       setItems([]); 
    }

    useEffect(()=>{localStorage.setItem("mylist",JSON.stringify(items))},[items]);

  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="./images/todo.svg" alt="todo logo"/>
                <figcaption>Add Your List Here</figcaption>
            </figure>
            <div className='addItems'>
                <input type="text"
                placeholder='Add Item'
                className='form-control'
                value={inputData}
                onChange={(event)=>setInputData(event.target.value)}
                />
                <i className="fa fa-plus add-btn" onClick={addItem}></i>
                </div>
                <div className='showItems'>
                    {items.map((curElem,index)=>{
                        return (
                        <div className='eachItem' key={index}>
                        <h3>{curElem.name}</h3>
                        <div className='todo-btn'>
                        <i className="far fa-edit add-btn"></i>
                        <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                        </div>
                        </div>
                        );
                    })}
                
                </div>
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
    </div>
    </>
  )
}

export default Todo