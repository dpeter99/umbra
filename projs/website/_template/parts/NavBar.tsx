import {React, ArchExp, window, archivistInst} from "../common.ts";
import {makeToc, subToc, TocManager} from "../libs/toc/TOC.ts";
import {TSXHelper} from "../TSXHelper.ts";

export class NavBar extends ArchExp.Component {

    helper: TSXHelper;
    protected children: ArchExp.Component[];

    constructor(private props: {helper:TSXHelper, tocPath: string, secondary: boolean}, children: ArchExp.Component[]) {
        super();
        this.children = children;
        this.helper = props.helper;
    }

    getTabs(){
        const toc = TocManager.getTocForPath(this.props.tocPath);

        return toc?.children.map(c=>(
            <tab>
                <a href={c.content?.meta.url ?? ""}>{c.content?.meta.title ?? c.name}</a>
            </tab>
        ))
    }

    render() {
        return (
            <div class={this.props.secondary ? "header-bar header-color" : "header-bar"}>
                {this.children}
                <nav>
                    {this.getTabs()}
                </nav>
            </div>
        );
    }
}