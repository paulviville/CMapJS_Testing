import { test } from '../test.js';
import AttributeContainer from "../../CMapJS/CMap/AttributeContainer.js";

let nb = 0;
test(`${nb++} AttributeContainer::constructor`, function() {
	const attributeContainer = new AttributeContainer();
	this.assertEq(attributeContainer.nbAttributes, 1);
	this.assertEq(attributeContainer.nbElements, 0);
});

test(`${nb++} AttributeContainer::addAttribute`, function() {
	const attributeContainer = new AttributeContainer();
	
	const attribute0 = attributeContainer.addAttribute("name");

	this.assertEq(attributeContainer.nbAttributes, 2);
	this.assertEq(attribute0.name, "name")

	const attribute1 = attributeContainer.addAttribute("name");

	this.assertEq(attributeContainer.nbAttributes, 3);
	this.assertEq(attribute1.name, "name_")

	this.assertEq(attributeContainer.nbElements, 0);
});

test(`${nb++} AttributeContainer::getAttribute`, function() {
	const attributeContainer = new AttributeContainer();
	
	attributeContainer.addAttribute("name0");
	attributeContainer.addAttribute("name1");
	
	const attribute0 = attributeContainer.getAttribute("name0");
	const attribute1 = attributeContainer.getAttribute("name1");
	const attribute2 = attributeContainer.getAttribute("name1");

	this.assertEq(attribute0.name, "name0");
	this.assertEq(attribute1.name, "name1");
	this.assertEq(attribute2.name, "name1");
});

test(`${nb++} AttributeContainer::getOrAddAttribute`, function() {
	const attributeContainer = new AttributeContainer();
	
	attributeContainer.addAttribute("name0");	
	const attribute0 = attributeContainer.getOrAddAttribute("name0");
	const attribute1 = attributeContainer.getOrAddAttribute("name1");

	this.assertEq(attribute0.name, "name0");
	this.assertEq(attribute1.name, "name1");
	this.assertEq(attributeContainer.nbAttributes, 3);
});


test(`${nb++} AttributeContainer::removeAttribute`, function() {
	const attributeContainer = new AttributeContainer();
	const attribute0 = attributeContainer.addAttribute("name0");
	const attribute1 = attributeContainer.addAttribute("name1");

	this.assertEq(attributeContainer.nbAttributes, 3);

	attributeContainer.removeAttribute(attribute0);
	this.assertEq(attributeContainer.nbAttributes, 2);

	attributeContainer.removeAttribute(attribute1);
	this.assertEq(attributeContainer.nbAttributes, 1);

	this.assertFalse(attributeContainer.getAttribute("name0"));
	this.assertFalse(attributeContainer.getAttribute("name1"));

	const attribute2 = attributeContainer.addAttribute("name0");
	this.assertEq(attribute2.name, "name0");
});

test(`${nb++} AttributeContainer::newElement`, function() {
	const attributeContainer = new AttributeContainer();
	this.assertEq(attributeContainer.nbElements, 0);
	const elem0 = attributeContainer.newElement();
	this.assertEq(attributeContainer.nbElements, 1);
	this.assertEq(elem0, 0);

	const elem1 = attributeContainer.newElement();
	this.assertEq(attributeContainer.nbElements, 2);
	this.assertEq(elem1, 1);

	const elem2 = attributeContainer.newElement();
	this.assertEq(attributeContainer.nbElements, 3);
	this.assertEq(elem2, 2);

});

test(`${nb++} AttributeContainer::deleteElement`, function() {
	const attributeContainer = new AttributeContainer();

	this.assertEq(attributeContainer.nbElements, 0);
	const elem0 = attributeContainer.newElement();
	const elem1 = attributeContainer.newElement();
	const elem2 = attributeContainer.newElement();

	attributeContainer.deleteElement(elem0);
	this.assertEq(attributeContainer.nbElements, 2);

	attributeContainer.deleteElement(elem0);
	this.assertEq(attributeContainer.nbElements, 2);

	attributeContainer.deleteElement(elem1);
	this.assertEq(attributeContainer.nbElements, 1);

	attributeContainer.deleteElement(elem2);
	this.assertEq(attributeContainer.nbElements, 0);
});

