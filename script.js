const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const itemFilter = document.querySelector('#filter');
const clearBtn = document.querySelector('#clear');

function addItem(e) {
	e.preventDefault();

	const newItem = itemInput.value;

	if(newItem === '') return alert('Please add an item');

	const li = document.createElement('li');
	const button = createButton('remove-item btn-link text-red');
	const i = createIcon('fa-solid fa-xmark'); 

	li.textContent = newItem; 
	li.appendChild(button);

	itemList.appendChild(li);

	itemInput.value = '';
	checkUI();
};

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;

	const icon = createIcon('fa-solid fa-xmark');

	button.appendChild(icon);

	return button;
};

function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
};

function removeItem(e) {
	if(e.target.parentElement.classList.contains('remove-item')) {
		if(confirm('Are you sure?')) e.target.parentElement.parentElement.remove();
	};	
	checkUI();
};

function clearItems() {
	while(itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	};
	checkUI();
};

function checkUI() {
	const items = itemList.querySelectorAll('li');
	if(items.length === 0) {
		itemFilter.style.display = 'none';
		clearBtn.style.display = 'none';
	} else {
		itemFilter.style.display = 'block';
		clearBtn.style.display = 'block';
	};
};

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
checkUI();


