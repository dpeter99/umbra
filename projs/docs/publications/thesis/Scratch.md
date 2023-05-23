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






# Project Foundation

Chosing the tecnology
c++
vulkan
imgui

there will be many different projects that will 



