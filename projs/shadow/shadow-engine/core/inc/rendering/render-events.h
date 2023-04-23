#pragma once

#include "event-bus/events.h"

namespace SH::Renderer {

    class LateRender : public SH::Events::Event {
      SHObject_Base(LateRender)
    };

}