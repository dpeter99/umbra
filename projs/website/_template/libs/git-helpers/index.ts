const decoder = new TextDecoder();

export async function tag_last(
    env: { [index: string]: string },
    cwd?: string,
): Promise<string | undefined> {
    return commandRes(["git", "describe", "--tags", "--abbrev=0"], env, cwd);
}

export async function tag_current(
    env: { [index: string]: string },
    cwd?: string,
): Promise<string | undefined> {
    return commandRes(["git", "tag", "--points-at", "HEAD"], env, cwd);
}

//"git", "rev-parse", "--abbrev-ref", "HEAD"
export async function branch_current(
    env: { [index: string]: string },
    cwd?: string,
): Promise<string | undefined> {
    return commandRes(["git", "rev-parse", "--abbrev-ref", "HEAD"], env, cwd);
}


export async function commandRes(
    command: string[],
    env: { [index: string]: string },
    cwd?: string,
): Promise<string | undefined> {
    try {
        const process = Deno.run({
            cmd: [...command],
            env,
            cwd,
            stdout: "piped",
        });
        const output = await process.output();
        return decoder.decode(output).trimEnd();
    } catch {
        return undefined;
    }
}
