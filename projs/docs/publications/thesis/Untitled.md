\subsection{Actors and the Outliner}

In Unreal Engine 5, the fundamental building blocks of a game world are referred to as Actors. An Actor is essentially any object that can be placed into a level, and they can represent characters, props, scenery, and even complex gameplay elements. Each Actor in a level is an instance of an Actor class, which defines the Actor's properties and behavior. The Actor class is a part of the Unreal Engine's core framework and serves as the base class for all interactive objects in a game world.

The Outliner is a powerful tool within Unreal Engine 5 that provides a hierarchical view of all the Actors in the current level. It allows developers to quickly navigate, select, and modify Actors within a level. The Outliner displays a tree-like structure, where parent Actors can have one or more child Actors. This hierarchical structure can be used to create complex relationships between Actors, which can be crucial for creating intricate gameplay mechanics or detailed environmental setups.

\begin{figure}[h]
\centering
\includegraphics[width=0.75\textwidth]{outliner.png}
\caption{The Outliner in Unreal Engine 5}
\label{fig:outliner}
\end{figure}

\subsection{Actor Components and Hierarchies}

Actors in Unreal Engine 5 are composed of one or more components. These components define the behavior and functionality of an Actor. For instance, a character Actor might include components for movement, animation, and AI behavior. Components can also be used to add visual elements to an Actor, such as meshes, particle systems, and lights.

Components can be arranged in a hierarchical structure within an Actor, allowing for complex and flexible designs. This hierarchy is reflected in the Outliner, where child components are nested under their parent component. This structure allows developers to create intricate relationships between components, which can be used to create complex gameplay mechanics or detailed environmental setups.

\begin{figure}[h]
\centering
\includegraphics[width=0.75\textwidth]{actor_components.png}
\caption{Actor Components in Unreal Engine 5}
\label{fig:actor_components}
\end{figure}

In conclusion, Unreal Engine 5 provides a robust and flexible framework for building complex game worlds. Its Actor and component system, combined with the hierarchical structure provided by the Outliner, allows developers to create intricate relationships and behaviors within their game worlds. However, it is important to note that while these tools can be powerful, they also require a deep understanding of the engine's architecture and a thoughtful approach to game design.