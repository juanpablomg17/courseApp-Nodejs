import { UserService } from "./user.service";

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        service = new UserService();
    });

    describe('isValidEmail', () => {
        it('should return true for valid email', () => {
            const email = 'test@example.com';
            const result = service.isValidEmail(email);
            expect(result).toBe(true);
        });

        it('should return false for invalid email', () => {
            const email = 'test@';
            const result = service.isValidEmail(email);
            expect(result).toBe(false);
        });
    });
});
