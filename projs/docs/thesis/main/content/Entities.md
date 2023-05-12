Just as there are many game engines, there are just as many definitions and nomenclature for what to call the pieces that build up the game world. Despite the lack of a standardized terminology, almost every game engine needs a way to describe what makes up the in-game world. Understanding the unique approaches taken by each engine is essential for developing a game engine.
Unity refers to its in-game objects as "GameObjects", Unreal Engine 4/5 uses the term "Actors," and the Source Engine calls them "Entities". These varying terms give us a glimpse to how widely different the approach can be, while, the fundamental concepts behind constructing and controlling the game environments remain similar.

Unity's GameObjects build up everything in the game world. These form a spatial hierarchy that allows us to group and move game objects together, this can be used in cases like a player where it might need to move multiple models together.

<Image>

The user then can attach components to these game objects, which then define what it is capabilities. For example, the user can attach a Mesh and MeshRenderer to create something that will show up in the world. On top of the built-in components, the user can define their own components in c# by extending MonoBehaviour base class.

In Unreal Engine 4/5, Actors serve as the foundation for all interactive elements within a game world. Actors can be attached to each other to form a hierarchical structure, but this is less used, as it also rovides a folder system that enables the organization the gameplay objects, such as characters or environmental assets.

<Image>

Within each Actor, Components can be added, which determine the object's functionality and behavior. These Components can be organized in a hierarchical fashion, allowing for a more structured setup. Users can also create custom Components using C++ or Blueprints, Unreal Engine's visual scripting system, by extending the base Actor Component class. This offers a  flexible way to tailor functionality to specific needs while maintaining a well-organized Component hierarchy within each Actor.

Source engine uses a fix set of enitites that are compiled with the engine.

## Shadow Engine and entities

In sahdow engien we use a more complex setup that borrows form UE4/5. In this solution we immagine the game world as a tree of nodes. Nodes are the atomic building blocks of the entity system, with each node encapsulating a specific functionality or characteristic. The game engine defines several specialized node types, each extending the `NodeBase` class.

### Node Base

The NodeBase class serves as the foundation for all elements in the graph. Each NodeBase instance carries a globally unique ID (runtime_uid) and a runtime index (runtime_index). The runtime_uid is unique for each instance and can be used for entity lookup, though this is not recommended due to performance considerations. The runtime_index provides a faster alternative for accessing entities. However, it is not unique, meaning that when an entity is released, its index can be re-assigned to a different entity.

### Specialized Node Types

The ShadowEngine entity system provides various specialized node classes, including LeafNode, Component, Node, Actor, Entity, Scene, RootNode, and World. Each class serves a unique role in the entity system. In this section, we will delve into the details of these specialized node types.

#### LeafNode and Component

`LeafNode` serves as the base class for nodes that do not contain any other nodes, but rather, act as the terminal nodes in the scene graph. Specifically, `Component` is a type of `LeafNode` that provides functionality to an entity. These can be thought of like the components of Unity where they form a flat list under the Node they are attached to. Components, as their name implies, are modular pieces that can be attached to entities to store data about them.

#### Node

The `Node` class extends `NodeBase` and represents a complex node that can have children nodes. It has two vectors, `hierarchy` and `internal_hierarchy`, representing the children and internal children nodes respectively. These are new names for the two concets already present in UE5 and Unity. Internal hiererarchy is the list of internal building blocks similar to UE5's component hierarchy with the differece being that any type of Node can be added to it making it more flexible.  The Hierarchy list is the Unity like public hierarchy.

Nodes provide the ability to build complex entities in the game world by combining various components and other nodes. This freedom to create any structure, makes the engine less opinionated but also can lead to confusion. To mitigate this in the furute stronger suggested layouts should be developed and given as default for the developers.

#### Actor

`Actor` is a specialized `Node` that possesses a name and a `Build` method. This abstract class is designed to be the
base for game-world objects that have specific functionality and may interact with other objects in the scene.
The `Build` method is defined as a pure virtual function, enforcing that every subclass of `Actor` must provide its own implementation of how it is constructed.

#### Entity and Scene

`Entity` and `Scene` are two more specialized node types. An `Entity` is a specialized `Node` and can be thought of as an object within the game world.

On the other hand, `Scene` is an `Actor` that maintains a `static_hierarchy` of nodes. A `Scene` essentially represents a level or a stage in a game, and it is responsible for managing and organizing the entities within that level.
Each `Scene` also possesses a name, which aids in scene identification and management.



### Node Manager

The NodeManager is responsible for the allocation and memory management of the nodes. It does not concern itself with the graph structure of the nodes. This is because the graph hierarchy is only a logical hierarchy.
The NodeManager maintains a map of entity containers, each associated with a specific entity type. It also manages a
lookup table for quick access to active entities.