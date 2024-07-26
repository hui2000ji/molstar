/**
 * Copyright (c) 2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Gianluca Tomasello <giagitom@gmail.com>
 */
import { FibonacciHeap } from '../fibonacci-heap';
describe('fibonacci-heap', function () {
    it('basic', function () {
        var heap = new FibonacciHeap();
        heap.insert(1, 2);
        heap.insert(4);
        heap.insert(2);
        heap.insert(3);
        expect(heap.size()).toBe(4);
        var node = heap.extractMinimum();
        expect(node.key).toBe(1);
        expect(node.value).toBe(2);
        expect(heap.size()).toBe(3);
    });
});
