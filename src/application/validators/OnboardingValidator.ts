import Validator from "fastest-validator"
import {SignUpPayLoad} from "application/payloads/SignUpPayload"
import { LoginPayLoad } from 'application/payloads/LoginPayload';
export class OnboardingValidator extends Validator {
    async validateSignUpPayload(data: SignUpPayLoad) {
        let schema: SignUpPayLoad = {
            firstName: "string|min:2",
            lastName: "string|min:2",
            phoneNumber: "string|min:10",
            email: "email",
            password: "string|min:6"
        }
        return await this.compile(schema)(data)
    }

    async validateLoginPayload(data: LoginPayLoad) {
        let schema: LoginPayLoad = {
            loginId: ["email", "string|min:10"],
            password: "string|min:6"
        }
        return await this.compile(schema)(data)
    }

}