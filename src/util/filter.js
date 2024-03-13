export const filterArrayBasedOnValue = (arrayList, propertyName, targetValue)=>{
const filteredObjects = arrayList.filter(obj => obj[propertyName] === targetValue);
return filteredObjects;
}