(() => {
    function bind(nodes, event, handler) {
        nodes.forEach(node => {
            node.addEventListener(event, handler);
        });
    }

    function makeTabs() {
        const node = document.querySelector('.main__devices')
        let selected = node.querySelector('[aria-hidden="true"]').dataset.id;
        const tabs = node.querySelectorAll('.section__tab');
        const list = Array.from(tabs).map(node => node.dataset.id);
        const select = node.querySelector('.section__select');

        function selectTab(newId) {
            console.log(newId)
            const newTab = node.querySelector(`.section__tab[data-id=${newId}]`);
            const newPanel = node.querySelector(`.section__panel[data-id=${newId}]`);
            const oldTab = node.querySelector('[aria-selected="true"]');
            const oldPanel = node.querySelector('[aria-hidden="false"]');

            selected = newId;

            oldTab.setAttribute('aria-selected', 'false');
            oldTab.removeAttribute('tabindex');
            newTab.setAttribute('aria-selected', 'true');
            newTab.setAttribute('tabindex', '0');
            newTab.focus({
                preventScroll: true
            });

            oldPanel.setAttribute('aria-hidden', 'true');
            newPanel.setAttribute('aria-hidden', 'false');

        }

        select.addEventListener('input', () => {
            selectTab(select.value);
        });

        bind(tabs, 'click', event => {
            const newId = event.target.dataset.id;
            selectTab(newId);
        });

        bind(tabs, 'keydown', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            let index = list.indexOf(selected);
            switch(event.which){
                case 37:
                    --index;
                    break;
                case 39:
                    ++index;
                    break;
                case 36:
                    index = 0;
                    break;
                case 35:
                    index = list.length - 1;
                    break;
                default:
                    return;
            }
            

            if (index >= list.length) {
                index = 0;
            } else if (index < 0) {
                index = list.length - 1;
            }

            selectTab(list[index]);
            event.preventDefault();
        });
    }

    function makeMenu() {
        const node = document.querySelector('.header__menu')
        node.addEventListener('click', () => {
            const expanded = !(node.getAttribute('aria-expanded') === 'true')
            node.setAttribute('aria-expanded',String(expanded));
            
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        makeTabs();
        makeMenu()
    });
})();
