
set(PLANTUML_JARFILE ${PROJECT_SOURCE_DIR}/../../tools/plantuml.jar)

#
# Create top-level target that renders a PlantUML diagrams to a target image format.
#
function(add_diagram target source type)

    # Program used to render the diagram.
    set(plantuml java -jar ${PLANTUML_JARFILE})

    set(commands)
    set(output)
    foreach (header ${source})
        # Diagram source file basename used to create output file name.
        get_filename_component(fileName ${source} NAME_WE)

        cmake_path(GET source PARENT_PATH srcDir)
        cmake_path(RELATIVE_PATH srcDir OUTPUT_VARIABLE relDir)

        list(APPEND commands COMMAND ${plantuml} -o ${CMAKE_CURRENT_BINARY_DIR}/${relDir} -t${type} ${header})
        list(APPEND output ${CMAKE_CURRENT_BINARY_DIR}/${relDir}/${fileName}.${type})
    endforeach ()

    # Render the diagram and write an "${output}.png"
    # file in the current binary folder.
    add_custom_command(
            OUTPUT ${output}
            ${commands}
            MAIN_DEPENDENCY ${source}
            COMMENT "Rendering diagram '${output}'."
    )

    # Top-level target to build the output files.
    add_custom_target(${target}
            DEPENDS ${output})

endfunction()


add_custom_target(
        thesis-uml
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        ${commands}
)