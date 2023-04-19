#pragma once

#include <map>
#include <string>
#include <memory>

#include "IRenderer.h"

namespace SH::Renderer {

    class RenderOrchestrator {

        std::map<std::string, std::weak_ptr<IRenderer>> renderers;

        std::weak_ptr<IRenderer> mainRenderer;

      public:
        void addRenderer(std::string name, std::weak_ptr<IRenderer> renderer);

        void setMainRenderer(std::string name);

        std::weak_ptr<IRenderer> getMainRenderer() { return mainRenderer; }

    };
}
