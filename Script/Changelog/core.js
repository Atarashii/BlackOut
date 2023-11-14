import { primitive } from "../Utils/elementBuilder.js";
import { get } from "../Utils/jsonFile.js"

const log = $('#footer .changelog');

export const changelog = {
    changes: [],
    init: async function () {
        const result = await get('./Assets/Templates/Changelog/changes.json');

        log.html('');

        const updates = result.updates.reverse();
        const lastUpdate = updates[0];
        
        $('#gameversion').text(`v ${lastUpdate.version_m}.${lastUpdate.version_s}.${lastUpdate.version_c}`);

        updates.forEach(update => {
            if (update.version_m === 0 && update.version_s === 0 && update.version_c === 0)
                return;

            const updateEle = primitive('update');
            const versionEle = primitive('version', '', '', '', '', `${update.version_m}.${update.version_s}.${update.version_c}`);
            updateEle.append(versionEle);

            const batchEle = primitive('batch');
            if (update.changes_m.length > 0) {
                const sigEle = primitive('significance', '', '', '', '', 'Major');
                batchEle.append(sigEle);

                const changesEle = primitive('changes');
                update.changes_m.forEach(change => {
                    const impact = change.impact.length > 0 ? ` (<span class="impact">${change.impact}</span>)` : '';
                    const html = `<span class="title">${change.title}</span> - <span class="description">${change.description}</span>${impact}`
                    const changeEle = primitive('change', '', '', '', html);
                    changesEle.append(changeEle);
                });
                batchEle.append(changesEle);
            }

            if (update.changes_s.length > 0) {
                const sigEle = primitive('significance', '', '', '', '', 'Minor');
                batchEle.append(sigEle);

                const changesEle = primitive('changes');
                update.changes_s.forEach(change => {
                    const impact = change.impact.length > 0 ? ` (<span class="impact">${change.impact}</span>)` : '';
                    const html = `<span class="title">${change.title}</span> - <span class="description">${change.description}</span>${impact}`
                    const changeEle = primitive('change', '', '', '', html);
                    changesEle.append(changeEle);
                });
                batchEle.append(changesEle);
            }

            if (update.changes_c.length > 0) {
                const sigEle = primitive('significance', '', '', '', '', 'Misc.');
                batchEle.append(sigEle);

                const changesEle = primitive('changes');
                update.changes_c.forEach(change => {
                    const impact = change.impact.length > 0 ? ` (<span class="impact">${change.impact}</span>)` : '';
                    const html = `<span class="title">${change.title}</span> - <span class="description">${change.description}</span>${impact}`
                    const changeEle = primitive('change', '', '', '', html);
                    changesEle.append(changeEle);
                });
                batchEle.append(changesEle);
            }

            updateEle.append(batchEle);
            log.append(updateEle);
        });

    }
}