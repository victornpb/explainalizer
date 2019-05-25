


window.onload = function () {

    input.value = JSON.stringify(json, 0, 4);

    input.oninput = render;
    
    function render() {

        var obj;
        try {
            obj = JSON.parse(input.value);
        } catch (err) {
            container.innerHTML = err;
            return;
        }

        var elm = traverse(obj[0].Plan);
        container.innerHTML = '';
        container.appendChild(elm);

        function traverse(node) {
            const el = document.createElement('div');
            el.className = "node";
            
            const it = document.createElement('div');
            it.className = "it";
            
            
            el.appendChild(it);
            
            const ownNode = JSON.parse(JSON.stringify(node));
            delete ownNode.Plans;
            
            // it.innerText = JSON.stringify(ownNode, 1, 4);
            
            it.appendChild(map2Table(ownNode));
            
            if (node['Plans']) {
                const children = document.createElement('div');
                children.className = "children";

                const ca = node['Plans'].forEach(c => {
                    const el = traverse(c);
                    children.appendChild(el);
                });
                el.appendChild(children);
            }

            return el;

        }
    }
    render();

}

function map2Table(obj) {
    var html = '<table>' + Object.keys(obj).map(key => `<tr><th>${key}</th><td>${obj[key]}</td></tr>`).join('') + '</table>';
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}