// https://api.covid19api.com/dayone/country/south-africa
let url=`https://api.covid19api.com/summary`

// https://restcountries.com/v3.1/name/{name}



async function UpdateMap(){
    let data=await fetch(url)
    let res=await data.json()
    // console.log(res)

    let list=res.Countries;
    list.map(async function(element){
        let data1=await fetch(`https://restcountries.com/v3.1/name/${element.Country}`)
        let res1=await data1.json()

        let lat=res1[0].latlng[0]
        let lng=res1[0].latlng[1]
        console.log(lat,lng)


        let cases=element.TotalDeaths
        if(cases>255){
            color="rgb(255,0,0)"
        }
        else if(cases>100 && cases<255){
            color="rgb(197, 62, 56)"
        }
        else{
            color=`rgb(${element.TotalDeaths},0,0)`
        }


    new mapboxgl.Marker({
        draggable: false,
        color:color
        
        })
        .setLngLat([lat, lng])
        .addTo(map);

    })


}
UpdateMap()

let interval=2000
setInterval(UpdateMap,interval)