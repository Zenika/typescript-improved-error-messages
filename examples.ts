// specified object type
const obj1: {prop: boolean} = {prop: true}
obj1.otherProp;

// ingerred object type
const obj2 = {prop: true}
obj2.otherProp;

// inferred literal type
const obj3 = 1
obj3.otherProp;

// specified literal type
const obj4: 1 = 1
obj4.otherProp;

// inferred union of literal types
const obj5 = true ? 1 : "1"
obj5.otherProp

// specified union of literal types
let obj6: 1 | "1"
obj6.otherProp

// partially specified union type
const objA: boolean = true
const obj7 = false ? 42 : objA
obj7.otherProp

// specified array type with specified element type
const obj8: string[] = ["1"]
obj8.otherProp;

// inferred array type with inferred element type
const objC = "1"
const obj9 = [objC]
obj9.otherProp;

// inferred array type with specified elemenet type
const objB: string = "1"
const obj10 = [objB]
obj10.otherProp
