import { isWebp } from './checkWebp.js';
import { devs } from '../../services/devs.service.js';
import { projectInfo, projectTime } from '../../services/project.service.js';
import { efficiency } from '../../services/efficiency.service.js';
import { tasks } from '../../services/table.service.js';

isWebp();

//Change Mode in Header
document.querySelector('.header__mode').addEventListener("click", e =>
    e.currentTarget.querySelector('img').src.includes('dark-mode.svg')
        ? e.currentTarget.querySelector('img').src = '../img/light-mode.svg'
        : e.currentTarget.querySelector('img').src = '../img/dark-mode.svg'
);

//Header Menu Adaptive
const iconMenu = document.querySelector(".icon-menu");
const body = document.querySelector("body");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
    iconMenu.addEventListener("click", function () {
        iconMenu.classList.toggle("active");
        body.classList.toggle("lock");
        menuBody.classList.toggle("active");
    });
}

//Filters
let applyFilters = { dev: [] } //filter values object

//Hide/show select block
const selectDesign = e => {
    if (e.target.children.length === 2) {
        let deg = parseInt(e.target.children[1].style.transform.slice(7))
        if (deg === 180) {
            e.target.parentNode.children[1].style.display = 'none';
        }
        else {
            e.target.parentNode.children[1].style.display = 'block';
        }
        e.target.children[1].style.transform = `rotate(${deg === 180 ? 0 : 180}deg)`;
    }
    else {
        let deg = parseInt(e.target.parentNode.children[1].style.transform.slice(7))
        if (deg === 180) {
            e.target.parentNode.parentNode.children[1].style.display = 'none';
        }
        else {
            e.target.parentNode.parentNode.children[1].style.display = 'block';
        }
        e.target.parentNode.children[1].style.transform = `rotate(${deg === 180 ? 0 : 180}deg)`;
    }
}

document.querySelectorAll('.select__main-row').forEach(item => item.addEventListener("click", e => {
    selectDesign(e);
}))

document.querySelectorAll('.filter-status').forEach(item => item.addEventListener("click", e => {
    if (e.target.children.length === 1) {
        e.target.parentNode.parentNode.children[0].children[0].innerText = e.target.children[0].innerText
        selectDesign(e.target.parentNode.parentNode.children[0].click());
    }
    else {
        e.target.parentNode.parentNode.parentNode.children[0].children[0].innerText = e.target.innerText
        selectDesign(e.target.parentNode.parentNode.parentNode.children[0].click());
    }
}))

let selectMoreFlag = true;
document.querySelectorAll('.select__more').forEach(item => item.addEventListener("click", e => {
    let parent;
    let type;

    if (e.target.children.length !== 0) {
        let deg = parseInt(e.target.children[0].style.transform.slice(7))
        parent = e.target.parentNode.parentNode.children[1]
        type = e.target.parentNode.children[0].children[1].innerText
        e.target.children[0].style.transform = `rotate(${deg === 180 ? 0 : 180}deg)`;
        if (deg === 180) {
            parent.style.display = 'none'
            selectMoreFlag = false
        }
        else {
            addBlock()
        }
    }
    else {
        let deg = parseInt(e.target.style.transform.slice(7))
        e.target.style.transform = `rotate(${deg === 180 ? 0 : 180}deg)`;
        parent = e.target.parentNode.parentNode.parentNode.children[1]
        type = e.target.parentNode.parentNode.children[0].children[1].innerText
        if (deg === 180) {
            parent.style.display = 'none'
            selectMoreFlag = false
        }
        else {
            addBlock()
        }
    }

    function addBlock() {
        if (parent && type) {
            for (const [key, value] of Object.entries(devs)) {
                if(key.trim() === type.trim()) {
                    value.forEach(item => {
                        if(!selectMoreFlag) {
                            let strValue = Array.from(parent.children).map(item => item.children[0].children[1].innerText);
                            if (!strValue.join(' ').includes(item)) {
                                addRow(item)
                            }
                            else {
                                parent.style.display = 'block'
                            }
                        }
                        else {
                            addRow(item)
                        }
                    })
                }
            }
        }
    }

    function addRow(item) {
        parent.style.display = 'block'
        let li = document.createElement('li')
        let div = document.createElement('div')
        div.classList.add('select__developers-row')

        let input = document.createElement('input')
        input.type='checkbox';
        input.checked = true
        input.classList.add('select__checkbox')
        input.id = `select__checkbox-${item.toLowerCase().split(' ').join('-')}`
        input.addEventListener('click', e =>
            checkSelected(e)
        )

        let label = document.createElement('label')
        label.for = input.id
        label.classList.add('select__checkbox-label', 'select__checkbox-label--developers')
        label.innerText = item

        div.append(input)
        div.append(label)
        li.append(div)
        parent.append(li)
    }

    function checkSelected(e) {
        let arrCheck = Array.from(e.target.parentNode.parentNode.parentNode.children).map(item =>
            !!item.children[0].children[0].checked
        )
        e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].checked = arrCheck.includes(true);
    }
}))

