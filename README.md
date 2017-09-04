# typescript-improved-error-messages

How can TypeScript error messages be improved to better track down type errors

```typescript
const a: { prop: boolean } = { prop: true }
a.otherProp;
// actual: Property 'otherProp' does not exist on type '{ prop: boolean; }'.
// expected more: Property 'otherProp' does not exist on specified type '{ prop: boolean; }'.
// expected even more: 
//  Property 'otherProp' does not exist on specified type '{ prop: boolean; }'.
//  Type is specified at <line>:<col>.

const obj = { prop: true }
obj.otherProp;
// actual: Property 'otherProp' does not exist on type '{ prop: boolean; }'.
// expected more: Property 'otherProp' does not exist on inferred type '{ prop: boolean; }'.
// expected more: 
//   Property 'otherProp' does not exist on inferred type '{ prop: boolean; }'.
//   Type inferred from variable declaration at <line>:<col>

const b = { prop: { prop: true } }
const c = b.prop;
c.otherProp;
// actual: Property 'otherProp' does not exist on type '{ prop: boolean; }'.
// expected more: Property 'otherProp' does not exist on inferred type '{ prop: boolean; }'.
// expected more: 
//   Property 'otherProp' does not exist on inferred type '{ prop: boolean; }'.
//   Type inferred from variable declaration at <file>:<line 20>:<col>
//   Type inferred from variable declaration at <file>:<line 19>:<col>
```

See [`observations.md`](./observations.md).

It seems possible to compute whether or not a type is inferred for a given TypeObject, and the TypeChecker object would be a good place to implement this logic. However it is not obvious where this method should be used to create the new error messages. Those error messages, even just the property access ones, are generated in several places in the compiler code.
