
set(PLANTUML_JARFILE ${PROJECT_SOURCE_DIR}/../../tools/plantuml.jar)

#
# Create top-level target that renders a PlantUML diagram to a PNG image.
#
function(add_diagram target source type)

    # Program used to render the diagram.
    set(plantuml java -jar ${PLANTUML_JARFILE})

    set(commands)
    set(output)
    foreach(header ${source})
        # Diagram source file basename used to create output file name.
        get_filename_component(fileName ${source} NAME_WE)

        list(APPEND commands COMMAND ${plantuml} -o ${CMAKE_CURRENT_BINARY_DIR} -t${type} ${header})
        list(APPEND output ${fileName}.${type})
    endforeach()

    # Render the diagram and write an "${output}.png"
    # file in the current binary folder.
    add_custom_command(
            OUTPUT
            ${CMAKE_CURRENT_BINARY_DIR}/${output}.png
            ${commands}
            MAIN_DEPENDENCY ${source}
            COMMENT "Rendering diagram '${output}'."
    )

    # Top-level target to build the output file.
    add_custom_target(${target}
            DEPENDS ${CMAKE_CURRENT_BINARY_DIR}/${output}.png)

endfunction()



add_custom_target(
        thesis-uml
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        ${commands}
)