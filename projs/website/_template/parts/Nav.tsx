import {ArticleHelper, Content, React, Component, window} from "../common.ts";
import {TSXHelper} from "../TSXHelper.ts";
import {archivistInst} from "dpeter99/archivist/src/Archivist.ts";
import {makeToc, subToc, TocItem, TocManager, tocSort} from "../libs/toc/TOC.ts";

export class Nav extends Component {

    helper: TSXHelper;
    doc: Content;
    tocPath: string;

    constructor(props: { doc:Content, helper:TSXHelper, tocPath: string }) {
        super();
        this.tocPath = props.tocPath;
        this.helper = props.helper;
        this.doc = props.doc;
    }

    generateToc(){
        let toc: TocItem | undefined = TocManager.getTocForPath(this.tocPath);
        if(toc) {
            toc.children = toc.children.sort(tocSort(false));

            return (
                <ul class="top-level">
                    {toc.children.map(c => this.recurseToc(c, `${archivistInst.outputURL?? ""}/${c.name}`))}
                </ul>
            )
        }
        return <></>
    }

    recurseToc(tocItem: TocItem, path:string = ""){

        const open = TSXHelper.subArticle(path, this.doc) || path == this.doc.meta.url

        if(this.doc.name.includes("ModelBuilder") && open) debugger;

        if(tocItem.content) {
            if(tocItem.children.length !== 0){
                console.log(`Non leaf "${tocItem.name}" toc node can't have content`)
            }

            return (
                <li>
                    <a href={tocItem.content.meta.url} active={open}>
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
                    {tocItem.children.sort(tocSort(false)).map(a=>this.recurseToc(a, path+"/"+a.name))}
                </ul>
            </li>
        );

    }

    render() {

        let listItems = this.helper.subArticles().map((number) =>
            <li><a href={number.meta.url}>{number}</a></li>
        );

        return(
            <aside id="drawer" class="drawer-holder">
                <div class="drawer">
                    <button id="nav-level-button" onclick={
                    ()=>window.document.getElementById('nav-holder')?.toggleAttribute('top-level')
                    }> "back" </button>

                    <div id={"nav-holder"} class="nav-holder">
                        <nav class="nav nav-top">
                            <h1>Top</h1>
                        </nav>
                        <nav class="nav" id="nav">
                            {this.generateToc()}
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