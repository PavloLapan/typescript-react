import { Utils } from '../Utils/utils';

describe('Utils', () => {
    describe('uuid', () => {
        it('should generate a valid UUID', () => {
            const uuidRegex = /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;
            const generatedUuid = Utils.uuid();

            expect(generatedUuid).toMatch(uuidRegex);
        });
    });

    describe('pluralize', () => {
        it('should pluralize word when count is not 1', () => {
            const singularWord = 'apple';
            const pluralWord = 'apples';

            expect(Utils.pluralize(0, singularWord)).toBe(pluralWord);
            expect(Utils.pluralize(2, singularWord)).toBe(pluralWord);
        });

        it('should not pluralize word when count is 1', () => {
            const singularWord = 'apple';

            expect(Utils.pluralize(1, singularWord)).toBe(singularWord);
        });
    });

    describe('store', () => {
        beforeEach(() => {
            // Clear local storage before each test
            localStorage.clear();
        });

        it('should store data in local storage', () => {
            const namespace = 'testNamespace';
            const data = { key: 'value' };

            Utils.store(namespace, data);

            const storedData = localStorage.getItem(namespace);
            expect(JSON.parse(storedData!)).toEqual(data);
        });

        it('should retrieve data from local storage', () => {
            const namespace = 'testNamespace';
            const data = { key: 'value' };

            localStorage.setItem(namespace, JSON.stringify(data));

            const retrievedData = Utils.store(namespace);
            expect(retrievedData).toEqual(data);
        });

        it('should return an empty array if no data in local storage', () => {
            const namespace = 'nonexistentNamespace';

            const retrievedData = Utils.store(namespace);
            expect(retrievedData).toEqual([]);
        });
    });

    describe('extend', () => {
        it('should merge multiple objects into a new object', () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { b: 3, c: 4 };
            const obj3 = { d: 5 };

            // Define a type that includes all keys from the provided objects
            type MergedType = { a?: number; b?: number; c?: number; d?: number };

            const mergedObj = Utils.extend<MergedType>(obj1, obj2, obj3);

            expect(mergedObj).toEqual({ a: 1, b: 3, c: 4, d: 5 });
        });

        it('should not modify the original objects', () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { b: 3, c: 4 };
            const obj3 = { d: 5 };

            type MergedType = { a?: number; b?: number; c?: number; d?: number };

            Utils.extend<MergedType>(obj1, obj2, obj3);

            expect(obj1).toEqual({ a: 1, b: 2 });
            expect(obj2).toEqual({ b: 3, c: 4 });
            expect(obj3).toEqual({ d: 5 });
        });
    });

});
