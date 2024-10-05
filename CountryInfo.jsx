function CountryInfo({data}){

    //a href redirects the page to teh specific country page
    return (

        <div> 
            <a href={`/country/${data.cca3}`}> 
                <p> {data.flag} <b> { data.name.common } </b> </p> 
            </a>
            <p> {data.area} km<sup>2</sup> </p>
            <ColoredBar area = {data.area}></ColoredBar> 
        </div>
    
    )
}

function ColoredBar({ area }) {

    let referenceArea = 17098242;
    let countryArea = area;

    let ratio = 600 * countryArea/referenceArea;

    const bar = {
      backgroundColor: 'blue',
      height: '8px',
      width: `${ratio}px`,
    };

    return <div style={bar}></div>;
}

export default CountryInfo;