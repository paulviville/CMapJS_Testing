import { test } from '../test.js';
import Attribute from '../../CMapJS/CMap/Attribute.js';


let nb = 0;
test(`${nb++} Attribute::constructor default`, function() {
    const attribute = new Attribute();
    this.assertEq(attribute.name, "");
    this.assertEq(attribute.length, 0);
});

test(`${nb++} Attribute::constructor`, function() {
    const attribute = new Attribute("test", 10);
    this.assertEq(attribute.name, "test");
    this.assertEq(attribute.length, 10);
});

test(`${nb++} Attribute::resize`, function() {
    const attribute = new Attribute("test", 10);
    this.assertEq(attribute.length, 10);

	attribute.resize(20);
    this.assertEq(attribute.length, 20);
});

test(`${nb++} Attribute::delete`, function() {
    const attribute = new Attribute("test", 10);
	attribute.delete();
	this.assertEq(attribute.length, 0);
    this.assertEq(attribute.name, undefined);
});