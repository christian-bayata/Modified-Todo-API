var operatives = [{
    id: 12,
    name: "Frank"
},
{
    id: 34,
    name: "Chi-Chi"
},
{
    id: 46,
    name: "Badaman"
},
{
    id: 76,
    name: "Gidanpali"
}]

let arrFinder = operatives.some((item) => item.id > 78)

if(arrFinder) {
    console.log(operatives.filter((item) => item.id > 30));
} else {
    console.log("id not found")
}