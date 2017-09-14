

class Unit {
  name: string;
  quantity: number;
  commanderPositionX: number;
  commanderPositionY: number;
  constructor(name:string, quantity:number, posX:number, posY:number) {
    this.name = name;
    this.quantity = quantity;
    this.commanderPositionX = posX;
    this.commanderPositionY = posX;
  }
}

export default Unit;
