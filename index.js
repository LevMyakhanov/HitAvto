let carPrices = [4700, 14900, 11700];
let truckPrices = [11200, 26500, 13500];
let prices = carPrices.concat(truckPrices);

let calculatorRanges= document.querySelectorAll('.calculator-range');
let calculatorRangeReds = document.querySelectorAll('.calculator-range-red');
let profitValues = document.querySelectorAll('.profit-value');

for (let i = 0; i < calculatorRanges.length; i++) {
    calculatorRanges[i].oninput = function(){
        let calculatorRange = calculatorRanges[i];
        width = ((calculatorRange.value - calculatorRange.min)/(calculatorRange.max-calculatorRange.min))*100 + "%";
        calculatorRangeReds[i].style.width = width;
        if(i<3) {
            profitValues[0].textContent = 0;
            for(let j = 0; j < 3; j++)
                profitValues[0].textContent = +profitValues[0].textContent + prices[j]*calculatorRanges[j].value;
            profitValues[0].textContent = Math.ceil(+profitValues[0].textContent * 0.170);
        } else {
            profitValues[1].textContent = 0;
            for(let j = 3; j < calculatorRanges.length; j++)
                profitValues[1].textContent = +profitValues[1].textContent + prices[j]*calculatorRanges[j].value;
            profitValues[1].textContent = Math.ceil(+profitValues[1].textContent * 0.177);
        }
    }
}

// modals
document.addEventListener('DOMContentLoaded', function() {
    let modalPolice = document.querySelector('#police');
    let modalPoliceCaller = document.querySelectorAll('.js-modal-police-call');
    [].forEach.call( modalPoliceCaller, function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('html__modal-open');
            // document.documentElement.classList.add('html__modal-open');
            modalPolice.classList.add('active');
        });
    });
    modalPolice.querySelector('.fancybox-close-small').addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.remove('html__modal-open');
        // document.documentElement.classList.remove('html__modal-open');
        modalPolice.classList.remove('active');
    });
    let modal = document.querySelector('#modal');
    modal.querySelector('.fancybox-close-small').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('active');
        document.body.classList.remove('html__modal-open');
        // document.documentElement.classList.remove('html__modal-open');
    });
    document.querySelector('.sidebar-overlay').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('active');
        modalPolice.classList.remove('active');
        document.body.classList.remove('html__modal-open');
        // document.documentElement.classList.remove('html__modal-open');
    });
    [].forEach.call( document.querySelectorAll('.js-modal-call'), function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            modal.querySelector('.h3__title').textContent = el.getAttribute('title');
            modal.querySelector('.header-form__button-text').textContent = el.getAttribute('data-btn-text');
            document.body.classList.add('html__modal-open');
            // document.documentElement.classList.add('html__modal-open');
            modal.classList.add('active');
        })
    });
});
// sidebar-overlay

// document.addEventListener('DOMContentLoaded', function() {
//     $("input[name=phone]").inputmask({
//         "mask": "+ 9 (999) 999-9999",
//         showMaskOnHover: false,
//         "oncomplete": function(){
//           var value = $(this).val();
//           $(this).val(value.replace(/(\+)(\s|)(8)/g,"$1$1"+7))
//         }
//     });
// });

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('input[name=phone]'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = "";
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });
});