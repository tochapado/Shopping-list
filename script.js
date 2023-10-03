const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

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
};

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;

	const icon = createIcon('fa-solid fa-xmark');

	button.appendChild(icon);

	return button;
};

function createIcon(classes) {
	const i = document.createElement('i');
	i.className = classes;
	return i;
};

itemForm.addEventListener('submit', addItem);