test(`${nb++} AttributeContainer::newElement index reuse`, function() {
	const attributeContainer = new AttributeContainer();

	const elem0 = attributeContainer.newElement();
	const elem1 = attributeContainer.newElement();
	const elem2 = attributeContainer.newElement();

	attributeContainer.deleteElement(elem0);
	this.assertEq(attributeContainer.newElement(), elem0);
	attributeContainer.deleteElement(elem2);
	this.assertEq(attributeContainer.newElement(), elem2);
	this.assertEq(attributeContainer.newElement(), 3);

});

test(`${nb++} AttributeContainer::resize`, function() {
	const attributeContainer = new AttributeContainer();
	const attribute0 = attributeContainer.addAttribute("name");

	this.assertEq(attribute0.length, 100);

	for(let i = 0; i < 100; ++i)
		attributeContainer.newElement();

	this.assertEq(attribute0.length, 200);
	this.assertEq(attributeContainer.newElement(), 100);

});

test(`${nb++} AttributeContainer::clear`, function() {
	const attributeContainer = new AttributeContainer();
	attributeContainer.addAttribute("name0");
	attributeContainer.addAttribute("name1");

	for(let i = 0; i < 100; ++i)
		attributeContainer.newElement();

	attributeContainer.clear();

	this.assertEq(attributeContainer.nbAttributes, 1);
	this.assertEq(attributeContainer.nbElements, 0);
	this.assertEq(attributeContainer.newElement(), 0);

	const attribute0 = attributeContainer.addAttribute("name0");
	this.assertEq(attribute0.name, "name0");
});

test(`${nb++} AttributeContainer::ref && unref`, function() {
	const attributeContainer = new AttributeContainer();

	const elem0 = attributeContainer.newElement();
	const elem1 = attributeContainer.newElement();

	attributeContainer.ref(elem0);
	attributeContainer.unref(elem0);

	this.assertEq(attributeContainer.nbElements, 1);

	const elem2 = attributeContainer.newElement();

	this.assertEq(elem0, elem2);
});


test(`${nb++} AttributeContainer::*elements`, function() {
	const attributeContainer = new AttributeContainer();

	const elem0 = attributeContainer.newElement();
	const elem1 = attributeContainer.newElement();
	const elem2 = attributeContainer.newElement();
	const elem3 = attributeContainer.newElement();
	const elem4 = attributeContainer.newElement();

	attributeContainer.deleteElement(elem2);

	const elems = [elem0, elem1, elem3, elem4];

	const generator = attributeContainer.elements();
	for(let i = 0; i < elems.length; ++i) { 
		this.assertEq(elems[i], generator.next().value);
	}
});

test(`${nb++} AttributeContainer::forEach`, function() {
	const attributeContainer = new AttributeContainer();

	const elem0 = attributeContainer.newElement();
	const elem1 = attributeContainer.newElement();
	const elem2 = attributeContainer.newElement();
	const elem3 = attributeContainer.newElement();
	const elem4 = attributeContainer.newElement();

	attributeContainer.deleteElement(elem2);

	const elems = [elem0, elem1, elem3, elem4];

	attributeContainer.forEach(elem => {
		this.assertEq(elems.shift(), elem);
	});
	
});

test(`${nb++} AttributeContainer::forEach interruption`, function() {
	const attributeContainer = new AttributeContainer();

	const elem0 = attributeContainer.newElement();
	const elem1 = attributeContainer.newElement();
	const elem2 = attributeContainer.newElement();
	const elem3 = attributeContainer.newElement();
	const elem4 = attributeContainer.newElement();

	let last = 0;
	attributeContainer.forEach(elem => {
		last = elem;
		return elem == elem2;
	});
	this.assertEq(last, elem2);
});