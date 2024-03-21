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

	this.assertEq(attribute0.name, "name0");
	this.assertEq(attribute1.name, "name1");
});


test(`${nb++} AttributeContainer::removeAttribute`, function() {
	const attributeContainer = new AttributeContainer();
});

// test(`${nb++} AttributeContainer::`, function() {
// 	const attributeContainer = new AttributeContainer();
// });
