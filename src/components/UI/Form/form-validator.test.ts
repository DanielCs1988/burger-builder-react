import {validateInputValue} from "./form-validator";

describe(' Form Validator', () => {

    it('should return true when no rules are specified', () => {
        expect(validateInputValue('random')).toBe(true);
    });

    it('[REQUIRED] should consider non-empty strings valid', () => {
        const result = validateInputValue('random', { required: true });
        expect(result).toBe(true);
    });

    it('[REQUIRED] should consider empty strings invalid', () => {
        const result = validateInputValue('', { required: true });
        expect(result).toBe(false);
    });

    it('[MIN_LENGTH] should consider strings long enough valid', () => {
        const result = validateInputValue('random', { minLength: 5 });
        expect(result).toBe(true);
    });

    it('[MIN_LENGTH] should consider strings too short invalid', () => {
        const result = validateInputValue('rnd', { minLength: 5 });
        expect(result).toBe(false);
    });

    it('[MAX_LENGTH] should consider strings short enough valid', () => {
        const result = validateInputValue('random', { maxLength: 10 });
        expect(result).toBe(true);
    });

    it('[MAX_LENGTH] should consider strings too long invalid', () => {
        const result = validateInputValue('random random', { maxLength: 10 });
        expect(result).toBe(false);
    });

    it('[PATTERN] should consider strings of the right pattern valid', () => {
        const result = validateInputValue('random', { pattern: /^[a-zA-Z]{5,10}$/ });
        expect(result).toBe(true);
    });

    it('[PATTERN] should consider strings of the wrong pattern valid', () => {
        const result = validateInputValue('r4nd0m', { pattern: /^[a-zA-Z]{5,10}$/ });
        expect(result).toBe(false);
    });
});