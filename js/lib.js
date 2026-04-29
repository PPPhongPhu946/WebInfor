const productList = [
	{ id: "001", name: "Đại Bàng Sa Mạc", price: 500, description: "Bạn có muốn nuôi đại bàng ngay hôm nay?", image: "../assets/images/DBSM.jpg", link: "https://example.com" },
	{ id: "002", name: "Trăn Nam Mỹ", price: 300, description: "Annaconda là một loài trăn lớn sống ở Nam Mỹ.", image: "../assets/images/TNM.jpg", link: "https://example.com" },
	{ id: "003", name: "Bọ Cạp Tiệp Khác", price: 100, description: "Một con bọ cạp nhỏ mang nọc độc chết người.", image: "../assets/images/BCTK.jpg", link: "https://example.com" }
];

let currentIndex = 0;

function createProductCard(product) {
	const myDiv = document.createElement("div");
	myDiv.setAttribute("class", "product-item");

	const myDiv1 = document.createElement("div");
	myDiv1.setAttribute("class", "product-image");
	const productImg = document.createElement("img");
	productImg.setAttribute("src", product.image);
	productImg.setAttribute("alt", product.name);
	myDiv1.appendChild(productImg);
	myDiv.appendChild(myDiv1);

	// para1 directly under the image
	const productpara1 = document.createElement("p");
	productpara1.textContent = product.name;
	myDiv.appendChild(productpara1);

	const myDiv2 = document.createElement("div");
	myDiv2.setAttribute("class", "product-info");

	const productTitle = document.createElement("h2");
	productTitle.textContent = product.name;
	myDiv2.appendChild(productTitle);

	const productpara2 = document.createElement("p");
	productpara2.textContent = product.description;
	myDiv2.appendChild(productpara2);

	const productlink = document.createElement("a");
	productlink.setAttribute("href", product.link);
	productlink.textContent = "Link Mua Hàng";
	myDiv2.appendChild(productlink);

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Xóa sản phẩm";
	deleteButton.addEventListener("click", function () {
		myDiv.remove();
	});
	myDiv2.appendChild(deleteButton);

	myDiv.appendChild(myDiv2);
	return myDiv;
}

function addProduct() {
	if (currentIndex >= productList.length) {
		alert('Không còn sản phẩm để thêm');
		return;
	}
	const prod = productList[currentIndex++];
	const card = createProductCard(prod);
	document.body.appendChild(card);
}