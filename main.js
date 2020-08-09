document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let call = false;
    let totalCalls = 1;
    let idInterval = null;
    let time = 1;
    let durationCalls = [];
    let btn = document.getElementById('btn');
    let btnLoadData = document.getElementById('btn_load');
    let btnClearData = document.getElementById('btn_clear');
    let managed = document.getElementById('managed');
    let avarangecall = document.getElementById('avarangecall');
    let durationcall = document.getElementById('durationcall');
    let listCalls = document.getElementById("listcalls");

    btn.addEventListener('click', (e) => {
        if (call === true) {
            e.target.style.backgroundColor = "darkgreen";
            e.target.innerHTML = "<i class='fas fa-phone-volume'></i> Start Call";

            if (localStorage.getItem('managed') != 0) {
                managed.textContent = localStorage.getItem('managed');
                managed.textContent++;
                totalCalls++;
            } else {
                managed.textContent = totalCalls++;
            }
            // calc avarange time calls
            avarange();
            // set local data
            setData();
            // clear timer
            clearInterval(idInterval);
            time = 1;
            call = false;
        } else {
            e.target.style.backgroundColor = "darkred";
            e.target.innerHTML = "<i class='fas fa-phone-slash'></i> Stop Call";
            timer();
            call = true;
        }

    });

    function setData() {
        localStorage.setItem('managed', managed.textContent);
        localStorage.setItem('avarangecall', avarangecall.textContent);
        localStorage.setItem('durationcall', durationcall.textContent);
        localStorage.setItem('durationCalls', durationCalls);
    }

    function timer() {
        idInterval = setInterval(() => {
            durationcall.textContent = time++ + ' sec.';
        }, 1000);
    }

    function avarange() {
        const sum = (total, value) => total + value;
        durationCalls.unshift(time - 1);
        avarangecall.textContent = (durationCalls.reduce(sum) / +managed.textContent).toFixed(2) + ' sec.';
        // add time to list
        let p = document.createElement('P');
        let textP = document.createTextNode(time - 1 + ' sec.');
        p.appendChild(textP);
        listCalls.prepend(p);
    }

    btnLoadData.addEventListener('click', fload);
    btnClearData.addEventListener('click', fclear);

    function fload() {
        managed.textContent = localStorage.getItem('managed');
        avarangecall.textContent = localStorage.getItem('avarangecall');
        durationcall.textContent = localStorage.getItem('durationcall');
        durationCalls = localStorage.getItem('durationCalls').split(',').map(Number);
        console.log(durationCalls);
        while (listCalls.firstChild) {
            listCalls.firstChild.remove();
        }
        for (let i = 0; i < durationCalls.length; i++) {
            // add time to list
            let p = document.createElement('P');
            let textP = document.createTextNode(durationCalls[i] + ' sec.');
            p.appendChild(textP);
            listCalls.appendChild(p);
        }
    }

    function fclear() {
        localStorage.setItem('managed', 0);
        localStorage.setItem('avarangecall', 0);
        localStorage.setItem('durationcall', 0);
        localStorage.removeItem('durationCalls');
        managed.textContent = 0;
        avarangecall.textContent = 0;
        durationcall.textContent = 0;
        durationCalls = [];
        totalCalls = 1;
        while (listCalls.firstChild) {
            listCalls.firstChild.remove();
        }
    }

});