document.querySelector('#select__checkbox-all-people').addEventListener('click', e => {
    if (!e.target.checked){
        document.querySelectorAll('.select__checkbox').forEach(item => item.checked = false)
        e.target.checked = false
    }
    else {
        document.querySelectorAll('.select__checkbox').forEach(item => item.checked = true )
        e.target.checked = true
    }
})

document.querySelectorAll('.select__checkbox').forEach((item, index, array) => item.addEventListener("click", e => {
    if(!e.target.checked) {
        document.querySelector('#select__checkbox-all-people').checked = false
        document.querySelector('#select__value').innerText = 'Selected People'
    }
    else {
        let flag = Array.from(array).map(item => !!item.checked)
        flag.shift()
        if(!flag.includes(false)){
            document.querySelector('#select__checkbox-all-people').checked = true
            document.querySelector('#select__value').innerText = 'All People'
        }
    }
}))

document.querySelectorAll('.select__main-cat').forEach(item => item.addEventListener('click', e => {
    e.target.parentNode.parentNode.children[1].click()
    Array.from(e.target.parentNode.parentNode.parentNode.children[1].children).forEach(item =>
        item.children[0].children[0].checked = e.target.checked
    )
}))

document.querySelector('.filters__button-reset').addEventListener('click', () => {
    document.querySelector('#select__value').innerText = 'All People'
    document.querySelector('#select__status').innerText = 'All Statuses'
    document.querySelectorAll('.select__checkbox').forEach(item => item.checked = true)
    document.querySelector('#filters__efficiency-checkbox').checked = true
})

document.querySelector('.filters__button-apply').addEventListener('click', () => {
    applyFilters.dev = []
    document.querySelectorAll('.select__developers').forEach(item => {
        if (item.children.length === 0) {
            item.parentNode.children[0].children[1].children[0].style.transform = 'rotate(0deg)'
            item.parentNode.children[0].children[1].click()
            Array.from(item.children).forEach(li => {
                if (li.children[0].children[0].checked) {
                    applyFilters.dev.push(li.children[0].children[1].innerText)
                }
            })
        }
        else {
            Array.from(item.children).forEach(li => {
                if (li.children[0].children[0].checked) {
                    applyFilters.dev.push(li.children[0].children[1].innerText)
                }
            })
        }
    })


    applyFilters.status = document.querySelector('#select__status').innerText
    !document.querySelector('#filters__efficiency-checkbox').checked
        ? document.querySelector('.efficiency').style.display = 'none'
        : document.querySelector('.efficiency').style.display = 'block'
})





//Create table tasks
let counter = 0;
let summTotalTimeSpentByAll = 0;
let summMyTimeSpentByPeriod = 0;
let efficiencyAvarage = [];

