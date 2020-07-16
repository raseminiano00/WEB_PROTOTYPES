if(document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded',ready);
}
getData();
async function getData(){
    const response = await fetch('test.csv');
    const data = await response.text();
    console.log(data);  
}