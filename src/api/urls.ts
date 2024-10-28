export const Urls={
    location: {
        list:(city:string)=> `/geocode/v1/json?q=${city}&key=f25687e43d1a4d84902711294e3c89cd`
    },
    weather: {
        list:(lat:number,lon:number)=> `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=44c433216f021de965e83d3cc2218c78&units=metric` 
    }
}