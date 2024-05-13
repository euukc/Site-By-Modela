// Rolagem do menu para as Sections
const menu = document.querySelector('.menu-itens');
const itensMenu = menu.querySelectorAll('.item');

itensMenu.forEach((item) => {
    item.addEventListener('click', () => {
        const buscarIdAlvoRolagem = item.getAttribute('data-target'); //busca pelo atributo
        const targetSection = document.getElementById(buscarIdAlvoRolagem);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    });
});


// Clicar no "faça seu pedido"

const btnVerCatalogo = document.querySelector('#botao-fazer-pedidos');
const sectionCatalogo = document.querySelector('.catalogo');

btnVerCatalogo.addEventListener('click', () => {
    sectionCatalogo.scrollIntoView({ behavior: 'smooth', block: 'start' })
});





// Overlay para verificar todos os produtos de cada seção

var itensCatalogo = document.querySelectorAll('.item-catalogo');


itensCatalogo.forEach(item => {
    item.addEventListener('click', () => {
        const categoria = item.dataset.categoria;
        const overlay = document.getElementById(categoria);
        overlay.style.display = 'block';

        // Adiciona uma classe ao corpo da página para impedir a rolagem
        document.body.classList.add('no-scroll');

        document.querySelector('.background').style.display = 'block';
    });
});

var closeBtn = document.querySelectorAll('.closeBtn');

closeBtn.forEach(button => {
    button.addEventListener('click', () => {
        const overlay = button.closest('.overlay1, .overlay2, .overlay3, .overlay4');

        overlay.style.display = 'none';
        document.querySelector('.background').style.display = 'none';
        document.body.classList.remove('no-scroll');
    });
});


// Scroll Carrinho de Compras
var scrollToTopBtn = document.getElementById('scrollToTopBtn');

document.addEventListener('scroll', function () {
    window.addEventListener('scroll', function () {
        if (window.scrollY > window.innerHeight / 2) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });


});

// Abrir e Fechar o carrinho de compras

var scrollToTopBtn = document.getElementById('scrollToTopBtn');
const modalCarrinho = document.getElementById('cart-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const abrirCarrinhoOverlay = document.querySelectorAll('.cartOverlay');


scrollToTopBtn.addEventListener('click', () => {
    atualizarCarrinho();
    modalCarrinho.style.display = 'flex';
});

abrirCarrinhoOverlay.forEach(carrinho => {
    carrinho.addEventListener('click', () => {
        atualizarCarrinho();
        modalCarrinho.style.display = 'flex';
    });
});

closeModalBtn.addEventListener('click', () => {
    modalCarrinho.style.display = 'none';
});



// Configs dentro do Checkout

const catalogo = document.getElementsByClassName('catalogo');
const itensCarrinho = document.getElementById('cart-items');
const valorTotal = document.getElementById('cart-total');
const btnFinalizarPedido = document.getElementById('checkout-btn');
const verCarrinhoMenu = document.querySelector('.carrinho-compras');
const produtos = document.querySelector('.produtos-item');
const adicionarCarrinho = document.getElementById('add-carrinho');
const contadorCarrinho = document.querySelector('.contador-carrinho');
const modalCheckout = document.querySelector('#cart-checkout');

let carrinho = [];

verCarrinhoMenu.addEventListener('click', () => {
    modalCarrinho.style.display = 'flex';
});

modalCarrinho.addEventListener('click', function (event) {
    if (event.target === modalCarrinho) {
        modalCarrinho.style.display = 'none';
    };
});

const botoesAdicionar = document.querySelectorAll('.add-carrinho');

botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', function (event) {
        const name = botao.getAttribute('data-name');
        const price = parseFloat(botao.getAttribute('data-price'));

        addToCart(name, price);

    });
});

function addToCart(name, price) {

    const existeItem = carrinho.find(item => item.name === name)

    if (existeItem) {
        existeItem.quantidade = 1; // garante que não soma mais de um, caso o usuário clique novamente

    } else {
        carrinho.push({
            name,
            price,
            quantidade: 1,
        });
    }

    atualizarCarrinho();
};

// Atualizar o carrinho

function atualizarCarrinho() {
    itensCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const carrinhoItemElemento = document.createElement('div');

        carrinhoItemElemento.innerHTML = `
            <div class= "flex items-center justify-between">
                <div>
                    <p> ${item.name} </p>
                    <p class="font-medium"> Quantidade: ${item.quantidade} </p>
                    <p class="font-medium mt-2"> R$ ${item.price.toFixed(2)} </p>
            
                </div>
                
                    <button class ="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                    </button>
                
            
            </div>
        `

        total += item.price * item.quantidade;


        itensCarrinho.appendChild(carrinhoItemElemento);
    });

    valorTotal.textContent = total.toLocaleString("pt-BR", {
        style: 'currency',
        currency: "BRL"
    });

};

//função para remover o item do carrinho
itensCarrinho.addEventListener('click', function (event) {
    if (event.target.classList.contains = ("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
});

function removeItemCart(name) {
    const index = carrinho.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = carrinho[index];

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();
}

// finalizar o pedido com o QRCODE

//modalCheckout

const closeBtnCheckout = document.querySelector('#close-btn-checkout');

btnFinalizarPedido.addEventListener('click', () => {
    modalCarrinho.style.display = 'none';
    modalCheckout.style.display = 'flex';

});

closeBtnCheckout.addEventListener('click', () => {
    modalCheckout.style.display = 'none';
})
























