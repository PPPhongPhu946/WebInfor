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

    const showButton = document.createElement("button");
    showButton.textContent = "Xem chi tiết";
    showButton.addEventListener("click", function () {
        showProductModal(product);
    });
    myDiv2.appendChild(showButton);

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
	const container = document.getElementById('products-area');
	if (container) container.appendChild(card);
	else document.body.appendChild(card);
}

// === Course management for page6 ===
function _escapeHTML(str) {
	return String(str).replace(/[&<>"]/g, function (s) {
		return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[s];
	});
}

function getCourses() {
	try {
		return JSON.parse(localStorage.getItem('courses') || '[]');
	} catch (e) {
		return [];
	}
}

function saveCourses(courses) {
	localStorage.setItem('courses', JSON.stringify(courses));
}

function renderCourses() {
	const listEl = document.getElementById('courses-list');
	if (!listEl) return;
	const courses = getCourses();
	listEl.innerHTML = '';
	let total = 0;
	courses.forEach(c => {
		const li = document.createElement('li');
		const title = document.createElement('span');
		title.textContent = _escapeHTML(c.name) + ' - ' + c.credits + ' tín chỉ';
		li.appendChild(title);

		const btn = document.createElement('button');
		btn.textContent = 'Xóa';
		btn.className = 'delete-btn';
		btn.addEventListener('click', function () { deleteCourse(c.id); });
		li.appendChild(btn);

		listEl.appendChild(li);
		total += Number(c.credits || 0);
	});
	const totalEl = document.getElementById('total-credits');
	if (totalEl) totalEl.textContent = total;
}

function addCourseFromForm(evt) {
	evt.preventDefault();
	const nameEl = document.getElementById('course-name');
	const creditsEl = document.getElementById('course-credits');
	if (!nameEl || !creditsEl) return;
	const name = nameEl.value.trim();
	const credits = Number(creditsEl.value);
	if (!name || isNaN(credits) || credits < 0) {
		alert('Vui lòng nhập tên môn học và số tín chỉ hợp lệ');
		return;
	}
	const courses = getCourses();
	courses.push({ id: Date.now().toString(), name: name, credits: credits });
	saveCourses(courses);
	renderCourses();
	evt.target.reset();
}

function deleteCourse(id) {
	const courses = getCourses().filter(c => c.id !== id);
	saveCourses(courses);
	renderCourses();
}

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('course-form');
	if (form) {
		form.addEventListener('submit', addCourseFromForm);
		renderCourses();
	}
	// attach modal controls for product details if present
	const modal = document.getElementById('product-modal');
	if (modal) {
		const closeBtn = document.getElementById('product-modal-close');
		closeBtn && closeBtn.addEventListener('click', () => { modal.classList.add('hidden'); });
		modal.addEventListener('click', (e) => {
			if (e.target === modal) modal.classList.add('hidden');
		});
	}
});

function showProductModal(product) {
	const modal = document.getElementById('product-modal');
	if (!modal) return;
	const img = document.getElementById('modal-image');
	const title = document.getElementById('modal-title');
	const desc = document.getElementById('modal-desc');
	const meta = document.getElementById('modal-meta');
	const link = document.getElementById('modal-link');
	if (img) img.src = product.image || '';
	if (img) img.alt = product.name || '';
	if (title) title.textContent = product.name || '';
	if (desc) desc.textContent = product.description || '';
	if (meta) meta.textContent = 'Giá: ' + (product.price != null ? product.price + ' VNĐ' : 'N/A');
	if (link) {
		link.href = product.link || '#';
		link.textContent = product.link ? 'Mua hàng / Xem thêm' : 'Không có liên kết';
	}
	modal.classList.remove('hidden');
}