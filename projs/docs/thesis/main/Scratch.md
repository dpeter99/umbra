In sahdow engien we use a more complex setup that borrows form UE4/5. In this solution we immagine the game world as a tree of nodes.

There are 2 main types of Nodes: Actros and Entites, the difference is that Actors have names, and both can have public
and internal hierarchy. The internal hieracrhy is similar to what UE4/5 offers

The start of the graph is a RootNode that has all the loaded scenes as it's children.

All the popular game engines have a user friendly editor and wildly adopted by studios have a major thing in common: to compile the game code you don't need to compile the editor's code.


