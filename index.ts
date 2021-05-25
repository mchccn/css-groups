const map = new Map();

Array.from(document.querySelectorAll("style")).map((style) => {
    const lines = style.innerHTML.split("\n").map((l) => l.trim());

    let toSkip = 0;

    lines.forEach((line, i) => {
        if (toSkip) return toSkip--;

        const group = line.trim().match(/^@group\s+([A-Za-z_-]+)\s+\{/)?.[0];

        if (!group) return;

        const block = lines.slice(i + 1, i + lines.slice(i).indexOf(lines.slice(i).find((l) => l.trim().endsWith("}")) !));

        toSkip = block.length + 1;

        const name = group.split("{")[0].slice("@group".length).trim();

        return map.set(name, block);
    });

    return { style, lines };
}).map(({ style, lines }) => {
    let toSkip = 0;

    lines.forEach((line, i) => {
        if (toSkip) return toSkip--;

        const groups = line.trim().match(/^groups\s*:(.+);$/)?.[0];

        if (!groups) return;

        const names = groups.split(":")[1].trim().slice(0, -1).split(/\s+/);

        lines.splice(i, 1);

        return names.forEach((name) => {
            const block = map.get(name);

            if (!block) return;

            lines.splice(i, 0, ...block);

            toSkip += block.length + 1;
        });
    });

    return (style.innerHTML = lines.join("\n"));
});
