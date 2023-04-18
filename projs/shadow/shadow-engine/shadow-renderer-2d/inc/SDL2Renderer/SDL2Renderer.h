#pragma once

#include <SDL.h>

#include "IRenderer2D.h"

class SDL2Renderer : SH::Renderer2D::IRenderer2D {

  public:
    SDL2Renderer();

    ~SDL2Renderer() override;

    void setCameraPosition(float x, float y) override {};

    void setCameraZoom(float zoom) override {};

    void drawSprite(float x,
                    float y,
                    float width,
                    float height,
                    const SH::Renderer2D::ITexture2D &texture) override;
};
