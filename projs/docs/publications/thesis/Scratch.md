In sahdow engien we use a more complex setup that borrows form UE4/5. In this solution we immagine the game world as a tree of nodes.

There are 2 main types of Nodes: Actros and Entites, the difference is that Actors have names, and both can have public
and internal hierarchy. The internal hieracrhy is similar to what UE4/5 offers

The start of the graph is a RootNode that has all the loaded scenes as it's children.

All the popular game engines have a user friendly editor and wildly adopted by studios have a major thing in common: to compile the game code you don't need to compile the editor's code.






# Intro




highly interactive

electronic games that react to user input and give feedback on a visual display.



Looking at games just from a programming standpoint, they can still be immensely complex. For me, this complexity and the need to be flexible and easy to iterate on ideas is fascinating. 



these are not easy tasks as the game has to be enjojable 
All of these have 


Video games are one of the newest and most complicated art forms that exisit today. They are highly interactive,  and requiere many different diciplines to come togethere in order to form something chohsive. 


For me, the idea of creating my own engine came naturally, as I have been learning and experimenting with game development for a long time. I have started using Unity back in 2015 and always had a gaming related hobby project to work on ever since.






I have also been experimenting with writing my own game engine 

These shared codes can differ in how much functionality they provide. In many cases this sahred code is what we can a game engine. 

As vidoe games are such complex pieces of software it is usually infeasable to start empty for each project, but 

The idea for writing my own game enging as this project came naturally for me, as I have been programming games and game engines since I was 16.  Most of my experience is with the Unity game engine

Which can be categorized in many different way. A common categorization is how the game world looks, for example a game can be 2 or 3-dimensional depending on how many axis the player can move along

Because I have learned from previous projects and know that it is not realistic to create a game engine in such a sort of time, I have decided to limit the scope of the project. My goal with this is to create a strong foundation that I can work from in the future. 

# Existing solution research 

There are many existing game engines, and it is important to examine where they succeed and where they fail. Sadly, as I have mentioned there aren't many engines that we can use for free, and there are even fewer engines where we can see the source code as well. In this section I will be presenting a few of the existing engines and what I think their strong points and mistakes are.

## Unity


The Unity Editor is the core interface where all game development takes place. It provides a user-friendly, visual workspace that integrates a myriad of functionalities required for game development. Within the editor, developers can design scenes, create and modify game objects, attach scripts, and inspect and edit properties. The editor's environment is organized with a hierarchy window to display the list of game objects in a scene, an inspector window to modify properties, a project window to manage assets, and a game view to preview and test the game in development. One of the prominent features of the Unity Editor is its asset workflow, which allows developers to import a wide range of assets, including models, textures, sounds, and scripts, and utilize them within their games. Additionally, the editor integrates well with other design and development tools, such as Photoshop and Visual Studio, further enhancing its functionality and flexibility. The Unity Editor is not only a powerful tool for game development but also a platform that offers extended capabilities, including those for simulation, visualization, and machine learning applications.


Unity was one of the first widespread game engine that allowed  

It has built a huge community that allowed many people to get started and create tons of small games. Unity 

Unity provides a fully integrated development environment, every tool that the game maker needs to use are inside the same application. 

In Unity, the game's world - called Scenes - are built from Game Objects, which can represent anything that is necessary for the gameplay. Most commonly these include the player and the environment they are in, but can also be more abstract things like managers for different game systems. The game objects can be attached to each other called "parenting", this causes them to move together with the parent object. This is commonly used to make a camera or a weapon follow the player. These scenes are authored inside the editor using the Scene view, Hierarchy, and Inspector sections. In the scene view, we have a bird's eye view of the environment we are creating, while the Hierarchy and Inspector views provide a more abstract way of editing the scene. The Hierarchy shows a list of all the Game Objects that are present in the scene, as these can have parent-children relations this view forms a tree. 

In unity the game's world is stored in a scenes witch are a specific 

The main view of this application is the scene editor.



Unity fail


## Ue5


Unreal Engine, developed by Epic Games, has a rich and enduring history that has significantly influenced the landscape of modern gaming. The inception of Unreal Engine dates back to 1998, when the first-person shooter game 'Unreal' was released. Since then, it has undergone several mayor transformations, resulting in its latest iteration, Unreal Engine 5. Throughout the years, the engine has consistently pushed the boundaries of what's possible in game development, from pioneering high-fidelity graphics to orchestrating expansive virtual worlds.

