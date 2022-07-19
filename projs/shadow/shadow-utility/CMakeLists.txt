set(CMAKE_CXX_STANDARD 20)

FILE(GLOB_RECURSE SOURCES src/*.cpp src/*.h)

add_executable(shadow-utils ${SOURCES})
