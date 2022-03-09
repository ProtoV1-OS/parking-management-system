"use strict";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");
jest.spyOn(global, "setInterval");

const { db } = require("./__mock__").module;
global.fetch = jest.fn(() => Promise.resolve(db));