Unreal Engine 5, boasts a tremendous leap forward in visual fidelity, my using groundbreaking technologies such as Nanite and Lumen. 
Nanite is a system that essentially eliminates the limitations of polygon count and draw call overheads in 3D environment modelling. It achieves this by using so-called "virtual polygons", allowing for much greater model detail to be used without major performance hit. This system can replace the traditional Level Of Detail (LOD)\footnote{A system where separate models are created for when the given object is further away.} approach, allowing for much faster development time.
Lumen, on the other hand, is a fully dynamic global illumination solution that can immediately react to scene and light changes, producing more lifelike environments. It is important to highlight that while these technologies can produce stunning visuals, they are slower than traditional approaches and not suitable for every game. 

### Actors

In addition to these methods, UE5 also provides a variety of pre-defined Actor classes that can be used as a starting point for creating new Actor types. These include common game objects such as characters, cameras, lights, and physics objects. These pre-defined Actor classes can be extended and customized through Blueprints or C++, allowing developers to quickly create new Actor types with common functionality.

Once a new Actor type has been created, it can be instantiated in the game world by dragging it from the Content Browser into the viewport or by using the "Spawn Actor" function in Blueprints or C++. Each instance of an Actor can be further customized in the Details panel, allowing developers to adjust its properties and components to fit the specific needs of the game world.

The list of these Actors is shown in the Outliner that provides a hierarchical view of all the Actors in the current level.

It allows developers to quickly navigate, select, and modify Actors within a level. The Outliner displays a tree-like structure, where parent Actors can have one or more child Actors. This hierarchical structure can be used to create complex relationships between Actors, which can be crucial for creating intricate gameplay mechanics or detailed environmental setups.

Each Actor in a level is an instance of an Actor class, which defines the Actor's properties and behavior. The Actor class is a part of the Unreal Engine's core framework and serves as the base class for all interactive objects in a game world.

In Unreal Engine 5 (UE5), the core elements that constitute a game world are referred to as Actors. An Actor is essentially an object that can be inserted into the game world. These Actors can embody a wide range of elements, from characters and scenery to intricate gameplay components. This broad definition allows for a high degree of flexibility in game design, as virtually any object or event in the game world can be represented as an Actor\cite{unreal-actors}.

Actors in UE5 are designed to be highly modular, with each Actor being composed of multiple sub-components. These components can be added, removed, or modified to create complex hierarchies and behaviors. For example, a character Actor might consist of a skeletal mesh component for the character's body, a camera component for the player's viewpoint, and various script components to control the character's behavior. This modular approach allows for a high degree of flexibility and reusability in game design.




It allows developers to quickly navigate and manage the Actors and their components within a level. The Outliner displays a tree-like structure, where parent Actors can have multiple child Actors, forming a hierarchy. This hierarchy can be used to create complex relationships between Actors, such as a car Actor with multiple wheel child Actors.




# Planing

My goal for this project is to start creating a game engine that I can work on in the future, and hopefully gather many of my friends to help me as well. 
Given the complexity and scope of this endeavour, it's crucial to start with a solid foundation.
For this regard, I have looked into many of the popular game engines as outlined in \autoref{} and tried to pick the best ideas from each. 
For a successful open source project, it is important to make contributing as easy as possible, while also planning for growth of the project. Keeping this in mind was really important for me while choosing technologies to use, and will be detailing more in \autoref{}



## Modular Design


## Unified Editor

To create a fully unified editor we also needs to keep all the authoring tools inside the editor. This is hard to do at the begining as many assets have really good exisitng tools that do most of what we needs. Because of this I'm not going to focus on recreating industry standard tools inside my engine from the start. 

a separate DLL and load and unload it as the code changes. 



One of the critical learnings from examining popular game engines is the importance of a unified editor. Having an integrated system for all aspects of game development, such as scripting, asset management, level design, and animation, is not merely a convenience—it is a game-changer for productivity. A unified editor facilitates a seamless workflow, with all the necessary tools and features accessible within a single interface. This greatly simplifies the development process, fostering creativity and efficiency. Implementing a unified editor is therefore a central goal for this engine project.

Requiremnets
- modular
- unified editor
- entity system
- reflection

## Entity

Every game engine needs a way to represent the game world in code in some way. In Unity there are the \verb|GameObject|s, in UE they are \verb|Actor|s, while valve's Source engine calls them Entities, but they fulfil a functionally similar role in making a game. As we can see from just these examples, there isn't an industry standard way of naming these building blocks, and their implementation also differs between engines greatly.

