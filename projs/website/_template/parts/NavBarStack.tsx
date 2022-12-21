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
                <NavBar helper={this.helper} tocPath={"/"}>
                    <div class="logo">
                        <span>Candle Fire</span>
                    </div>
                </NavBar>
            </div>
        );
    }
}