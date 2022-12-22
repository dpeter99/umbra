import * as Arch from "dpeter99/archivist/src/index.ts";
import * as ArchExp from "dpeter99/archivist/src/Modules/experimental/mod.ts";
import {root} from "template/root.tsx";


import {branch_current, tag_current} from "template/libs/git-helpers/index.ts";


let docs_path = await tag_current({});
if(!docs_path)
    docs_path = (await branch_current({}))?.replace("/","--")

const outputURL = (Deno.env.get("ARCHIVIST_URL")?? "")

const rootURL = (Deno.env.get("ARCHIVIST_URL")?? "");

class AddVersionFiles extends Arch.SimpleModule{
    private docs_root: string;
    private title: string;

    constructor(docs_root:string, title: string) {
        super();
        this.docs_root = docs_root;
        this.title = title;
    }

    async process(docs: Arch.Content[]): Promise<any> {
        let content = new Arch.Content(this.pipeline.ContentRoot+ this.docs_root+"index.md","");
        content.metadata.addData("title", this.title)
        docs.push(content);
    }

}

export let config: Arch.Config = {
    env:"development",
    detailedOutput: false,
    template: "./_template",
    outputPath: "./out/",
    outputURL,
    rootURL,
    preProcessors: [
        Arch.Pipeline.fromModules({name:"build_template"},
            new Arch.WebpackModule("./_template"),
            new Arch.CopyFiles("./_template/dist/", "./out/"),
        ),
    ],
    pipelines:[
        Arch.Pipeline.fromModules({name:"posts", contentRoot:"./src/"},
            new Arch.FileReaderModule("./**/*.md"),
            new Arch.DoxygenReader("/doxygen-out/xml/**/*", "Projects/shadow-engine/docs/" + docs_path + "/"),
            new AddVersionFiles("Projects/shadow-engine/docs/" + docs_path + "/", docs_path ?? ""),
            new Arch.ExtractMetadata(
                new Arch.FrontMatterMetadata()
            ),
            new Arch.WebUrlOutputResolver(),
            new Arch.UnifiedRenderer(),

            new ArchExp.Experimental_TSXTemplater(root),
            new Arch.OutputModule()
        )
    ]
}

Arch.run(config);
