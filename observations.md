# Détecter un type spécifié

La détection se fait au niveau de la méthode `checkPropertyAccessExpressionOrQualifiedName` du fichier `src/compile/checker.ts`.

Dans la suite, nous utilisons la variable `type` déclarée au début de cette fonction.

## Possible meilleur solution

  Une solution qui fonctione pour les npm qualifier comme `obj.prop`
	
	`type.checker.getSymbolAtLocation(left).declarations[0].type !== undefined // => Type spécifié`
 
  C'est la seule solution trouvée pour les tableaux.
  
  Ne fonctionne pas avec les expressions tel que `(obj).prop` ou `(1 + 2).prop` ou `f().prop`. Il faudrait surrement dessendre dans l'AST pour déterminer si oui ou non un type est spécifié.

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
  
  
# Possibilité d'implémentation

  L'idée serais d'ajouter une méthode à l'interface `Type` (implémentation `TypeObject`). L'implémentation de la méthode serais délégué au `TypeChecker` (propriété `checker` de `TypeObject`). Cette méthode s'appelerais `isInferred(): boolean` pour l'interface `Type` et `isInferred(type: Type): boolean` pour `TypeChecker`.
  
  Il serais ensuite possible d'utiliser cette fonction pour customiser les messages d'erreur partout où une propriété peut être non trouvée. Pour cela, nous modifirions la fonction `reportNonecistentProperty` et l'utiliserions là où elle devrais l'être normalement.
  
  