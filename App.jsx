import './App.css'
import countries from 'world-countries';
import CountryInfo from './CountryInfo.jsx';
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

// main app
function App(){
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<CountryList> </CountryList> } />

        <Route path="/country">
          <Route path=":cca3" element={<CountryDetail> </CountryDetail>}> </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

// components
function CountryDetail(){
    
  const key = useParams();
  const data = getCountryByCca3(key.cca3);

  // get all neighboring countries into an array with information
  const neighbors = data.borders.map((cca3) => {
    return ( getCountryByCca3(cca3) );
  });

  const sortedNeighbors = neighbors.sort((a,b)=> b.area - a.area);

  // string to modify if country is/isn't a UN nation
  let member = "is not";
  if (data.unMember == true){
    member = "is";
  }

  return ( 
    <div> 
    
    <h1> {data.name.common} {data.flag} </h1>
    <h3> <i> {data.name.official} </i> </h3>

    <p> Area: {data.area} km<sup>2</sup> </p>
    <p> Capital: {data.capital}  </p>
    <p> Capital: {data.capital}  </p>
    <p> Continent: {data.region} </p>
    {Object.values(data.currencies).length > 0 && <p> Currency: {Object.values(data.currencies)[0].name} </p> }
    <p> {data.name.common} {member} a member of the United Nations </p>
    
    <br></br>
    
    <h3> Neighboring countries:</h3>
    <div> 
      { sortedNeighbors.map((x, i) => <CountryInfo data = {x} index = {i} key = {x.cca3}>  </CountryInfo> ) }
    </div>
    <div> 
      <a href="http://localhost:5173"> 
        <h2> <u>Back to country list </u> </h2> 
      </a> 
    </div>
    
    </div> )
  
}

function CountryList() {
  
  const [inputString, setInputString] = useState('');
  let sortedArray = sortCountries(countries, inputString);

  return (

    <>
      <div>
        {  <SearchBar 
                inputString={inputString} 
                setInputString={setInputString}
            />  } 
      </div>
      <div>

        { sortedArray.map((x, i) => <CountryInfo data = {x} index = {i} key = {x.cca3}>  </CountryInfo> ) }
        
      </div>
      
    </>
  )
}

function SearchBar({inputString, setInputString}){

  const theSearchBar = (
    <input 
    type="search"
    value={inputString}
    placeholder ="Country Name" 
    onChange={(e) => setInputString(e.target.value)} 
    onKeyPress ={e => {
      if (e.key === 'Enter') {
        setInputString("");
      }
  }}/>
  )

  return theSearchBar;

}

//sort and find functions
function sortCountries(dataset, searchTerm){

  const namesToExclude = ['Antarctica'];
  const filteredSet = dataset.filter(item => !namesToExclude.includes(item.name.common));
  filteredSet.sort((a, b) => b.area - a.area);

  if(searchTerm.length>0){
    const Thingymajang = [searchTerm.toLowerCase()];
    const filteredSet2 = dataset.filter(item => 
      item.name.common.toLowerCase().startsWith(Thingymajang));

      filteredSet2.sort((a, b) => b.area - a.area);
    return filteredSet2;
  }

  const filteredShortenedArray = filteredSet.slice(0, 15);
  return filteredShortenedArray;
  
}

function getCountryByCca3(cca3id){

  const foundCountry = countries.find(({cca3}) => cca3 === cca3id )
  return foundCountry;

}

export default App
