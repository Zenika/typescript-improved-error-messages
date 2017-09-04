# Détecter un type spécifié

La détection se fait au niveau de la méthode `checkPropertyAccessExpressionOrQualifiedName` du fichier `src/compile/checker.ts`.

Dans la suite, nous utilisons la variable `type` déclarée au début de cette fonction.

## Pour les Litéraux Primitifs
 
 Il possède un des flag suivant :
 
 	StringLiteral   = 1 << 5
   	NumberLiteral   = 1 << 6
   	BooleanLiteral  = 1 << 7
   	
 Mais ne possède pas le flag 
 
 	FreshLiteral    = 1 << 20
 	
## Pour les Objets Litéraux

  Dans les deux cas, ils ont le flag Object.
  	
  	Object          = 1 << 15

  Il possède la propriété `symbol` et `symbol.declarations[0].kind` est égale à `TypeLiteral` (il vaut `ObjectLiteralExpression` dans le cas d'une inférence).
  
  	//spécifié
  	ts.SyntaxKind[type.symbol.declarations[0].kind] === "TypeLiteral" // kind == 163
  	
  	//inféré
  	ts.SyntaxKind[type.symbol.declarations[0].kind] === "ObjectLiteralExpression" // kind === 178
  	
## Pour les Unions et Intersections
 
  Il possède le flag :
 	
 	Union                   = 1 << 16
 	Intersection            = 1 << 17
 	
  Il possède alors la propriété `types` qui contient tous les types de l'union. Il suffit alors qu'un de ces types soit inféré pour que l'union le soit également.