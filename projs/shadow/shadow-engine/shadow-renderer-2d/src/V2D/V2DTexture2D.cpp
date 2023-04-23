#include "V2D/V2DTexture2D.h"

namespace SH::Renderer::V2D {

    void *V2DTexture2D::getHandle() const {
        return texture->img->set;
    }

    int V2DTexture2D::getHeight() const {
        return vk2dTextureHeight(texture);
    }

    int V2DTexture2D::getWidth() const {
        return vk2dTextureWidth(texture);
    }

    VK2DTexture V2DTexture2D::GetTexture() const {
        return texture;
    }

}