While in Unity and Unreal the user adds Components to create functionality, in Source all entities are pre-defined, and new ones can only be added using \Cpp \footnote{There are some Source games that support easier scripting with VScript \cite{valve-vscript}}. But Unity and UE also differ in their approach where Unity only has a flat list of components, UE allows for a whole internal hierarchy of components.


Just as there are many game engines, there are just as many definitions and nomenclature for what to call the pieces that build up the game world. Despite the lack of a standardized terminology, almost every game engine needs a way to describe what makes up the in-game world. Understanding the unique approaches taken by each engine is essential for developing a game engine.
Unity refers to its in-game objects as "GameObjects", Unreal Engine 4/5 uses the term "Actors," and the Source Engine calls them "Entities". These varying terms give us a glimpse to how widely different the approach can be, while, the fundamental concepts behind constructing and controlling the game environments remain similar.

Unity's GameObjects build up everything in the game world. These form a spatial hierarchy that allows us to group and move game objects together, this can be used in cases like a player where it might need to move multiple models together.


The user then can attach components to these game objects, which then define what it is capabilities. For example, the user can attach a Mesh and MeshRenderer to create something that will show up in the world. On top of the built-in components, the user can define their own components in \Csh by extending MonoBehaviour base class.

In Unreal Engine 4/5, Actors serve as the foundation for all interactive elements within a game world. Actors can be attached to each other to form a hierarchical structure, but this is less used, as it also rovides a folder system that enables the organization the gameplay objects, such as characters or environmental assets.


Within each Actor, Components can be added, which determine the object's functionality and behavior. These Components can be organized in a hierarchical fashion, allowing for a more structured setup. Users can also create custom Components using \Cpp or Blueprints, Unreal Engine's visual scripting system, by extending the base Actor Component class. This offers a flexible way to tailor functionality to specific needs while maintaining a well-organized Component hierarchy within each Actor.

Source engine uses a fix set of enitites that are compiled with the engine.

From this I have found that the most important 

conducted comprehensive research on popular game engines, studying their features, strengths, and weaknesses. This exercise has allowed me to identify several core attributes that I believe are fundamental to the design of an effective game engine. These include a well-structured project setup, extensibility, a unified editor, and an entity-component system.


My ambition for this project is not only to kick-start the creation of a game engine but also to foster a robust platform for collaborative development in the future. 
I hope to create a project where I can invite other developers, to join in and contribute their expertise, making this venture a community-driven effort that evolves over time.
Our collective objective would be to design an engine that addresses the diverse needs of developers and is adaptable to a wide range of game projects.



A robust project setup is essential as it streamlines the development process and enhances productivity. Extensibility ensures that our engine remains versatile and can be customized to fit specific needs. A unified editor offers an integrated and efficient environment for all aspects of game development, while an entity-component system fosters flexibility and control over game object behavior.

By integrating these features, I am confident that our engine will be capable of facilitating a diverse range of game development projects. It's my hope that this endeavor will be the springboard for a tool that not only caters to our immediate needs but also evolves with the industry and continues to serve us well into the future.


After conducting extensive research and analysis on existing game engines, several key features have emerged that I consider imperative for my game engine project. It's important to take into account the successes and failures of other engines to build a tool that caters to developers' needs while avoiding common pitfalls.


The game engine will be written in C++ and will use OpenGL for rendering.
The game engine will be cross-platform and will run on Windows, Linux and Mac OS X. 
The game engine will be written in a modular way so that it can be extended easily. 
The game engine will be written in a way that it can be used to create a 2D or 3D game. 
The game engine will be written in a way that it can be used to create a game that is either a first person shooter or a third person shooter. 
The game engine will be written in a way that it can be used to create a game that is either a single player game or a multiplayer game.


The game engine will be written in C++ and will use OpenGL for rendering. The game engine will be cross-platform and will run on Windows, Linux and Mac OS X. The game engine will be written in a modular way so that it can be extended easily. The game engine will be written in a way that it can be used to create a 2D or 3D game. The game engine will be written in a way that it can be used to create a game that is either a first person shooter or a third person shooter. The game engine will be written in a way that it can be used to create a game that is either a single player game or a multiplayer game. The game engine will be written in a way that it can be used to create a game that is either a single player game or a multiplayer game. The game engine will be written in a way that it can be used to create a game that is either a single player game or a multiplayer game. The game engine will be written in a way that it can be used to create a game that is either a single player game or a multiplayer game. The game engine will be written in a way that it can be used to create a game that is either a single player game or a multiplayer game. The game engine will be written in a way that it can be used to create a game that is either a single player game or a multiplayer game. The game engine will be written in a way that it can be used to create a game that is either a single player game or a multiplayer game. The game engine will be written in a way that it can be used to create a game that is either a single player game or a multiplayer game.

