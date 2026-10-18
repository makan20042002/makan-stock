import test from 'node:test';import assert from 'node:assert/strict';import {parseCSV,csv,esc,date,prefs} from '../dist/ui.mjs';
test('CSV handles Persian, quoted commas, multiline and escaped quotes',()=>{let rows=[['sku','name'],['X','کالای تست، "ویژه"'],['Y','line 1\nline 2,extra']];assert.deepEqual(parseCSV(csv(rows)),rows);assert.throws(()=>parseCSV('a,"unclosed'))});
test('CSV neutralizes formula strings but keeps numeric negative quantities',()=>{let rows=parseCSV(csv([['=HYPERLINK("x")',-5,'+cmd']]));assert.equal(rows[0][0][0],"'");assert.equal(rows[0][1],'-5');assert.equal(rows[0][2],"'+cmd")});
test('HTML output escapes user supplied text',()=>assert.equal(esc('<img src=x onerror="x">'),'&lt;img src=x onerror=&quot;x&quot;&gt;'));
test('Gregorian and Solar Hijri display the same date',()=>{prefs.lang='en';prefs.calendar='gregory';assert.match(date('2026-03-21'),/2026/);prefs.calendar='persian';assert.match(date('2026-03-21'),/1405/)});
