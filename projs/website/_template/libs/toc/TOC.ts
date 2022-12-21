import {Content} from "../../common.ts";



export type TocItem = {
    name: string,
    content: Content|undefined,
    children: TocItem[],
}

function treeify(files: Content[]) {

    let result: TocItem = {name:"root", children:[], content: undefined};

    files.forEach(content =>{

        const url: string = content.meta.url

        let path_segments = url.replaceAll('\\', '/').split('/').filter(s=>s !== "");

        path_segments.reduce((acc, name, i, a) => {
            let next = acc.children.find(n=>n.name === name);
            if(!next) {
                //r[name] = { result: [] };
                next = {name, children: [], content: undefined};

                if(i == a.length-1){
                    next.content = content;
                }

                acc.children.push(next)
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

export function tocForContent(toc: TocItem, content:Content){

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
}