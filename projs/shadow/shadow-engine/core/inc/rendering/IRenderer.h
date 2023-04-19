#pragma once

#include "2D/ITexture2D.h"

namespace SH::Renderer {

    enum RendererCapabilities {
        RENDERER_2D = 1 << 0,
        RENDERER_3D = 1 << 1,
        RENDERER_2D_3D = RENDERER_2D | RENDERER_3D
    };

    class IRenderer {
      public:
        /***
         * Gets the renderer capabilities
         * @return Capabilities
         */
        virtual RendererCapabilities getCapabilities() const = 0;

        /***
         * @brief Returns the active render target
         */
        virtual R2D::ITexture2D *getRenderTarget() const = 0;

        virtual void BeginRenderPass() = 0;
    };
}

