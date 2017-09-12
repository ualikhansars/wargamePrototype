export const deleteObjectFromArray = (object:any, arr:any[]) => {
  let updatedArr = arr.filter((el) => {
    if(el.x === object.x && el.y === object.y) {
      return false;
    }
    return true;
  });
  return updatedArr;
}

export const isObjectInArray = (object:any, arr:any[]) => {
  let result:boolean = false;
  for(let node of arr) {
    if(object.x === node.x && object.y === node.y) {
      result = true;
    }
  }
  return result;
}
