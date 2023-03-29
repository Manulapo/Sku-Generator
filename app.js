let input = document.getElementById('input');
let output = document.getElementById('result');
const startBtn = document.getElementById('start');
const copyBtn = document.getElementById('copy');
const reloadBtn = document.getElementById('reload');
const alertBox = document.getElementById('alert');
const select = document.getElementById('select');
const link = document.getElementById('link');

select.addEventListener('change', () => {
    const { option, entries } = getOptionValue();
    setOutput(option, entries);
});

reLoad();

copyBtn.addEventListener('click', copyAll);
reloadBtn.addEventListener('click', reLoad);

function getOptionValue() {
  return {
    option: select.value,
    entries: input.value.trim().split(' '),
  };
}

function setOutput(option,entries){
    if (option === 'skulist'){
        const result = `https://www.gamestop.it/SearchResult/QuickSearch?listSkus=${entries.toString()}`      
        //check before retunring value
        link.textContent = result;
    }else if(option === 'carousel'){
        let cardArray = [];
        entries.forEach(el =>{
            cardArray += '<div class="card" data-sku="'+ el +'"></div>';
        })
        //check before retunring value
        cardArray = cardArray.replaceAll('</div><div class="card" data-sku="">','');
        link.textContent = cardArray.toLocaleString()

    }else if(option === 'custom'){
        let cInput = `
        <form class="customForm">
            <div class="custom">
                <input type="text" placeholder="First section" id="fValue"> + SKU + <input type="text" placeholder="Second section" id="sValue">
            </div>  
            <input type="submit" value="Confirm" class="btn" id="customInputBtn">
        </form>`
        link.innerHTML = cInput;

        const confirmBtn = document.getElementById('customInputBtn');

        confirmBtn.addEventListener('click', (e) =>{
            e.preventDefault()
            const fValue = document.getElementById('fValue').value
            const sValue = document.getElementById('sValue').value
            if(input.value != '' && fValue != '' && sValue != ''){
                link.innerHTML = '';
                let cInputArray = [];
                entries.forEach(el =>{
                    cInputArray += fValue + el + sValue;
                })
                link.textContent = cInputArray.toLocaleString()
            }else{
                showAlert('Please fill all the fields', 'danger');
                setTimeout(showAlert,1500);
            }

        })
    }else{
        reLoad();
    }
}

function disable(el,check){
    if(!check){
        el.style.pointerEvents = 'none';
        el.style.opacity = .5;
    }else{
        el.style.pointerEvents = 'auto';
        el.style.opacity = 1; 
    }
}

function copyAll() {
    let first = link.textContent;
    let second = document.getElementById('result').textContent;
    let full = first + second;
    navigator.clipboard.writeText(full);
    showAlert('Link copied in your clipboard', 'succeed');
    setTimeout(showAlert,1500);
}

function reLoad() {
    output.textContent ='';
    input.value='';
    link.innerHTML = '';
    link.innerHTML = 'Select a Format';
    select.querySelector('[value = "select"]').selected = true;
}

function showAlert(text,property){
    alertBox.textContent = text;
    alertBox.classList.add(property)
    alertBox.id = property;
    alertBox.classList.toggle("active");
}

