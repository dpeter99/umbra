#include "SDL2Renderer/SDL2Renderer.h"

SDL2Renderer::SDL2Renderer() {

    SDL_CreateRenderer(nullptr, -1, SDL_RENDERER_ACCELERATED);
}

SDL2Renderer::~SDL2Renderer() {

}

void SDL2Renderer::drawSprite(float x, float y, float width, float height, const SH::Renderer2D::ITexture2D &texture) {

}
