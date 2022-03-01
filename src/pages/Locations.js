import React, { useEffect, useState } from 'react'
import { itemsObj, categories } from "../itemsObj.js"
import { useLocation } from 'react-router-dom'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

categories.sort()

let allTracker = itemsObj
let filteredCat = null

function Container(){
    let [ state, setState ] = useState(allTracker);
    const [ displayCatItems, setDisplayCatItems ] = useState(true)
    const [ trackScroll, setTrackScroll ] = useState(false)
    const [ displayTop, setDisplayTop ] = useState(false)
    const [ toggleResultsDiv, setToggleResultsDvi ] = useState('results-div-none')

    let location = useLocation()

    const [ searchResults, setSearchResults ] = useState(new Set())
    const [ fromInput, setFromInput ] = useState(location.state)

    function findItemsAndLocations(item){
        setFromInput(null)

        if(item==="all"){    
            setState(itemsObj)
        }
        
        if(item !== "all"){
            filteredCat = itemsObj.filter(x => x.categories.includes(item))
            setState(filteredCat)
        }
    }

    function findBySearch(item){
        setFromInput(null)
        setState(itemsObj.filter(x => x.contents.includes(item)))
    }

    function displayCatItemsFunction(){
        if(displayCatItems) setDisplayCatItems(false)
        else setDisplayCatItems(true)
    }

    const toggleVisibility = () => {
        let position = window.pageYOffset

        if (position > 100) {
            setTrackScroll(true)
        } else {
            setTrackScroll(false)
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll", toggleVisibility)

        return ()=>{
            window.removeEventListener('scroll', toggleVisibility)
        }
        
    }, [])

    const handleScrollUp = () => {
        window.scrollTo({top: 0, behavior: "smooth" });
    }


    function inputChange(e){

        if(e.target.value.length === 0 ){
            setSearchResults([])
            setDisplayTop(false)
            setToggleResultsDvi("results-div-none")
        }else{
            const input = e.target.value.replace(/ /g, '')
            let set = new Set();
            let suggestedItems=[]
    
            //filter objects and item
            itemsObj.forEach(value =>{
                let obj = value.contents;
                obj.forEach(item=>{
                    if(item.toLowerCase().replace(/ /gi, '').includes(input.toLowerCase())){
                        suggestedItems.push(item)                     
                    }
                })
            })
            
            set = new Set([...suggestedItems])
            setSearchResults(set)

            setDisplayTop(true)
            setToggleResultsDvi('results-div')
        }     
    }

    return(
        <>
            <div  className='locationsAndItems'>

                {/* search area */}
                <div className='s-area'>
                    <div className='i-div'><input className='i-bar' onChange={(e)=>inputChange(e)} type='text' placeholder='search item'/></div>
                                
                    <div className={toggleResultsDiv}> 
                        { displayTop ? <div className='topResults'>Top results:</div> : "" }
                        {
                            [...searchResults].slice(0, 6).map(item=>{     
                                return <button className='returnedItem' onClick={()=>findBySearch(item)}> {item} </button>
                            })
                        }
                    </div>
                </div>


                <LocationsAndItems currentState={ fromInput || state }/>      

                <div className='hashTagsContainer'>
                    <div className='popular' onClick={displayCatItemsFunction}>Popularly searched items</div>
                    { displayCatItems ?  <div className='cat-items-div' ><div style={{fontStyle: "italic", fontWeight: "bold", fontSize: "1rem"}}>*click to find location</div>{categories.map((item)=><button className="catItem" key={item} 
                    onClick={()=>findItemsAndLocations(item)}>
                        {`#${item}`}</button>)}</div> : null }
                </div>

                { trackScroll ? <div className='upwardArrow'><div className= 'goTop' onClick={handleScrollUp}> <div className='arrow'><ArrowUpwardIcon/></div><div>Return to top</div> </div></div> : "" }
            </div>
        </>
    )
}

const LocationsAndItems=(props)=>{  
    const state = props.currentState

    return(
        <div className='wrapper'>
            <div className='resultHeading'>Results:</div>
            {
                state.map(element=>{
                    const { id, lineName, contents, categories} = element

                return <div className="container">
                            <h1 className='heading'>{lineName}</h1>
                            <div className='contentAndCategory' key={id}>
                                <div className='contents'>{contents.map(item=><div className='eachItem'>{item}</div>)}</div>
                                <div className='categories'>
                                    categories: {categories.map((item,index)=>(index!==categories.length-1) ? `${item}, ` : item)}
                                </div>
                            </div>
                        </div>
                })
            }              
        
        </div>
    )
}

const Locations = () => {
    return (
        <>
            <div className='bg'>
                <Container/>
            </div>  
        </>
    )
}

export default Locations