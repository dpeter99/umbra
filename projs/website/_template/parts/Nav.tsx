import {ArticleHelper, Content, React, Component, window} from "../common.ts";
import {TSXHelper} from "../TSXHelper.ts";
import {archivistInst} from "dpeter99/archivist/src/Archivist.ts";
import {makeToc, subToc, TocItem, TocManager, tocSort} from "../libs/toc/TOC.ts";
import {topbot} from "https://esm.sh/v99/entities@3.0.1/deno/lib/maps/entities.json.js";

export class Nav extends Component {

    helper: TSXHelper;
    doc: Content;

    constructor(props: { doc:Content, helper:TSXHelper }) {
        super();
        this.helper = props.helper;
        this.doc = props.doc;
    }

    generateToc(toc: TocItem){
        //let toc: TocItem | undefined = TocManager.getTocForPath(this.tocPath);
        if(toc) {
            toc.children = toc.children.sort(tocSort(false));

            return (
                <ul class="top-level">
                    {toc.children.map(c => this.recurseToc(c))}
                </ul>
            )
        }
        return <></>
    }

    recurseToc(tocItem: TocItem){

        //const open = TSXHelper.subArticle(tocItem.path, this.doc) || tocItem.path == this.doc.meta["url_rel"]
        const open = TocManager.getTocPathForPath(this.doc.meta["url_rel"]).some(t=>t === tocItem);

        if(tocItem.content) {
            if(tocItem.children.length !== 0){
                console.log(`Non leaf "${tocItem.name}" toc node can't have content`)
            }

            return (
                <li>
                    <a href={tocItem.content.meta["url"]} active={open}>
                        {tocItem.content.meta.title ?? tocItem.content.name}
                    </a>
                </li>)
        }
        //if(this.docs.path.includes("ShadowEngine"))
        //debugger;
        return (
            <li class="nav-group" open={open}>
                <div class="nav-group-header"> <span>{tocItem.name}</span> </div>
                <ul>
                    {tocItem.children.sort(tocSort(false)).map(a=>this.recurseToc(a))}
                </ul>
            </li>
        );

    }

    private versionSelector(toc: TocItem) {
        return (
            <select name="cars" id="version" onchange={()=>{window.location += '/' + window.document.getElementById('version').value}} IIFE>
                <option value=""></option>
                {toc.children.map(c=>(
                    <option value={c.name}>{c.name}</option>
                ))}
            </select>
        );
    }

    render() {
        let tocPath = TocManager.getTocPathForPath(this.doc.meta["url_rel"]);
        const top = tocPath.findLastIndex( t=> t.content?.meta["toc"] === "header")

        if(this.doc.meta?.url?.includes("feature--archivist-docs")) debugger;

        let topToc = tocPath[top+1];
        if(topToc === undefined)
            return <></>;

        let navToc = topToc;

        if(navToc.name === "docs" && tocPath.length > 3)
            navToc = tocPath[top+2];




        return(
            <aside id="drawer" class="drawer-holder">
                <div class="drawer">
                    <button id="nav-level-button" onclick={
                    ()=>window.document.getElementById('nav-holder')?.toggleAttribute('top-level')
                    }> "back" </button>

                    {
                        topToc?.name === "docs" ?
                            this.versionSelector(topToc) : <></>
                    }

                    <div id={"nav-holder"} class="nav-holder">
                        <nav class="nav nav-top">
                            <h1>Top</h1>
                        </nav>
                        <nav class="nav" id="nav">
                            {
                                this.generateToc(navToc)
                            }

                        </nav>
                    </div>
                </div>
                <a></a>
            </aside>
            );
    }
}

export const Nav_old = ({doc,helper}: { doc: Content, helper:ArticleHelper }) => {

}