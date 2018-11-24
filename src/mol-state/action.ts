/**
 * Copyright (c) 2018 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { Task } from 'mol-task';
import { UUID } from 'mol-util';
import { ParamDefinition as PD } from 'mol-util/param-definition';
import { StateObject, StateObjectCell } from './object';
import { State } from './state';
import { Transformer } from './transformer';

export { StateAction };

interface StateAction<A extends StateObject = StateObject, T = any, P extends {} = {}> {
    create(params: P): StateAction.Instance,
    readonly id: UUID,
    readonly definition: StateAction.Definition<A, T, P>
}

namespace StateAction {
    export type Id = string & { '@type': 'transformer-id' }
    export type Params<T extends StateAction<any, any, any>> = T extends StateAction<any, any, infer P> ? P : unknown;
    export type ReType<T extends StateAction<any, any, any>> = T extends StateAction<any, infer T, any> ? T : unknown;
    export type ControlsFor<Props> = { [P in keyof Props]?: PD.Any }

    export interface Instance {
        action: StateAction,
        params: any
    }

    export interface ApplyParams<A extends StateObject = StateObject, P extends {} = {}> {
        ref: string,
        cell: StateObjectCell,
        a: A,
        state: State,
        params: P
    }

    export interface DefinitionBase<A extends StateObject = StateObject, T = any, P extends {} = {}> {
        readonly display?: { readonly name: string, readonly description?: string },

        /**
         * Apply an action that modifies the State specified in Params.
         */
        apply(params: ApplyParams<A, P>, globalCtx: unknown): T | Task<T>,

        /** Test if the transform can be applied to a given node */
        isApplicable?(a: A, globalCtx: unknown): boolean
    }

    export interface Definition<A extends StateObject = StateObject, T = any, P extends {} = {}> extends DefinitionBase<A, T, P> {
        readonly from: StateObject.Ctor[],
        params?(a: A, globalCtx: unknown): { [K in keyof P]: PD.Any }
    }

    export function create<A extends StateObject, T, P extends {} = {}>(definition: Definition<A, T, P>): StateAction<A, T, P> {
        const action: StateAction<A, T, P> = {
            create(params) { return { action, params }; },
            id: UUID.create22(),
            definition
        };
        return action;
    }

    export function fromTransformer<T extends Transformer>(transformer: T) {
        const def = transformer.definition;
        return create<Transformer.From<T>, void, Transformer.Params<T>>({
            from: def.from,
            display: def.display,
            params: def.params as Transformer.Definition<Transformer.From<T>, any, Transformer.Params<T>>['params'],
            apply({ cell, state, params }) {
                const tree = state.build().to(cell.transform.ref).apply(transformer, params);
                return state.update(tree);
            }
        })
    }

    export namespace Builder {
        export interface Type<A extends StateObject.Ctor, P extends { }> {
            from?: A | A[],
            params?: PD.For<P> | ((a: StateObject.From<A>, globalCtx: any) => PD.For<P>)
        }

        export interface Root {
            <A extends StateObject.Ctor, P extends { }>(info: Type<A, P>): Define<StateObject.From<A>, PD.Normalize<P>>
        }

        export interface Define<A extends StateObject, P> {
            <T>(def: DefinitionBase<A, T, P>): StateAction<A, T, P>
        }

        function root(info: Type<any, any>): Define<any, any> {
            return def => create({
                from: info.from instanceof Array
                    ? info.from
                    : !!info.from ? [info.from] : [],
                params: typeof info.params === 'object'
                    ? () => info.params as any
                    : !!info.params
                    ? info.params as any
                    : void 0,
                ...def
            });
        }

        export const build: Root = (info: any) => root(info);
    }

    export const build = Builder.build;
}