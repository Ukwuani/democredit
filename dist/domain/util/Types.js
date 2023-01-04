"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable id-blacklist */
const runtypes_1 = require("runtypes");
const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Email = runtypes_1.String.withBrand("Email").withConstraint((email) => EmailRegex.test(email) || "Invalid email");
const Phone = runtypes_1.String.withBrand("Phone");
