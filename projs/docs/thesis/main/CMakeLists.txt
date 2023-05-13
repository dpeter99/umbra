
project(thesis)

SET(OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR})

SET(LatexMkRC "latexmk.rc")

SET(LatexMkFlags
        -pdf -file-line-error -interaction=nonstopmode -synctex=1 -output-format=pdf
        -output-directory=${OUTPUT_DIRECTORY}
        -aux-directory=${OUTPUT_DIRECTORY}
        -r ${LatexMkRC}
        -lualatex -shell-escape
        )

add_custom_command(
        OUTPUT always_rebuild
        COMMAND cmake -E echo
)

SET(GIT_INFO_GENERATION_SCRIPT ${CMAKE_CURRENT_SOURCE_DIR}/gen_git.ps1)
add_custom_command(
        OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/git_data.tex ${CMAKE_CURRENT_BINARY_DIR}/__git_data.tex
        COMMAND powershell -ExecutionPolicy Bypass -File ${GIT_INFO_GENERATION_SCRIPT}
        ${CMAKE_CURRENT_BINARY_DIR}/git_data.tex
        ${OUTPUT_DIRECTORY}
        ${OUTPUT_DIRECTORY}
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        DEPENDS always_rebuild ${CMAKE_CURRENT_SOURCE_DIR}/gen_git.ps1
)

add_custom_target(
        thesis
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        COMMAND latexmk ${LatexMkFlags} main.tex
        DEPENDS ${CMAKE_CURRENT_BINARY_DIR}/git_data.tex
)