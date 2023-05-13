import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {

    isValidEmail(email: string) {
        const emailPattern: RegExp  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailPattern.test(email)
    }
}