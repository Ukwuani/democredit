/* eslint-disable id-blacklist */
import { Static, String, Record } from "runtypes";

const EmailRegex =
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Email = String.withBrand("Email").withConstraint((email: string) => EmailRegex.test(email) || "Invalid email");
export type Email = Static<typeof Email>;

const Phone = String.withBrand("Phone");
export type Phone = Static<typeof Phone>;

