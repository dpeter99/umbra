# Project Setup



# Reflection

\section{Why we need reflection}\label{sec:why-we-need-reflection}

In a game engine, reflection is used for (among other things) serializing the level data.
For this, we need to know what data fields an object has and which of those need to be written to the level file.
On top of this, we also need to display all the fields in the editor, so the designer can change those with ease.







I have found multiple online tutorials on how to create compiler plugins for clang.
Clang is a compiler frontend for the famous LLVM compiler framework, and is one of the 3 most used C/\Cpp compilers.
While these tutorials showed great results and allowed full integration into the compilation process, they almost all required compiling clang from scratch.

I have tried following some of these tutorials, but I have run into many issues that would have need way more time to solve than I had available.
Most of my problems boiled down to one thing, there is no distribution of clang for Windows that supports loading and developing plugins.
Because of this I would need to compile clang myself and this is not an easy task and can differ based on the system being used.

After realising that getting clang plugins working is a way bigger task than I should work on, I have decided to write a simple parser in \Csh.
I have chosen \Csh because I'm familiar with it and has better string manipulation methods than cpp.







# Entites

As I have mentioned in the planning chapter (\ref{chap:planning}) it is a really important requirement for my project to have  an entity system.  

To better understand the 


Each game engine employs its own unique approach to implement this world representation efficiently.

As I have described in the planning chapter (\ref{chap:planning}) it is really important to have a way to describe what exists in the game's world. 

Every engine has its own way of implementing this world representation. 

When creating such a system speed optimization is the most important, it is not impossible to have hundreds or even millions of objects in a scene. The solution needs to be able to create, update, delete these at a large scale, while fitting inside the time allowed for a single frame. 

To create such a performance focused code, we need to think about utilizing the memory and the cache of the CPU to the fullest. For this, I will need to make sure the data is stored in a way where as much of it can fit into the cache as possible.

I have looked into multiple exisitng solutions to see how these are ususally implemented, and found many useful articles. I will be highliting some of them here but this is not an exastive list:
- Ennt
- Flecs
	- Flecs publications
- Unity ECS packages
- 