import {React, ArchExp, archivistInst, Content} from "../common.ts";
import {TocItem, TocManager} from "../libs/toc/TOC.ts";
import {TSXHelper} from "../TSXHelper.ts";
import {NavBar} from "./NavBar.tsx";

export class NavBarStack extends ArchExp.Component {

    helper: TSXHelper;

    constructor(private props: {helper:TSXHelper, doc: Content}) {
        super();
        this.helper = props.helper;
    }

    render() {
        return (
            <div class="header-container">

                <NavBar helper={this.helper} tocPath={"/"} secondary={false}>
                    <button onClick={
                        ()=>window.document.getElementById('drawer')?.toggleAttribute('open')
                    } IIFE>-</button>
                    <a className="logo__link" href={"/"}>
                        <div class="logo">
                            <span>Candle Fire</span>
                        </div>
                    </a>
                </NavBar>
                {
                    TocManager.getTocPathForPath(this.props.doc.meta["url_rel"])
                        .filter(toc => toc.content?.meta["toc"] === "header")
                        .map(toc => (
                            <NavBar helper={this.helper} tocPath={toc.path+"/"} secondary>
                                <div class="logo">
                                    <span>{toc.content?.meta.title ?? toc.content?.name}</span>
                                </div>
                            </NavBar>
                        ))
                }
            </div>
        );
    }
}