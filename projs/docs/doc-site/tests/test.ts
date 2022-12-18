import * as ts from "https://esm.sh/typescript@4.8.2";

import {
    resolveImportMap,
    resolveModuleSpecifier,
    ImportMap
} from "https://deno.land/x/importmap@0.2.1/mod.ts";
import {dirname} from "https://deno.land/std@0.167.0/path/mod.ts";

import sass from "https://deno.land/x/denosass@1.0.5/mod.ts";
//import sass from "npm:sass";

export async function walk(
    sourceFile: ts.SourceFile,
    reviver: (node: ts.Node) => Promise<void> | void,
) {
    async function visit(
        node: ts.Node,
        reviver: (node: ts.Node) => Promise<void> | void,
    ) {
        await reviver(node);
        const children = node.getChildren(sourceFile);
        for (const child of children) {
            await visit(child, reviver);
        }
    }
    await visit(sourceFile, reviver);
}


const importMapBaseURL = new URL(import.meta.url);
const importMap: ImportMap = (await import("../import_map.json", {
    assert: { type: "json" },
})).default;
const resolvedImportMap = resolveImportMap(importMap, importMapBaseURL);


const fileName = "./test.import.ts";

type Dependencie = { from: string, path: string, resolved: string };

let visited: string[] = [];
let queue: Dependencie[] = [];

addToQueue(import.meta.url, fileName)

function addToQueue(from: string, dep: string) {
    if(!visited.includes(dep)) {
        queue.push({
            from,
            path: dep,
            resolved: resolveModuleSpecifier(dep, resolvedImportMap, new URL(from))
        });
        visited.push(dep);
    }
}

function getURLFolder(url: URL) {
    const path = dirname(url.pathname);

    url.pathname = path;
    return url;
}

while (queue.length > 0){
    const dep = queue.pop()!;

    console.log(dep.resolved);

    if(/^.*.ts(x)?$/.test(dep.path)){
        await loadTypeScript(dep);
    }

    if(/^.*.scss?$/.test(dep.path)){
        await loadStyle(dep);
    }

}

async function loadTypeScript(data:Dependencie) {
    let content = await (await fetch(data.resolved)).text();
    const ast = ts.createSourceFile(data.resolved, content,ts.ScriptTarget.Latest);

    await walk(ast, (node) => {
        if (
            ts.isImportDeclaration(node) &&
            ts.isStringLiteral(node.moduleSpecifier)
        ){
            const target = node.moduleSpecifier.text;
            //console.log(target);
            addToQueue(data.resolved, target);
        }
    });
}

async function loadStyle(data:Dependencie){

    const compiler = Deno.run({
        cmd: ["cmd", "/c", "sass", `${data.path}:dist/${data.path}`]
    })

    await compiler.status()

}


const res = await import(fileName);

/*
async function loadStyle_npm(data:Dependencie){
    let content = await (await fetch(data.resolved)).text();

    let compiled = sass.compileString(
        content,
        {
            url: new URL(data.resolved)
        });

    console.log(compiled.css);
}
 */