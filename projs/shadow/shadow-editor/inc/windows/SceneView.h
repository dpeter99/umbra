#pragma once

#include <memory>
#include "../EditorWindow.h"
#include "rendering/IRenderer.h"

namespace ShadowEngine::Editor {

    class SceneView : public EditorWindow {
      SHObject_Base(SceneView)

        std::weak_ptr<SH::Renderer::IRenderer> renderer;

      public:
        SceneView();

        void Draw() override;
    };

}