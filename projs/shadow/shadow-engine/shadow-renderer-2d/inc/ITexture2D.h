#pragma once

namespace SH::Renderer2D {

    /***
    * Interface for textures used in 2d drawing
    */
    class ITexture2D {
      public:
        virtual ~ITexture2D() = default;

        /***
        * Gets the texture width
        * @return Width
        */
        virtual int getWidth() const = 0;

        /***
        * Gets the texture height
        * @return Height
        */
        virtual int getHeight() const = 0;
    };
}