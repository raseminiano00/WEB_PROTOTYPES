const suppliers = document.querySelector('.suppliers');
const newForm = document.querySelector('.new-form');
const newSupplierBtn = document.querySelector('.btn-new-supplier');
const newSupplierForm = document.querySelector('form');

const newSupplierCancelBtn = document.querySelector('.btn-new-supplier-cancel');

const API_URL = 'http://localhost:3000/supplier';

initPage();

async function newSupplierPostRequest(supplier){
    return await fetch(API_URL,{
        method:'POST',
        body:JSON.stringify(supplier),
        headers:{
            'content-type':'application/json'
        }
    })
}
function hideNewSupplierForm(){
    newSupplierBtn.style.display='';
    newForm.style.display='none';
}

function generateEditForm(){

}
function showNewSupplierForm(){
    newSupplierBtn.style.display='none';
    newForm.style.display='';
}
function addEventCancelEditButton(editForm,viewForm){
    const editSupplierCancelBtn = document.querySelector('.btn-edit-supplier-cancel');
    editSupplierCancelBtn.addEventListener('click',()=>{
        event.preventDefault();
        editForm.remove();
        console.log(viewForm);
        viewForm[0].style.display='';
        
        viewForm[1].style.display='';
    });
}
var editSupplierButton = async(supplierRow)=>{
    var supplierDataRow = [supplierRow.children[0],supplierRow.children[1]];
    supplierRow.children[0].style.display='none';
    supplierRow.children[1].style.display='none';
    var name =  supplierRow.children[0].querySelector('#name').textContent;
    var address =  supplierRow.children[0].querySelector('#address').textContent;
    address = address.substring(address.indexOf(': ')+1).trim();
    var editDiv = document.createElement('div');
    editDiv.classList.add('editSupplierForm');
    var addHtml=`
    <form class="edit-supplier-form-data" action="/supplier" method="PUT">
        <div class="form-group">
            <label for="name">Name</label>
            <input required type = "text" value="`+name+`" name="name" id="name" class="form-control">
        </div>
    
        <div class="form-group">
            <label for="address">Address</label>
            <textarea name="address" id="address" class="form-control">`+address+`</textarea>
        </div>
        <a href="" class="btn-edit-supplier-cancel btn btn-secondary">Cancel</a>
        <button type="submit" class="btn btn-primary" >Save</button>
    </form>`;
    editDiv.innerHTML = addHtml;
    supplierRow.insertBefore(editDiv,supplierRow.children[0]);
    addEventCancelEditButton(editDiv,supplierDataRow);
}
newForm.addEventListener('submit',async ()=>{
    event.preventDefault();
    console.log(newSupplierForm);
    const formData = new FormData(newSupplierForm);
    const newSupplier = {
        name : formData.get('name'),
        address : formData.get('address'),
    }
    const res = await newSupplierPostRequest();
    console.log(res);
    hideNewSupplierForm();
    listSuppliers(API_URL);
})
newSupplierCancelBtn.addEventListener('click',()=>{
    event.preventDefault();
    hideNewSupplierForm();
})
newSupplierBtn.addEventListener('click',()=>{
    event.preventDefault();
    showNewSupplierForm();
})

function initPage(){
    newForm.style.display='none';
    listSuppliers(API_URL);
}
async function listSuppliers(apiUrl){
    const fetchApi = await fetch(apiUrl);
    const res = await  fetchApi.json();
    suppliers.innerHTML='';
    updateNumberOfSuppliers(res.length);
    res.forEach(supplier => supplierToView(supplier));
}

function updateNumberOfSuppliers(number){
    var countMessage = document.createElement('p');
    countMessage.textContent = 'Number of Suppliers: ' +number;
    suppliers.appendChild(countMessage);
}
var supplierToView = (supplier )=> {

    const divCard = document.createElement('div');
    divCard.classList=('card mt-2');
    
    const divCardBody = document.createElement('div');
    divCard.classList=('card-body');
    
    const title = document.createElement('h3');
    title.classList = ('card-title');
    title.id='name';
    title.textContent = supplier.name;

    const dateAdded = document.createElement('p');
    dateAdded.classList = ('card-subtitle text-muted mb-2');
    dateAdded.textContent="Date Added: "+new Date(supplier.createdAt).toLocaleString('en-US', {
        weekday: 'short', // "Sat"
        month: 'long', // "June"
        day: '2-digit', // "01"
        year: 'numeric' // "2019"
      });
    const contents = document.createElement('p');
    contents.classList = ('card-text mb-2');
    contents.id='address';
    contents.textContent ="Address: "+ supplier.address;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList = ('editSupplierBtn btn btn-info');
    editButton.id = supplier.slug;
    editButton.addEventListener('click',() =>{
        var buttonClicked = event.target;
        editSupplierButton(buttonClicked.parentElement);
    });


    divCardBody.appendChild(title);
    divCardBody.appendChild(dateAdded);
    divCardBody.appendChild(contents);
    divCard.appendChild(divCardBody);
    divCard.appendChild(editButton);
    suppliers.appendChild(divCard);
};
