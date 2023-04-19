#include "rendering/RenderOrchestrator.h"

namespace SH::Renderer {

    void RenderOrchestrator::addRenderer(std::string name, std::weak_ptr<IRenderer> renderer) {
        renderers[name] = renderer;
    }

    void RenderOrchestrator::setMainRenderer(std::string name) {
        mainRenderer = renderers[name];
    }

}