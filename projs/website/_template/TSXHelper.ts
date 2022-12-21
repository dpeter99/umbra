import * as Arch from "dpeter99/archivist/src/index.ts";
import {Content} from "dpeter99/archivist/src/index.ts";

export class TSXHelper extends Arch.ArticleHelper{
    public getPipeline(){ return this["module"].pipeline; }

    /**
     * Returns true if the given file is under the current file in the folder structure
     * @param f
     */
    public static subArticle(p:string, f:Content): boolean{
        const fPath = f.meta.url.replaceAll("\\", "/");

        return fPath.startsWith(p+"/");
    }

}