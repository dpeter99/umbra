import {Content} from "../../common.ts";
import {el} from "https://esm.sh/v99/entities@3.0.1/deno/lib/maps/entities.json.js";



export type TocItem = {
    name: string,
    content: Content|undefined,
    children: TocItem[],
    path: string,
}

function treeify(files: Content[]) {

    let result: TocItem = {name:"root", children:[], content: undefined, path:""};

    files.forEach(content =>{

        const url: string = content.meta.url

        let path_segments = url.replaceAll('\\', '/').split('/').filter(s=>s !== "");

        path_segments.reduce((acc, name, i, a) => {
            let next = acc.children.find(n=>n.name === name);
            if(!next) {
                //r[name] = { result: [] };
                let path = acc.path+"/"+name;
                next = {name, children: [], content: undefined, path};



                acc.children.push(next)
            }
            if(i == a.length-1){
                next.content = content;
            }

            return next;
        }, result)
    })

    return result;
}

export function tocSort(ascending:boolean) {
    return function (a:TocItem, b:TocItem) {
        // equal items sort equally
        if (a.content === b.content) {
            return 0;
        }

        // nulls sort after anything else
        if (a.content == undefined) {
            return ascending ? 1 : -1;
        }
        if (b.content == undefined) {
            return ascending ? -1 : 1;
        }

        // otherwise, if we're ascending, lowest sorts first
        if (ascending) {
            return a.name < b.name ? -1 : 1;
        }

        // if descending, highest sorts first
        return a.name < b.name ? 1 : -1;
    };
}

export function makeToc(files: Content[]) {
    return treeify(files);
}

export function subToc(toc: TocItem, path: string) {
    const segments = path.split("/").filter(s=>s!=="");

    let node: TocItem | undefined = toc;

    for (const segmentsKey in segments) {
        node = node?.children.find(c=>c.name === segments[segmentsKey]);
    }

    return node;
}

export function tocLevel(toc: TocItem, path: string) {
    const segments = path.split("/").filter(s=>s!=="");

    let node: TocItem | undefined = toc;

    let i = -1;
    for (const segmentsKey in segments) {
        i++;
        node = node?.children.find(c=>c.name === segments[segmentsKey]);
        if(!node)
            break;
    }

    return i;
}

export class TocManager {
    static tocRoot: TocItem | undefined;

    static refreshToc(files: Content[]){
        this.tocRoot = makeToc(files);
    }

    static getTocForPath(path: string){
        if(!this.tocRoot){
            throw new Error("No toc was generated");
        }

        return subToc(this.tocRoot!, path);
    }

    static getTocPathForPath(path: string){
        if(!this.tocRoot){
            throw new Error("No toc was generated");
        }

        const segments = path.split("/").filter(s=>s!=="");

        let next: TocItem | undefined = this.tocRoot;

        let tocPath: TocItem[] = [this.tocRoot];

        for (const segmentsKey in segments) {
            next = next?.children.find(c=>c.name === segments[segmentsKey]);
            if(!next)
                break;

            tocPath.push(next);
        }

        return tocPath;
    }

    static getTocForFile(file: Content){
        if(!this.tocRoot){
            throw new Error("No toc was generated");
        }

        return subToc(this.tocRoot!, file.meta.url);
    }

    static getTocLevelForFile(file: Content){
        if(!this.tocRoot){
            throw new Error("No toc was generated");
        }

        return tocLevel(this.tocRoot!, file.meta.url);
    }

    static printToc() {
        if(!this.tocRoot){
            throw new Error("No toc was generated");
        }

        this.printTocElement(this.tocRoot!,0);
    }

    static printTocElement(elem: TocItem, level: number){
        const prefix = '|'.repeat(level)
        console.log(`${prefix}-${elem.name} (${elem.content?.name ?? ""})`);
        level++;
        for (const child of elem.children) {
            this.printTocElement(child, level);
        }

    }
}