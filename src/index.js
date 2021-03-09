import FlameChart from './flameChart.js';
// import { generateRandomTree } from './../../src/test-data.js';
import docs from './nodes/scanNodes.js';
import colors from './colors.js';
import example from './example.js';

window.onload = () => {

    function renderChart() {

        const json = JSON.parse(inputField.value);

        const flameTree = transformPostgressJson(json);

        const timestamps = [
            {
                shortName: 'START',
                fullName: 'START',
                timestamp: 0,
                color: '#d7c44c'
            },
            {
                shortName: 'END',
                fullName: 'END',
                timestamp: flameTree[0].duration,
                color: '#d7c44c'
            },
        ]

        flameChart.resetView();
        flameChart.setTimestamps(timestamps, false);
        flameChart.setData(flameTree, true);
        // flameChart.update();

        // setTimeout(_=>flameChart.update(),500);

        console.log('Rendered!');
    }

    function transformPostgressJson(obj) {
        function mapTree(treeList, getChild, mapperFn, level = 0) {
            return treeList.map((item) => {
                let children = getChild(item);
                if (children) {
                    children = mapTree(children, getChild, mapperFn, level + 1);
                }
                return mapperFn(item, children, treeList, level);

            });
        }

        // Modify the first level
        obj = obj.map(item => item.Plan);

        let seq = [];
        const newTree = mapTree(obj, c => c && c.Plans || (c.Plan ? [c.Plan] : null), (item, children, parent, level) => {

            if (seq[level] === undefined) {
                seq[level] = seq[level-1] || 0;
            }

            const node = {
                name: item['Node Type'],
                start: seq[level],
                duration: item['Actual Total Time'] || item['Total Cost'],
                type: item['Node Type'],
                textColor: '#ffffff',
                children: children,
                original: {
                    ...item,
                    Plans: undefined, // don't keep it
                    Plan: undefined, // don't keep it
                }
            }

            seq[level] += node.duration;

            return node;
        });

        console.log(newTree);
        return newTree;
    }

    const canvas = document.getElementById('root');
    const inputField = document.getElementById('input');
    const updateButton = document.getElementById('button');
    const inspectorDiv = document.getElementById('selected-node');
    const inpectorHintDiv = document.getElementById('selected-node-hint');

    inputField.value = JSON.stringify(example);


    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight / 2;

    // canvas.style.background = '#292A2D';

    const flameChart = new FlameChart({
        canvas,
        data: [],
        // timestamps: [],
        colors,
    });

    flameChart.timestampColor = "#888888";

    flameChart.on('select', (flameNode) => {
        if (flameNode) {
            const node = {
                ...flameNode.original,
            };

            inspectorDiv.innerHTML = JSON.stringify(node, null, '  ');
            inpectorHintDiv.innerHTML = generateDoc(node);
        }
        else {

            inpectorHintDiv.innerHTML = '';
            inspectorDiv.innerHTML = '';
        }
    });

    window.addEventListener('resize', renderChart);
    updateButton.addEventListener('click', renderChart);

    requestAnimationFrame(renderChart);
};

function generateDoc(node) {
    const type = node['Node Type'];
    const doc = docs[type];

    if(doc) {
        return `
            <a href='${doc.link}' target="_blank">${type}</a>
            <quote>${doc.text}</quote>
        `;
    }
    return `No info about this node type.`;
}