const table = document.querySelector('.table__body');
for (const row of tasks) {
    const tr = document.createElement('tr');
    if (counter % 2 === 0) {
        tr.classList.add('table__row', 'table__row--content', 'table__row--not-odd')
        counter++
    }
    else {
        tr.classList.add('table__row', 'table__row--content', 'table__row--odd')
        counter++
    }

    for (const [key, value] of Object.entries(row)) {
        const td = document.createElement('td')
        if (key === 'taskName') {
            td.classList.add('table__task-name', 'table__task-name--content');
            td.innerHTML = `<a href="#">${value || 'task name'}</a>`
        }
        else if (key === 'developer') {
            td.classList.add('table__developer', 'table__developer--content')
            if (value.length > 0) {
                if (value.length >= 7) {
                    td.innerHTML += `
                  <p>
                     <span>${value[0]}, ${value[1]}...</span>
                     <span style="display:none;">${value.join(', ')}</span>
                  </p>
                  <span class="table__show-more">
                     Show more (${value.length-2})
                  </span>
               `
                }
                else{
                    td.innerHTML += `${value.join(', ')}`
                }
            }
            else{
                td.innerHTML = 'not developers'
            }
        }
        else if (key === 'workType') {
            td.classList.add('table__work-type', 'table__work-type--content')
            if (value.length > 0) {
                if (value.length >= 5) {
                    td.innerHTML += `
                  <p>
                     <span>${value[0]}, ${value[1]}...</span>
                     <span style="display:none;">${value.join(', ')}</span>
                  </p>
                  <span class="table__show-more">
                     Show more (${value.length-2})
                  </span>
               `
                }
                else {
                    td.innerHTML += `${value.join(', ')}`
                }
            }
            else {
                td.innerHTML = 'not work type'
            }
        }
        else if (key === 'status') {
            if (value === 'Сompleted') {
                td.classList.add('table__status', 'table__status--completed')
                td.innerHTML = `<span>${value}</span>`
            }
            else if(value === 'Non completed'){
                td.classList.add('table__status', 'table__status--non-completed')
                td.innerHTML = `<span>${value}</span>`
            }
            else{
                td.innerHTML = `<span>-</span>`
            }
        }
        else if (key === 'estimation') {
            td.classList.add('table__estimation')
            td.innerHTML = `<span>${parseFloat(value).toFixed(1) || '0.0'}</span>`
        }
        else if (key === 'totalTimeSpent') {
            td.classList.add('table__total-time')
            td.innerHTML = `<span>${parseFloat(value).toFixed(2) || '0.0'}</span>`
            summTotalTimeSpentByAll += value
        }
        else if (key === 'MyTimeSpentByPeriod') {
            td.classList.add('table__my-time')
            td.innerHTML = `<span>${parseFloat(value).toFixed(2) || '0.0'}</span>`
            summMyTimeSpentByPeriod += value
        }
        else if (key === 'efficiency') {
            td.classList.add('table__efficiency')
            td.innerHTML = `<span>${value || '-'}</span>`
            if (value !== null) {
                efficiencyAvarage.push(parseFloat(value))
            }
        }
        else {
            continue;
        }
        tr.appendChild(td)
    }
    if (counter === tasks.length) {
        console.log(efficiencyAvarage)
        let eff = efficiencyAvarage.reduce((acc, item) => acc + item, 0)
        const trSumm = document.querySelector('.table__row--summ');
        trSumm.innerHTML = `
      <div class="table__width-summ">Sum</div>
      <div class="table__total-time">${Math.ceil(summTotalTimeSpentByAll)}h</div>
      <div class="table__my-time">${Math.ceil(summMyTimeSpentByPeriod)}h</div>
      <div class="table__efficiency">${eff / efficiencyAvarage.length}% (${Math.ceil(summMyTimeSpentByPeriod)}h)</div>`;
        table.append(tr);
    }
    else {
        table.append(tr);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        let index = 0
        if (target.parentNode.cells) {
            index = [...target.parentNode.cells].indexOf(target);
        }
        else {
            index = [...target.parentNode.parentNode.cells].indexOf(target.parentNode);
        }
        const collator = new Intl.Collator('en', { numeric: true });
        const comparator = (index, order) => (a, b) => {
            return order * collator.compare(
                a.children[index].innerHTML,
                b.children[index].innerHTML
            )};

        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));
    };

    const readMore = e => {
        const text = e.target.parentNode
        console.log(text.children[0].children[0])
        if (e.target.innerHTML.includes('Show more')) {
            e.target.innerHTML = 'Hide'
            text.children[0].children[0].style.display = 'none'
            text.children[0].children[1].style.display = 'inline'
        }
        else {
            e.target.innerHTML = `Show more (${text.children[0].children[1].innerHTML.split(', ').length-2})`
            text.children[0].children[0].style.display = 'inline'
            text.children[0].children[1].style.display = 'none'
        }
    }

    document.querySelectorAll('.table thead tr').forEach(tableTH => tableTH.addEventListener('click', event => getSort(event)));
    document.querySelectorAll('.table__show-more').forEach(showMore => showMore.addEventListener('click', event => readMore(event)));

});






