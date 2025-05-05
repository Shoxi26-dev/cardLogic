import { arr } from "./db.js";

let place = document.querySelector(".slots");
let cartTh = document.querySelector('#openModalBtn')
let modal = document.querySelector('#modalBackground')
let close = document.querySelector('#closeModalBtn')
let modal_box = document.querySelector('.modal_box')
let total = document.querySelector('#price')
let show5 = document.querySelector('#show_five')
let show_all = document.querySelector('#show_all')
let in_pocket = document.querySelector('#in_pocket')

let cart = []

function render(arr) {
	place.innerHTML = ''
	for (let item of arr) {
		let slot = document.createElement("div");
		let photo = document.createElement("div");
		let img = document.createElement("img");
		let descr = document.createElement("div");
		let slotName = document.createElement("h3");
		let p = document.createElement("p");
		let icons = document.createElement("div");
		let price = document.createElement("div");
		let priceImg = document.createElement("img");
		let star = document.createElement("div");
		let starImg = document.createElement("img");
		let pack = document.createElement("div");
		let packImg = document.createElement("img");
		let button = document.createElement("button");
		// b

		slot.classList.add("slot");
		photo.classList.add("photo");
		descr.classList.add("descr");
		slotName.classList.add("slot-name");
		p.classList.add("descr-p");
		icons.classList.add("icons");
		button.classList.add("to-star");

		place.append(slot);
		slot.append(photo);
		photo.append(img);
		img.src = item.image;
		slot.append(descr);
		descr.append(slotName, p, icons, button);
		slotName.innerHTML = item.category;
		p.innerHTML = item.description;
		icons.append(price, star, pack);
		price.append(priceImg, item.price);
		priceImg.src = "./img/dollar.svg";
		star.append(starImg, item.rating.rate);
		starImg.src = "./img/star.svg";
		pack.append(packImg, item.rating.count);
		packImg.src = "./img/box.svg";
		button.innerHTML = "В избранное";

		button.onclick = () => {
			let cartI = true
			for (let elem of cart) {
				if (elem.id == item.id) {
					cartI = false


				}
			}
			if (cartI == true) {

				cart.push(item);
				renderCart(cart)
				totalNew()

				in_pocket.textContent = cart.length
				console.log(cart.length);
				console.log(in_pocket);
			}


		}
		cartTh.onclick = () => {
			modal.style.display = 'block'
		}
		close.onclick = () => {
			modal.style.display = 'none'
		}
	}
}

show5.onclick = () => {
	render(arr.slice(0, 5))
}
show_all.onclick = () => {
	render(arr)
}

function renderCart(cart) {
	modal_box.innerHTML = ''
	for (let item of cart) {

		let elem = document.createElement('div')
		let elem_box = document.createElement('div')
		let img_elem = document.createElement('img')
		let span_elem = document.createElement('span')
		let price = document.createElement('span')
		let elem_box2 = document.createElement('div')
		let btn_elem_pls = document.createElement('button')
		let count = document.createElement('span')
		let btn_elem_mns = document.createElement('button')
		elem.classList = 'elem'
		elem_box.classList = 'elem_box'
		img_elem.src = item.image
		span_elem.textContent = item.category
		span_elem.classList = 'name'
		elem_box2.classList = 'elem_box'
		btn_elem_pls.textContent = '+'
		count.textContent = 1
		count.classList = 'count'
		price.textContent = item.price
		price.classList = 'price'
		btn_elem_mns.textContent = '-'
		modal_box.append(elem)
		elem.append(elem_box, elem_box2)
		elem_box.append(img_elem, span_elem, price)
		elem_box2.append(btn_elem_pls, count, btn_elem_mns)

		btn_elem_pls.onclick = () => {
			count.textContent++

			price.textContent = (item.price * count.textContent).toFixed(2);
			totalNew()

		}
		btn_elem_mns.onclick = () => {
			if (count.textContent >= 1) {
				count.textContent--

				price.textContent = (item.price * count.textContent).toFixed(2);
				totalNew()

			}


		}


	}
}

function totalNew() {
	let totalNum = 0;

	let elems = modal_box.querySelectorAll('.elem');
	elems.forEach(elem => {
		let price = parseFloat(elem.querySelector('.price').textContent);
		totalNum += price;
	});

	total.textContent = totalNum.toFixed(2) + " $";

}





render(arr);
totalNew()