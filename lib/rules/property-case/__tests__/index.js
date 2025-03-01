'use strict';

const { messages, ruleName } = require('..');

testRule({
	ruleName,
	config: ['lower'],
	fix: true,

	accept: [
		{
			code: 'a { }',
		},
		{
			code: 'a { display: block; }',
		},
		{
			code: 'a { border-radius: 8px; }',
		},
		{
			code: 'a:hover { display: block; }',
		},
		{
			code: 'a:focus { display: block; }',
		},
		{
			code: 'a:other { display: block; }',
		},
		{
			code: 'a::before { display: block; }',
		},
		{
			code: 'a::other { display: block; }',
		},
		{
			code: ':root { --custom-property-set: {} }',
		},
		{
			code: ':root { --custom-property-name: red; }',
		},
		{
			code: ':root { --custom-PropertyName: red; }',
		},
		{
			code: 'a { -webkit-animation-duration: 3s; }',
		},
		{
			code: '@media screen and (orientation: landscape) { width: 500px; }',
		},
		{
			code: 'a { property: value; }',
			description: 'non-standard property',
		},
	],

	reject: [
		{
			code: 'a { Display: block; }',
			fixed: 'a { display: block; }',
			message: messages.expected('Display', 'display'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 12,
		},
		{
			code: 'a { DisplaY: block; }',
			fixed: 'a { display: block; }',
			message: messages.expected('DisplaY', 'display'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 12,
		},
		{
			code: 'a { DISPLAY: block; }',
			fixed: 'a { display: block; }',
			message: messages.expected('DISPLAY', 'display'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 12,
		},
		{
			code: 'a { border-Radius: block; }',
			fixed: 'a { border-radius: block; }',
			message: messages.expected('border-Radius', 'border-radius'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a { border-RADIUS: block; }',
			fixed: 'a { border-radius: block; }',
			message: messages.expected('border-RADIUS', 'border-radius'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a { BORDER-radius: block; }',
			fixed: 'a { border-radius: block; }',
			message: messages.expected('BORDER-radius', 'border-radius'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a { BORDER-RADIUS: block; }',
			fixed: 'a { border-radius: block; }',
			message: messages.expected('BORDER-RADIUS', 'border-radius'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a { -WEBKIT-animation-duration: 3s; }',
			fixed: 'a { -webkit-animation-duration: 3s; }',
			message: messages.expected('-WEBKIT-animation-duration', '-webkit-animation-duration'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 31,
		},
		{
			code: 'a { -webkit-Animation-duration: 3s; }',
			fixed: 'a { -webkit-animation-duration: 3s; }',
			message: messages.expected('-webkit-Animation-duration', '-webkit-animation-duration'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 31,
		},
		{
			code: 'a:hover { Display: block; }',
			fixed: 'a:hover { display: block; }',
			message: messages.expected('Display', 'display'),
			line: 1,
			column: 11,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a:focus { Display: block; }',
			fixed: 'a:focus { display: block; }',
			message: messages.expected('Display', 'display'),
			line: 1,
			column: 11,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a:other { Display: block; }',
			fixed: 'a:other { display: block; }',
			message: messages.expected('Display', 'display'),
			line: 1,
			column: 11,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a::before { Display: block; }',
			fixed: 'a::before { display: block; }',
			message: messages.expected('Display', 'display'),
			line: 1,
			column: 13,
			endLine: 1,
			endColumn: 20,
		},
		{
			code: 'a::other { Display: block; }',
			fixed: 'a::other { display: block; }',
			message: messages.expected('Display', 'display'),
			line: 1,
			column: 12,
			endLine: 1,
			endColumn: 19,
		},
		{
			code: '@media screen and (orientation: landscape) { Width: 500px; }',
			fixed: '@media screen and (orientation: landscape) { width: 500px; }',
			message: messages.expected('Width', 'width'),
			line: 1,
			column: 46,
			endLine: 1,
			endColumn: 51,
		},
		{
			code: 'a { Property: value; }',
			fixed: 'a { property: value; }',
			description: 'non-standard property',
			message: messages.expected('Property', 'property'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 13,
		},
	],
});

testRule({
	ruleName,
	customSyntax: 'postcss-scss',
	config: ['lower'],
	fix: true,

	accept: [
		{
			code: '$width: 5em;',
			description: 'ignore variable',
		},
		{
			code: '$Width: 5em;',
			description: 'ignore variable',
		},
		{
			code: '$map: (width: 100px);',
			description: 'ignore map',
		},
		{
			code: '$map: (Width: 100px);',
			description: 'ignore map',
		},
		{
			code: 'a { font: (italic bold 10px/8px) }',
			description: 'list',
		},
		{
			code: '&-sidebar { border: 1px solid; }',
			description: 'referencing parent selectors',
		},
		{
			code: 'a { font: { size: 30em; } }',
			description: 'nested properties',
		},
		{
			code: 'p.#{$name} { #{$attr}-color: blue; }',
			description: 'ignore interpolation',
		},
		{
			code: 'p.#{$name} { #{$Attr}-color: blue; }',
			description: 'ignore interpolation',
		},
		{
			code: 'p.#{$name} { #{$attr}-Color: blue; }',
			description: 'ignore interpolation',
		},
		{
			code: '#context a%extreme { color: red; }',
			description: 'extend only selectors',
		},
		{
			code: '.parent { @at-root { .child1 { display: block; } } }',
			description: 'as-root',
		},
		{
			code: '@mixin large-text { font-size: 20px; }',
			description: 'inside mixin',
		},
		{
			code: 'p { @if 1 + 1 == 2 { border: 1px solid;  } }',
			description: 'inside custom at-rule',
		},
	],

	reject: [
		{
			code: '&-sidebar { Border: 1px solid; }',
			fixed: '&-sidebar { border: 1px solid; }',
			description: 'referencing parent selectors',
			message: messages.expected('Border', 'border'),
			line: 1,
			column: 13,
			endLine: 1,
			endColumn: 19,
		},
		{
			code: 'a { Font: (italic bold 10px/8px) }',
			fixed: 'a { font: (italic bold 10px/8px) }',
			message: messages.expected('Font', 'font'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 9,
		},
		{
			code: 'a { font: { Size: 30em; } }',
			fixed: 'a { font: { size: 30em; } }',
			description: 'nested properties',
			message: messages.expected('Size', 'size'),
			line: 1,
			column: 13,
			endLine: 1,
			endColumn: 17,
		},
		{
			code: '#context a%extreme { Color: red; }',
			fixed: '#context a%extreme { color: red; }',
			description: 'extend only selectors',
			message: messages.expected('Color', 'color'),
			line: 1,
			column: 22,
			endLine: 1,
			endColumn: 27,
		},
		{
			code: '.parent { @at-root { .child1 { Display: block; } } }',
			fixed: '.parent { @at-root { .child1 { display: block; } } }',
			description: 'as-root',
			message: messages.expected('Display', 'display'),
			line: 1,
			column: 32,
			endLine: 1,
			endColumn: 39,
		},
		{
			code: '@mixin large-text { Font-size: 20px; }',
			fixed: '@mixin large-text { font-size: 20px; }',
			description: 'inside mixin',
			message: messages.expected('Font-size', 'font-size'),
			line: 1,
			column: 21,
			endLine: 1,
			endColumn: 30,
		},
		{
			code: 'p { @if 1 + 1 == 2 { Border: 1px solid;  } }',
			fixed: 'p { @if 1 + 1 == 2 { border: 1px solid;  } }',
			description: 'inside custom at-rule',
			message: messages.expected('Border', 'border'),
			line: 1,
			column: 22,
			endLine: 1,
			endColumn: 28,
		},
	],
});

testRule({
	ruleName,
	customSyntax: 'postcss-less',
	config: ['lower'],
	fix: true,

	accept: [
		{
			code: '@variable: 10px',
		},
		{
			code: '@Variable: 10px',
		},
		{
			code: '@VARIABLE: 10px',
		},
		{
			code: 'a { color: @light-blue; }',
		},
		{
			code: 'a { .bordered; }',
			description: 'ignore mixin',
		},
		{
			code: 'a { .Bordered; }',
			description: 'ignore mixin',
		},
		{
			code: 'a { .Bordered(5px); }',
			description: 'ignore mixin',
		},
		{
			code: '.mixin(@color: black) { color: @color; }',
			description: 'inside mixin',
		},
		{
			code: '.@{my-selector} { font-weight: bold; }',
			description: 'with selector interpolation',
		},
		{
			code: '.widget { @{property}: #0ee; }',
			description: 'ignore property interpolation',
		},
		{
			code: '.widget { @{Property}: #0ee; }',
			description: 'ignore property interpolation',
		},
		{
			code: 'a { box-shadow+: inset 0 0 10px #555; }',
			description: 'mergeable property',
		},
		{
			code: 'a { box-shadow+_: inset 0 0 10px #555; }',
			description: 'mergeable property with space',
		},
		{
			code: '.bucket { tr & { color: blue; } }',
			description: 'nested selector',
		},
		{
			code: 'a { Box-shadow+: inset 0 0 10px #555; }',
			description: 'mergeable property',
		},
		{
			code: 'a { Transform+_: scale(2); }',
			description: 'mergeable property with space',
		},
	],

	reject: [
		{
			code: 'a { Color: @light-blue; }',
			fixed: 'a { color: @light-blue; }',
			message: messages.expected('Color', 'color'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 10,
		},
		{
			code: '.@{my-selector} { Font-weight: bold; }',
			fixed: '.@{my-selector} { font-weight: bold; }',
			description: 'selector interpolation',
			message: messages.expected('Font-weight', 'font-weight'),
			line: 1,
			column: 19,
			endLine: 1,
			endColumn: 30,
		},
		{
			code: '.mixin(@color: black) { Color: @color; }',
			fixed: '.mixin(@color: black) { color: @color; }',
			description: 'inside mixin',
			message: messages.expected('Color', 'color'),
			line: 1,
			column: 25,
			endLine: 1,
			endColumn: 30,
		},
		{
			code: '@media screen { @media (min-width: 768px) { Color: red; }}',
			fixed: '@media screen { @media (min-width: 768px) { color: red; }}',
			description: 'nested directives',
			message: messages.expected('Color', 'color'),
			line: 1,
			column: 45,
			endLine: 1,
			endColumn: 50,
		},
		{
			code: '.bucket { tr & { Color: blue; } }',
			fixed: '.bucket { tr & { color: blue; } }',
			description: 'nested selector',
			message: messages.expected('Color', 'color'),
			line: 1,
			column: 18,
			endLine: 1,
			endColumn: 23,
		},
	],
});

testRule({
	ruleName,
	config: ['upper'],
	fix: true,

	accept: [
		{
			code: 'a { }',
		},
		{
			code: 'a { DISPLAY: block; }',
		},
		{
			code: 'a { BORDER-RADIUS: 8px; }',
		},
		{
			code: 'a:hover { DISPLAY: block; }',
		},
		{
			code: 'a:focus { DISPLAY: block; }',
		},
		{
			code: 'a:other { DISPLAY: block; }',
		},
		{
			code: 'a::before { DISPLAY: block; }',
		},
		{
			code: 'a::other { DISPLAY: block; }',
		},
		{
			code: ':root { --custom-property-set: {} }',
		},
		{
			code: ':root { --custom-property-name: red; }',
		},
		{
			code: ':root { --custom-PropertyName: red; }',
		},
		{
			code: 'a { -WEBKIT-ANIMATION-DURATION: 3s; }',
		},
		{
			code: '@media screen and (orientation: landscape) { WIDTH: 500px; }',
		},
		{
			code: 'a { PROPERTY: value; }',
			description: 'non-standard property',
		},
	],

	reject: [
		{
			code: 'a { Display: block; }',
			fixed: 'a { DISPLAY: block; }',
			message: messages.expected('Display', 'DISPLAY'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 12,
		},
		{
			code: 'a { DisplaY: block; }',
			fixed: 'a { DISPLAY: block; }',
			message: messages.expected('DisplaY', 'DISPLAY'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 12,
		},
		{
			code: 'a { display: block; }',
			fixed: 'a { DISPLAY: block; }',
			message: messages.expected('display', 'DISPLAY'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 12,
		},
		{
			code: 'a { border-Radius: block; }',
			fixed: 'a { BORDER-RADIUS: block; }',
			message: messages.expected('border-Radius', 'BORDER-RADIUS'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a { border-RADIUS: block; }',
			fixed: 'a { BORDER-RADIUS: block; }',
			message: messages.expected('border-RADIUS', 'BORDER-RADIUS'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a { BORDER-radius: block; }',
			fixed: 'a { BORDER-RADIUS: block; }',
			message: messages.expected('BORDER-radius', 'BORDER-RADIUS'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a { border-radius: block; }',
			fixed: 'a { BORDER-RADIUS: block; }',
			message: messages.expected('border-radius', 'BORDER-RADIUS'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a { -WEBKIT-animation-duration: 3s; }',
			fixed: 'a { -WEBKIT-ANIMATION-DURATION: 3s; }',
			message: messages.expected('-WEBKIT-animation-duration', '-WEBKIT-ANIMATION-DURATION'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 31,
		},
		{
			code: 'a { -webkit-Animation-duration: 3s; }',
			fixed: 'a { -WEBKIT-ANIMATION-DURATION: 3s; }',
			message: messages.expected('-webkit-Animation-duration', '-WEBKIT-ANIMATION-DURATION'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 31,
		},
		{
			code: 'a:hover { Display: block; }',
			fixed: 'a:hover { DISPLAY: block; }',
			message: messages.expected('Display', 'DISPLAY'),
			line: 1,
			column: 11,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a:focus { Display: block; }',
			fixed: 'a:focus { DISPLAY: block; }',
			message: messages.expected('Display', 'DISPLAY'),
			line: 1,
			column: 11,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a:other { Display: block; }',
			fixed: 'a:other { DISPLAY: block; }',
			message: messages.expected('Display', 'DISPLAY'),
			line: 1,
			column: 11,
			endLine: 1,
			endColumn: 18,
		},
		{
			code: 'a::before { Display: block; }',
			fixed: 'a::before { DISPLAY: block; }',
			message: messages.expected('Display', 'DISPLAY'),
			line: 1,
			column: 13,
			endLine: 1,
			endColumn: 20,
		},
		{
			code: 'a::other { Display: block; }',
			fixed: 'a::other { DISPLAY: block; }',
			message: messages.expected('Display', 'DISPLAY'),
			line: 1,
			column: 12,
			endLine: 1,
			endColumn: 19,
		},
		{
			code: '@media screen and (orientation: landscape) { Width: 500px; }',
			fixed: '@media screen and (orientation: landscape) { WIDTH: 500px; }',
			message: messages.expected('Width', 'WIDTH'),
			line: 1,
			column: 46,
			endLine: 1,
			endColumn: 51,
		},
		{
			code: 'a { Property: value; }',
			fixed: 'a { PROPERTY: value; }',
			description: 'non-standard property',
			message: messages.expected('Property', 'PROPERTY'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 13,
		},
	],
});

testRule({
	ruleName,
	customSyntax: 'postcss-scss',
	config: ['upper'],
	fix: true,

	accept: [
		{
			code: '$width: 5em;',
			description: 'ignore variable',
		},
		{
			code: '$Width: 5em;',
			description: 'ignore variable',
		},
		{
			code: '$map: (width: 100px);',
			description: 'ignore map',
		},
		{
			code: '$map: (Width: 100px);',
			description: 'ignore map',
		},
		{
			code: 'a { FONT: (italic bold 10px/8px) }',
			description: 'list',
		},
		{
			code: '&-sidebar { BORDER: 1px solid; }',
			description: 'referencing parent selectors',
		},
		{
			code: 'a { font: { SIZE: 30em; } }',
			description: 'nested properties',
		},
		{
			code: 'p.#{$name} { #{$attr}-color: blue; }',
			description: 'ignore interpolation',
		},
		{
			code: 'p.#{$name} { #{$Attr}-color: blue; }',
			description: 'ignore interpolation',
		},
		{
			code: 'p.#{$name} { #{$attr}-Color: blue; }',
			description: 'ignore interpolation',
		},
		{
			code: '#context a%extreme { COLOR: red; }',
			description: 'extend only selectors',
		},
		{
			code: '.parent { @at-root { .child1 { DISPLAY: block; } } }',
			description: 'as-root',
		},
		{
			code: '@mixin large-text { FONT-SIZE: 20px; }',
			description: 'inside mixin',
		},
		{
			code: 'p { @if 1 + 1 == 2 { BORDER: 1px solid;  } }',
			description: 'inside custom at-rule',
		},
	],

	reject: [
		{
			code: '&-sidebar { Border: 1px solid; }',
			fixed: '&-sidebar { BORDER: 1px solid; }',
			description: 'referencing parent selectors',
			message: messages.expected('Border', 'BORDER'),
			line: 1,
			column: 13,
			endLine: 1,
			endColumn: 19,
		},
		{
			code: 'a { Font: (italic bold 10px/8px) }',
			fixed: 'a { FONT: (italic bold 10px/8px) }',
			message: messages.expected('Font', 'FONT'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 9,
		},
		{
			code: 'a { font: { Size: 30em; } }',
			fixed: 'a { font: { SIZE: 30em; } }',
			description: 'nested properties',
			message: messages.expected('Size', 'SIZE'),
			line: 1,
			column: 13,
			endLine: 1,
			endColumn: 17,
		},
		{
			code: '#context a%extreme { Color: red; }',
			fixed: '#context a%extreme { COLOR: red; }',
			description: 'extend only selectors',
			message: messages.expected('Color', 'COLOR'),
			line: 1,
			column: 22,
			endLine: 1,
			endColumn: 27,
		},
		{
			code: '.parent { @at-root { .child1 { Display: block; } } }',
			fixed: '.parent { @at-root { .child1 { DISPLAY: block; } } }',
			description: 'as-root',
			message: messages.expected('Display', 'DISPLAY'),
			line: 1,
			column: 32,
			endLine: 1,
			endColumn: 39,
		},
		{
			code: '@mixin large-text { Font-size: 20px; }',
			fixed: '@mixin large-text { FONT-SIZE: 20px; }',
			description: 'inside mixin',
			message: messages.expected('Font-size', 'FONT-SIZE'),
			line: 1,
			column: 21,
			endLine: 1,
			endColumn: 30,
		},
		{
			code: 'p { @if 1 + 1 == 2 { Border: 1px solid;  } }',
			fixed: 'p { @if 1 + 1 == 2 { BORDER: 1px solid;  } }',
			description: 'inside custom at-rule',
			message: messages.expected('Border', 'BORDER'),
			line: 1,
			column: 22,
			endLine: 1,
			endColumn: 28,
		},
	],
});

testRule({
	ruleName,
	customSyntax: 'postcss-less',
	config: ['upper'],
	fix: true,

	accept: [
		{
			code: '@variable: 10px',
		},
		{
			code: '@Variable: 10px',
		},
		{
			code: '@VARIABLE: 10px',
		},
		{
			code: 'a { COLOR: @light-blue; }',
		},
		{
			code: 'a { .bordered; }',
			description: 'ignore mixin',
		},
		{
			code: 'a { .Bordered; }',
			description: 'ignore mixin',
		},
		{
			code: 'a { .Bordered(5px); }',
			description: 'ignore mixin',
		},
		{
			code: '.mixin(@color: black) { COLOR: @color; }',
			description: 'inside mixin',
		},
		{
			code: '.@{my-selector} { FONT-WEIGHT: bold; }',
			description: 'with selector interpolation',
		},
		{
			code: '.widget { @{property}: #0ee; }',
			description: 'ignore property interpolation',
		},
		{
			code: '.widget { @{Property}: #0ee; }',
			description: 'ignore property interpolation',
		},
		{
			code: 'a { BOX_SHADOW+: inset 0 0 10px #555; }',
			description: 'mergeable property',
		},
		{
			code: 'a { BOX-SHADOW+_: inset 0 0 10px #555; }',
			description: 'mergeable property with space',
		},
		{
			code: '.bucket { tr & { COLOR: blue; } }',
			description: 'nested selector',
		},
		{
			code: 'a { Box-shadow+: inset 0 0 10px #555; }',
			description: 'mergeable property',
		},
		{
			code: 'a { Transform+_: scale(2); }',
			description: 'mergeable property with space',
		},
	],

	reject: [
		{
			code: 'a { Color: @light-blue; }',
			fixed: 'a { COLOR: @light-blue; }',
			message: messages.expected('Color', 'COLOR'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 10,
		},
		{
			code: '.@{my-selector} { Font-weight: bold; }',
			fixed: '.@{my-selector} { FONT-WEIGHT: bold; }',
			description: 'selector interpolation',
			message: messages.expected('Font-weight', 'FONT-WEIGHT'),
			line: 1,
			column: 19,
			endLine: 1,
			endColumn: 30,
		},
		{
			code: '.mixin(@color: black) { Color: @color; }',
			fixed: '.mixin(@color: black) { COLOR: @color; }',
			description: 'inside mixin',
			message: messages.expected('Color', 'COLOR'),
			line: 1,
			column: 25,
			endLine: 1,
			endColumn: 30,
		},
		{
			code: '@media screen { @media (min-width: 768px) { Color: red; }}',
			fixed: '@media screen { @media (min-width: 768px) { COLOR: red; }}',
			description: 'nested directives',
			message: messages.expected('Color', 'COLOR'),
			line: 1,
			column: 45,
			endLine: 1,
			endColumn: 50,
		},
		{
			code: '.bucket { tr & { Color: blue; } }',
			fixed: '.bucket { tr & { COLOR: blue; } }',
			description: 'nested selector',
			message: messages.expected('Color', 'COLOR'),
			line: 1,
			column: 18,
			endLine: 1,
			endColumn: 23,
		},
	],
});

testRule({
	ruleName,
	config: ['lower', { ignoreSelectors: [':exports'] }],
	fix: true,

	accept: [
		{
			code: ':exports { camelCasedColorVariable: blue  }',
		},
	],
});
