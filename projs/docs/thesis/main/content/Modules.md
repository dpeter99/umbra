# Modules and game loading

Nowdays game makers think of game engines as a sinlge application they download and use to create the game they want. This means that they don't want and need to recompile the engine's source code to develop their own game. This leads to fast iteration times and easier workflows. This means you only need to install the Unity or Unreal editors once, and you can make multiple games without compiling them from source. Ofcourse if it is necessery mmost engines do give the ability to modify their source code and crate studio/game specific versions of them.

To acheave this the Game specific code needs to be loaded at runtime, from it's compiled form. In our case this means that we need to load the DLL containing the game specific code. This is easily possible on every platform using the library dylib \cyte{dylib} that makes calling the platform specific functions easier. It provides a single function that wraps each platform's corresponding call, and gives back a wrapper pointer that represents the platform specific result. 

```
dylib lib("foo");

auto adder = lib.get_function<double(double, double)>("adder");

double result = adder(6, 6);
```

From here we can than request functions based on their names. This can only find functions that were marked exported when the DLL was compiled.


## Modules
To make sure the engine is easy to extend and can be used for any game, it is important to have a mechanism to add new core components to it. This for example would allow us to have a VR module that we can load in only when we are developing a VR game and not have to keep such a large component in games where it is never going to be used.

To acheave this we need a way to not include certain parts of the code in the compilation. The simples way to do this would be to create multiple cmake configs that leave out the not needed files files, or use the preprocessor to disable the code in those sections. The problem with these is that they are hard to maintin, and requiere the creation of game specific compilations witch goes agains what we set out to do in \ref{game-loading}

The second solution is to put the potentially not needed code into DLLs and load them at runtime if there is a need. To allow for this i have created a Module system for Shadow engine.

## The App startup
The core of the engine is contained in the shadow-engine project, which gets compiled into a DLL. 
That library can be loaded in by either the shdow-runtime, or shadow-editor executables debending on if you are playing or making a game. Both of these have a similar simple main function \ref{}

```
\input main.cpp
```

The ``ShadowEngine::ShadowApplication`` is the core of the engine, provided by the shdow-engine DLL. This class creates the ModuleManager witch is responsible for loading in the modules that make up the engine. Every module needs to extend the base ``Module`` class. Each module needs to be registered to the Module manager using a descriptor.

```
m.AddDescriptors({
	 .id="module:/renderer/vulkan",
	 .name = "Vulkan",
	 .class_name = "VulkanModule",
	 .assembly="assembly:/core",
	 .dependencies={"module:/platform/sdl2"},
 });
```

This object dscribes everything that is neede to create the module, and what other modules it needs to function correctly. The ``id`` field is a string identifier for the module that is compatible with the planned resource system. (More in \ref{addendum:resources}), and the ``assembly`` field is a similar ID it defines in witch DLL the manager needs to search for this class. The ``dependencies`` list is a list of string IDs of the modules that need to be loaded before this module.

Based on the dependencies described in the descriptors the Module meanger usese a Depth first search to try and create a topological sort. To ensure the dependencies are cycle free is the job of the user at this point. When this order is found the module manger tries to create each of the modules. This is done by searching for a special function in the assembly the module is in. This function needs to follow these rules:
- Must be marked with ``extern "C"``
- ``<class name>_entry()`` where the ``<class name>`` section is the same as the classes name wihtout the namespace section.  These special functions
- Needs to give back a ``std::shared_ptr`` to a freshly created instance of the module.
To help create these functions I have made ``MODULE_ENTRY`` whitch is a preprocessor macro that creates them form based on the class name.
After every module was successfully instantiated the module manger calls preinit and init on the modules. Between these steps the DFS sorting is re-run to ensure every module still has the neceserry modules to contunue loading. For example a VR module might exit in pre-init if it finds no VR headset to work with.

After this initialization sequence is done the runntime calls the Start method on the shadow application witch starts the main update loop.

## The update loop

