const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const itemFilter = document.querySelector('#filter');
const clearBtn = document.querySelector('#clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
	const items = getItemsFromStorage();

	for(let i = 0; i < items.length; i++) {
		addItemToDOM(items[i]);	
	};
	checkUI();
};

function addItem(e) {
	e.preventDefault();

	const newItem = itemInput.value;

	if(newItem === '') return alert('Please add an item');

	if(checkIfItemExists(newItem)) {
		alert('Item already exists!');
		checkUI();
		return;
	};

	if(isEditMode) {
		const itemToEdit = itemList.querySelector('[data-edit="true"]');

		removeItemFromStorage(itemToEdit.textContent);
		itemToEdit.dataset.edit = 'false';
		itemToEdit.remove();
		isEditMode = false;
	};

	addItemToDOM(newItem);
	addItemToStorage(newItem);
};

function addItemToDOM(item) {
	const li = document.createElement('li');
	const button = createButton('remove-item btn-link text-red');
	const i = createIcon('fa-solid fa-xmark'); 

	li.textContent = item; 
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

function addItemToStorage(item) {
	const itemsFromStorage = getItemsFromStorage();	
	
	itemsFromStorage.push(item);

	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

function getItemsFromStorage() {
	let itemsFromStorage;

	if(localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	};

	return itemsFromStorage; 
};

function onClickItem(e) {
	if(e.target.parentElement.classList.contains('remove-item')) return removeItem(e);

	setItemToEdit(e.target);	
};

function checkIfItemExists(item) {
	const itemsFromStorage = getItemsFromStorage();

	return itemsFromStorage.includes(item);
};

function setItemToEdit(item) {
	isEditMode = true;
	allItems = itemList.querySelectorAll('li');
	for(let i = 0; i < allItems.length; i++) {
		allItems[i].style.backgroundColor = '';	
		allItems[i].dataset.edit = 'false';
	};
	item.style.backgroundColor = '#555';
	item.dataset.edit = 'true'
	formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item';
	formBtn.style.backgroundColor = '#2a2';
	itemInput.value = item.textContent;
};

function removeItem(e) {
	const element = e.target.parentElement.parentElement;

	if(confirm('Are you sure?')) {
		removeItemFromDOM(element);
		removeItemFromStorage(element.firstChild.textContent);
	};
	checkUI();
};

function removeItemFromDOM(item) {
	item.remove();
};

function removeItemFromStorage(itemToRemove) {
	const itemsFromStorage = getItemsFromStorage();
	const newItemsFromStorage = [];

	for(let i = 0; i < itemsFromStorage.length; i++) {
		const itemStored = itemsFromStorage[i];

		if(itemStored !== itemToRemove) newItemsFromStorage.push(itemStored); 
	};
	localStorage.setItem('items', JSON.stringify(newItemsFromStorage));
};

function clearItems() {
	if(confirm('Are you sure?')) {
		clearItemsFromDOM();
		clearItemsFromStorage();
		checkUI();

	};
};

function clearItemsFromDOM() {
	while(itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	};
};

function clearItemsFromStorage() {
	localStorage.removeItem('items');
};

function checkUI() {
	itemInput.value = '';

	const items = itemList.querySelectorAll('li');
	if(items.length === 0) {
		itemFilter.style.display = 'none';
		clearBtn.style.display = 'none';
	} else {
		itemFilter.style.display = 'block';
		clearBtn.style.display = 'block';
	};

	formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>  AddItem';
	formBtn.style.backgroundColor = '#333';
	isEditMode = false;
};

function filterItems(e) {
	const items = itemList.querySelectorAll('li');
	const text = e.target.value.toLowerCase();

	for(let i = 0; i < items.length; i++) {
		const itemName = items[i].firstChild.textContent.toLowerCase();

		if(itemName.indexOf(text) != -1) {
			items[i].style.display = 'flex';
		} else {
			items[i].style.display = 'none';
		};
	};
};

function init() {
	itemForm.addEventListener('submit', addItem);
	itemList.addEventListener('click', onClickItem);
	clearBtn.addEventListener('click', clearItems);
	itemFilter.addEventListener('input', filterItems);
	document.addEventListener('DOMContentLoaded', displayItems);

	checkUI();
};

init();

