#pragma once

#include <SDL_events.h>

#include "SHObject.h"
#include "event_bus.h"

namespace SH::Events {

    class SDLEvent : public Event {
      SHObject_Base(SDLEvent)
      public:
        SDLEvent(SDL_Event e) : event(e) {};

        SDL_Event event;
    };

    class OverlayRender : public Event {
      SHObject_Base(OverlayRender)
    };

    class PreRender : public Event {
      SHObject_Base(PreRender)
    };

    class Recreate : public Event {
      SHObject_Base(Recreate)
    };
}