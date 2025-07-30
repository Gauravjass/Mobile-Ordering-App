
import menuArray from './data'

const container = document.getElementById('container');
const summary = document.getElementById('show-message')
const payment = document.getElementById('payment')

document.addEventListener('click', function(e){
    if(e.target.dataset.addItem){
        handleAddItemBtn(e.target.dataset.addItem)
    }
    if(e.target.dataset.remove){
    removeItem(e.target.dataset.remove)
    }
    if(e.target.dataset.complete){
         modal.style.display = 'inline'
    }   
})

payment.addEventListener('submit', function(e){
        e.preventDefault() 
        const paymentFormData = new FormData(payment)
        const name = paymentFormData.get('username') 
        summary.innerHTML = `
            <div class="message">
                <p>Thanks, ${name}! Your order is on its way! </p>
            </div>`
        modal.style.display = 'none'
})

let orderItems = []

function handleAddItemBtn(itemId){
    const targetItemObj =  menuArray.filter(function(menuItem){    
        return menuItem.id === Number(itemId)
    })[0]  
    if(targetItemObj){
        orderItems.push(targetItemObj);
        updateOrderSummary()
    } 
}
function updateOrderSummary(){  
    // Genereate fresh html
    const orderHtml = orderItems.map(item=> `      
            <div class="flex order-items" data-id=${item.id}>
                <div>
                    <div class="item">
                        <h2>${item.name}</h2>
                        <p role="button" class="remove-btn" data-remove = ${item.id} id="remove-btn">remove</p>
                    </div>
                </div>
                <p>$${item.price}</p>
            </div>`
    )
    const order =  document.getElementById('order')
    if(order){
   order.innerHTML = orderHtml
    }
    // update total
    
    const total = document.getElementById('total')
    if(total){
    const totalPrice = orderItems.reduce((total, currentItem) => total + currentItem.price, 0)
    total.innerHTML = `
        <h2>Total</h2>
        <p>$${totalPrice}</p>`
        
        document.getElementById('summary').classList.toggle('hide', orderItems.length === 0);
        }
}

function removeItem(itemId){ 
    orderItems = orderItems.filter(item => item.id !== Number(itemId));
    updateOrderSummary()
}
let disableBtn = ''
function getMenuItems(arrMenu){
    if(arrMenu)
    return arrMenu.map(item => 
               ` 
                    <section class="card">
                        <img src="../images/${item.image}" alt="an image of a pizza slice" />
                        <div class="flex">
                        <div>
                        <h2>${item.name}</h2>
                        <p class="ingredients">${item.ingredients.join(', ')}</p>
                        <p class="price">$${item.price}</p>
                        </div>
                    <i role="button" class= "fa-solid fa-circle-plus btnAdd add-btn" id="add-btn" data-add-item = "${item.id}" role="button" ></i>
                    </div>
                </section>
                `).join('')
               
    }
    
function render(){
    container.innerHTML =  getMenuItems(menuArray)
}
render()