# Project Foundation

Chosing the tecnology
c++
vulkan
imgui

there will be many different projects that will 

The organization and management of a codebase is a fundamental aspect of any software development project, and even more so for a task as intricate as game engine development. After considerable deliberation, I have chosen to adopt a monorepo approach for this project. This decision was largely influenced by its potential to simplify project setup and maintain organization across all elements related to the project.

A monorepo, by housing all code and assets in a single, version-controlled repository, offers an uncomplicated and effective means to set up projects. It allows for easy sharing of code, streamlines the management of dependencies, and enhances the overall coordination in large-scale development efforts. These advantages are especially relevant for our collaborative endeavor, which will involve multiple contributors working on diverse aspects of the engine.

Throughout the decision-making process for this project, I paid careful attention to successful strategies used by industry leaders. One such strategy is the utilization of a monorepo for the codebase, a concept that has been widely adopted by tech giants like Google. A monorepo is a version-controlled repository that stores all code and assets for a project in a single location. The adoption of a monorepo can facilitate easier code sharing, simplify dependency management, and streamline large-scale refactoring processes. This approach, while not without its challenges, offers significant potential benefits in terms of scalability and ease of collaboration.

Google's extensive use of a monorepo was particularly influential in my decision. With their vast experience managing large-scale software projects, Google's methods offer invaluable insights. Their use of a monorepo for storing and managing their enormous codebase is a testament to the strategy's effectiveness. Google's monorepo not only facilitates widespread code reuse but also ensures consistency across multiple projects and teams, making it an efficient choice for collaborative efforts. Inspired by this approach, I have decided to employ a monorepo for the game engine project, with the expectation that it will streamline collaboration and foster consistency across the development process.



# Architecture

As I have shown in the \ref{research} chapter almoast all of the new and poppular engines have a unified editor for authoring the game. These offer a streamlined and integrated development experience that improves efficiency and productivity.  It removes the need to switch between different tools for different types of editing, which can be time-consuming and disrupt the workflow. Having all the tools - from asset management, animation, visual effect creation, to level design - within the same editor ensures consistency and allows for seamless interaction between these tools. Furthermore, it reduces the learning curve as developers only need to familiarize themselves with one integrated system rather than multiple separate programs.




kind of setups the user only needs to interact with a single interface, witch helps make it easier to learn.


This means that game creators don't  want and need to recompile the engine's source code to develop their own game.



A single unified game engine editor, like those provided by Unity, Unreal, or Godot, offers a streamlined and integrated development experience that improves efficiency and productivity. It removes the need to switch between different tools for various aspects of game development, which can be time-consuming and disrupt the workflow. Having all the tools - from scripting, asset management, animation, to level design - within the same editor ensures consistency and allows for seamless interaction between different elements of the game. Furthermore, it reduces the learning curve as developers only need to familiarize themselves with one integrated system rather than multiple separate programs. This approach results in a smoother, more intuitive development process, which can lead to better quality games and faster production times.

These engines, while allowing for, usually don't need a game specific editor, meaning that the same executable can be used for many different games. This, for example, is not true for Source engine, where each game has its own version of the engine with its own set of tools compiled for that game. This can make the development process extremely hard, as compiling and distributing a game engine is not a trivial task. For example, a Full compilation of Unreal Engine 5 can take up to 160 GB of disk space and more than an hour. Because of this, it is a requirement now days to be able to use the same unified editor for every project.

Another important aspect of these editors is that they don't 


Nowadays, game makers think of game engines as a single application they download and use to create the game they want. This means that they don't want and need to recompile the engine's source code to develop their own game. This leads to fast iteration times and easier workflows. This means you only need to install the Unity or Unreal editors once, and you can make multiple games without compiling them from source. Of course, if it is necessary most engines do give the ability to modify their source code and create studio/game specific versions of them.




To achieve this, the Game specific code needs to be loaded at runtime, from it's compiled form. In our case, this means that we need to load the DLL containing the game specific code. This is easily possible on every platform using the dylib \cite{dylib} library, that makes calling the platform specific functions easier. It provides a single function that wraps each platform's corresponding call, and gives back a pointer that represents the platform specific result.



