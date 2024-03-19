
//import './infiniteScroll.css';

import { useRef, useState } from 'react';
import styleObj from './style.module.css' ;
import { useFetchData } from '../hooks/useFetchData';

/**
 * you can provide styling via CSS module - style.module.css
 *   1. avoid collision b/w the css class name of componnets.
 *   2. It also append a unique identifier.
 * 
 */

const Infinite = () =>{
    {/**
       1. Fetch the data, pagination -> click on next button will get the second set of data elements.
            1. we have shown static data.
            2. make fetch API call to get the dynamic data
                - show loader
                - as you recieve the data then hide the loader and render the data.
                - get the paginated data only (show only next 10 set of data)
                - implemented the pagination
                - custom hook - reusing the logic
        2. Infinite Scrolling: 
            2.1. create the ref for the last element in the list
            2.2. Use Intersection Observer API.
            2.3. When the last element will come in the viewport load the next set of data.
    */}

    const [pageNum, setPageNum] = useState(1);

    const { data , error, isLoading } = useFetchData(pageNum);

    const observer = useRef(null);

    const getLastElementRef = (elem) => {
       console.log(elem);

       if(!elem || isLoading) return;

       if(observer.current) {
        observer.current.disconnect();
       }

       observer.current = new IntersectionObserver((entries)=>{
        console.log(entries);

        // const [entry] = entries; // [entry] = entires[0]
        // console.log(entry);

        if(entries[0].isIntersecting) { // if isIntersecting
            setPageNum((prevPage) => prevPage+1);
        }

       },
       {threshold: 1}
       );

       observer.current.observe(elem);
    }

    return(
        <>
          <h1 className={styleObj.heading}>Machine coding problem: Infinite Scrolling/Lazy loading </h1>

          <div className={styleObj.container}>

            {
                error && (<div>{error.message}</div>)
            }

            {

                data && data.map((item, index)=>{
          
                  if(data.length === index + 1) { //10 === 0+1
                    return <div ref={(elem)=>{getLastElementRef(elem)}} className={styleObj.body_text} key={item.id}>{item.body}</div>
                  } else {
                    return <div className={styleObj.body_text} key={item.id}>{item.body}</div>
                  }
                })
                // data && data.map((item)=>{
                //     return <div className={styleObj.body_text} key={item.id}>{item.body}</div>
                // })

            }

            {
             isLoading && (<div className={styleObj.loader}></div>)
            }

            {/* <div>{pageNum}</div>
            <button onClick={
                    ()=>{
                        setPageNum(pageNum + 1);
                    }
            }>next</button> */}
          </div>
        </>
    )
}

export default Infinite;