//Rows per page
let currentRowsPerPage = +document.querySelector('#select__page').innerHTML;
let currentPage = 1;

const $paginationCount = document.querySelector('.pagination__count');
const $rowsPerPage = document.createElement('span');
$rowsPerPage.className = 'pagination__rows-per-page';
$rowsPerPage.innerHTML = `1-${tasks.length < currentRowsPerPage ? tasks.length : currentRowsPerPage} of ${tasks.length}`;
$paginationCount.appendChild($rowsPerPage);

const $selectedRowsPerPage = document.querySelector('.pagination__select');

const changeRows = () => {
    currentRowsPerPage = +document.querySelector('#select__page').innerHTML;
    console.log(currentRowsPerPage)
    $rowsPerPage.innerHTML = `${currentPage === 1 ? currentPage : ((currentPage - 1) * currentRowsPerPage)+1}-${tasks.length > currentRowsPerPage*currentPage ? currentRowsPerPage*currentPage : tasks.length} of ${tasks.length}`;
    let tBody = document.querySelector('.table__body');
    if (currentRowsPerPage === 5) {
        tBody.style.minHeight = "363px";
        tBody.style.maxHeight = "363px";
        tBody.style.overflowY="scroll";
        tBody.style.display="block";
    }
    if (currentRowsPerPage >= 10) {
        tBody.style.minHeight = "600px";
        tBody.style.maxHeight = "600px";
        tBody.style.overflowY="scroll";
        tBody.style.display="block";
    }
    table.childNodes.forEach((item, index) => {
        if (index >= currentRowsPerPage * (currentPage - 1) && index < currentRowsPerPage * currentPage) {
            item.style.display = 'flex'
        }
        else {
            item.style.display = 'none'
        }
    })
}
changeRows()

document.querySelectorAll('.per-page').forEach(item => item.addEventListener('click', changeRows))
// $selectedRowsPerPage.addEventListener('change', changeRows);

const $pagination = document.querySelector('.pagination__page-number');

const $arrowPrev = document.createElement('img');
$arrowPrev.className = 'arrowPrev';
$arrowPrev.src = 'img/arrowRight.svg';
$pagination.appendChild($arrowPrev);

const $selectedButton = document.createElement('button');
$selectedButton.className = 'pagination__button-selected';
$selectedButton.innerText = `${currentPage}`;

const $pageNumber = document.createElement('div');

const $button = document.createElement('button');
$button.className = 'pagination__button';
$button.innerText = `${currentPage + 1}`;
$button.addEventListener('click', () => next());

$pageNumber.appendChild($selectedButton);
$pageNumber.appendChild($button);
$pagination.appendChild($pageNumber);

const $arrowNext = document.createElement('img');
$arrowNext.className = 'arrowNext';
$arrowNext.src = 'img/arrowLeft.svg';

$pagination.appendChild($arrowNext);

$arrowPrev.addEventListener('click', () => prev());


const prev = () => {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
        changeRows();

        if (currentPage === 1) {
            $arrowPrev.style.transform = 'none';
            $arrowPrev.src = 'img/arrowRight.svg';
        }
        $arrowNext.src = 'img/arrowLeft.svg';
        $arrowNext.style.transform = 'none';
    }
};

$arrowNext.addEventListener('click', () => {
    next();
});

const next = () => {
    if (currentPage < Math.ceil(tasks.length / currentRowsPerPage)-1) {
        currentPage++;
        changePage(currentPage);
        changeRows();

        $arrowPrev.src = 'img/arrowLeft.svg';
        $arrowPrev.style.transform = 'rotate(180deg)';
    }
    else if (currentPage === Math.ceil(tasks.length / currentRowsPerPage)-1) {
        currentPage++;
        changePage(currentPage);
        changeRows();

        $arrowNext.src = 'img/arrowRight.svg';
        $arrowNext.style.transform = 'rotate(180deg)';
    }
    console.log(currentPage)
};

const changePage = (currentPage) => {
    $selectedButton.innerText = `${currentPage}`;
    $button.innerText = `${currentPage + 1}`;
    $button.style.opacity = '1';
    $button.style.cursor = 'pointer';

    if (currentPage > Math.ceil(tasks.length / currentRowsPerPage)-1) {
        $button.style.opacity = '0';
        $button.style.cursor = 'default';
    }
};
