namespace game.changelog {
    export async function init() {
        const container = $('#footer .changelog');
        const result = await utils.jsonfile.getData('./Assets/Templates/Changelog/changes.json');

        container.html('');

        const updates = result.updates.reverse() as Array<Update>;
        const latest = updates[0];

        $('#gameversion').text(`v ${latest.version_m}.${latest.version_s}.${latest.version_c}`);

        updates.forEach(update => {
            if (update.version_m === 0 && update.version_s === 0 && update.version_c === 0)
                return;

            const updateEle = builder.primitive('update');
            const versionEle = builder.primitive('version', '', '', '', undefined, undefined, `${update.version_m}.${update.version_s}.${update.version_c}`);
            updateEle.append(versionEle);

            const batchEle = builder.primitive('batch');
            if (update.changes_m.length > 0) {
                const sigEle = builder.primitive('significance', '', '', '', undefined, undefined, 'Major');
                batchEle.append(sigEle);

                const changesEle = builder.primitive('changes');
                update.changes_m.forEach(change => {
                    const impact = change.impact ? ` (<span class="impact">${change.impact}</span>)` : '';
                    const html = `<span class="title">${change.title}</span> - <span class="description">${change.description}</span>${impact}`;
                    const changeEle = builder.primitive('change', '', '', '', undefined, html);
                    changesEle.append(changeEle);
                });
                batchEle.append(changesEle);
            }

            if (update.changes_s.length > 0) {
                const sigEle = builder.primitive('significance', '', '', '', undefined, undefined, 'Minor');
                batchEle.append(sigEle);

                const changesEle = builder.primitive('changes');
                update.changes_s.forEach(change => {
                    const impact = change.impact ? ` (<span class="impact">${change.impact}</span>)` : '';
                    const html = `<span class="title">${change.title}</span> - <span class="description">${change.description}</span>${impact}`;
                    const changeEle = builder.primitive('change', '', '', '', undefined, html);
                    changesEle.append(changeEle);
                });
                batchEle.append(changesEle);
            }

            if (update.changes_c.length > 0) {
                const sigEle = builder.primitive('significance', '', '', '', undefined, undefined, 'Misc.');
                batchEle.append(sigEle);

                const changesEle = builder.primitive('changes');
                update.changes_c.forEach(change => {
                    const impact = change.impact ? ` (<span class="impact">${change.impact}</span>)` : '';
                    const html = `<span class="title">${change.title}</span> - <span class="description">${change.description}</span>${impact}`;
                    const changeEle = builder.primitive('change', '', '', '', undefined, html);
                    changesEle.append(changeEle);
                });
                batchEle.append(changesEle);
            }

            updateEle.append(batchEle);
            container.append(updateEle);
        });

    }

    interface Update {
        version_m: number;
        version_s: number;
        version_c: number;
        changes_m: Array<Change>;
        changes_s: Array<Change>;
        changes_c: Array<Change>;
    }

    interface Change {
        title: string | undefined;
        description: string | undefined;
        impact: string | undefined;
    }
}