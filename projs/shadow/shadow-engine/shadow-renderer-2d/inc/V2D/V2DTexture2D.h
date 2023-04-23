#pragma once

#include "VK2D/VK2D.h"
#include "VK2D/Opaque.h"

#include "rendering/2D/ITexture2D.h"

namespace SH::Renderer::V2D {

    class V2DTexture2D : public SH::Renderer::R2D::ITexture2D {

        VK2DTexture texture;
      public:
        V2DTexture2D(int width, int height) : texture(vk2dTextureCreate(width, height)) {

        }

        ~V2DTexture2D() override {
            vk2dTextureFree(texture);
        }

        int getWidth() const override;

        int getHeight() const override;

        void *getHandle() const override;

        VK2DTexture GetTexture() const;

    };

}