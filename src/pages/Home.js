import React, { useState, useRef } from 'react'
import Header from '../components/Header'
import { itemsObj } from "../itemsObj.js"
import { Link } from 'react-router-dom'
import moment from 'moment'


const Home = () => {
    
    const [searchResults, setSearchResults] = useState(new Set())
    const [showPara, setShowPara] = useState(true)
    const [toggleReadMore, setToggleReadMore] = useState("")
    const [displaySearchNotice, setDisplaySearchNotice] = useState(false)
    const searchResultsHeightRef = useRef()

    function inputChange(e){
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


        if (e.target.value === "" && set.size !== 0){
            setSearchResults("")
            setDisplaySearchNotice(false)
        }else if(e.target.value.length > 0 && set.size === 0){
            setDisplaySearchNotice(true)
        }else{
            setDisplaySearchNotice(false)
        }      
    }

    function readMore(){
        if(showPara){
            setToggleReadMore("...read more")
            setShowPara(false)
        } 
        if(!showPara){
            setToggleReadMore("")
            setShowPara(true)
        } 
    }

    return (
        <>
            <Header/>

            <div className='bg-container bg-image'>

                <div className='overlay '>
                    <div className='date'>{moment().format("MMM Do YYYY")}</div>
                    <div className='grid-wrapper'>
                        <div className='search-area'>
                            <div className='input-div'><input className='search-bar' onChange={(e)=>inputChange(e)} type='text' placeholder='Enter item you are looking for'/></div>
                            
                            <div ref={searchResultsHeightRef} className="search-results-div"> 
                                { displaySearchNotice ? <div className='notice'>*the item you are looking for is likely not sold here! Consider searching with other names.</div> : "" }
                                {
                                    [...searchResults].map(item=>{
                                        
                                        return <Link style={{textDecoration: "none", color: "#000"}}
                                                    to = "/locations" 
                                                    state = {itemsObj.filter(value => value.contents.includes(item))}>
                                                    <div className='returnedSearchItem'> {item} </div>
                                                </Link>
                                    })
                                }
                            </div>
                        </div>

                        <div className='find-by-location'>
                            <div className='find-by-location-div'>
                            <Link to = "/locations" style={{textDecoration: "none", color: "#000"}}><button className='find-btn'>Find items by location</button></Link>
                            </div>
                        </div>

                    </div>


                    <div className='about'>
                        <br/>
                        <h2>About this site</h2>
                        <br/>
                        <p className = "about-paragraph">
                            The Onitsha Main Market(OMM) is considered to be the largest market in West Africa in terms of landmass and
                            volumee of goods traded. <br/><br/>

                            It's items of trade majorly includes clothings, electronic gadgets, food items, articles(stationeries, 
                            house-hold items etc.) etc. Many of the items not found there will most likely be found in surrounding
                            markets like: 1. The Head bridge market; which deals on: Phamaceuticlas, Timber, Constructino materials, etc.
                            2. Iweka road; which deals on House-hold appliances: Washing machines, Televisions etc. 3. Electronic 
                            Market, Obosi, which deals on all kinds of electrical appliances. 4. Ochanje market: various kinds of shoes,
                            food stuff etc. 

                            <span onClick={readMore}><i className='readMore' style={{fontWeight: "bold", color: "blue", cursor: "pointer"}}>{toggleReadMore} </i></span>

                            { showPara ? <p className='readMoreOrLess'>
                                <br/>
                                Due to the richness in ranges of products, the Onitsha Market has successfully attracted customers from all
                                parts of Nigeria, as well as surrounding countries like Cameroun, Benin-Republic, Niger etc.
                                <br/><br/>
                                An average trader in OMM imports a minimum of 3 40-feet container annually. OMM is managed by Onitsha Market
                                Traders Association(OMTA).
                                <br/><br/>
                                <p className='luckily'>Luckily, most goods traded here are sectioned in various areas of the market and even further sub-divided into
                                lines for ease of location. This site intends to serve you on this purpose of filtering the areas 
                                where your desired item(s) would be easily found. Use <strong>"Find items by location"</strong> to see various categories of
                                items and where they are sold. Or simply enter the item(s) in the <strong>Search Bar</strong> on this Home page 
                                for quick access. Enjoy! <span onClick={readMore}><i className='showMore' style={{fontWeight: "bold", color: "blue", cursor: "pointer"}}> ...show less </i></span>
                                </p>
                            </p> : "" }
                        
                        </p>
                    </div>

                    <div className='contact'>
                        <hr className='hr'/>
                        <p className='contact-paragraph'>
                        <br/>
                            <h2>Contact use at:</h2>
                            <br/>
                            <strong>Address:</strong> Hotel Marina, Main Market Onitsha, Anambra State.<br/>
                            <strong>Email:</strong> mainmarketosha@gmail.com<br/>
                            <strong>Phone:</strong> +234 912 528 1862
                        </p>
                    </div>
                </div>

            
            </div>
        </>
    )
}

export default Home
