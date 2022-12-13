import * as Arch from "https://raw.githubusercontent.com/dpeter99/archivist/doxygen-support/src/index.ts";
import * as path from "https://deno.land/std@0.167.0/path/mod.ts";
import {Content} from "https://raw.githubusercontent.com/dpeter99/archivist/doxygen-support/src/index.ts";

export class TSXHelper extends Arch.ArticleHelper{
    public getPipeline(){ return this["module"].pipeline; }

    /**
     * Returns true if the given file is under the current file in the folder structure
     * @param f
     */
    public static subArticle(p:string, f:Content): boolean{
        let common = path.common([p,path.dirname(f.path)])
        common = common.replace(/[\/\\]$/, "")

        //console.log(`${this.subArticle.name}: p: "${p}" \t f:"${f.path}" \t common: "${common}" res: ${common == p}`);

        return common == p; // && f.path != this.file;
    }

}