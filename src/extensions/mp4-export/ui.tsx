/**
 * Copyright (c) 2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import JSZip from 'jszip';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CollapsableControls, CollapsableState } from '../../mol-plugin-ui/base';
import { Button } from '../../mol-plugin-ui/controls/common';
import { CameraOutlinedSvg, GetAppSvg, Icon, SubscriptionsOutlinedSvg } from '../../mol-plugin-ui/controls/icons';
import { ParameterControls } from '../../mol-plugin-ui/controls/parameters';
import { download } from '../../mol-util/download';
import { Mp4AnimationParams, Mp4Controls } from './controls';

interface State {
    busy?: boolean,
    data?: {
        movie: Uint8Array,
        filename: string,
        pngFrames?: Uint8Array[],
        pngFilenamePrefix?: string
    };
}

export class Mp4EncoderUI extends CollapsableControls<{}, State> {
    private _controls: Mp4Controls | undefined;

    get controls() {
        return this._controls || (this._controls = new Mp4Controls(this.plugin));
    }

    protected defaultState(): State & CollapsableState {
        return {
            header: 'Export Animation',
            isCollapsed: true,
            brand: { accent: 'cyan', svg: SubscriptionsOutlinedSvg }
        };
    }

    private downloadControls() {
        return <>
            <div className='msp-control-offset msp-help-text'>
                <div className='msp-help-description' style={{ textAlign: 'center' }}>
                    Rendering successful!
                </div>
            </div>
            <Button icon={GetAppSvg} onClick={this.save} style={{ marginTop: 1 }}>Save Animation</Button>
            {this.state.data?.pngFrames && this.state.data.pngFrames.length > 0 && (
                <Button icon={GetAppSvg} onClick={this.savePngFrames} style={{ marginTop: 1 }}>
                    Save PNG Frames ({this.state.data.pngFrames.length})
                </Button>
            )}
            <Button onClick={() => this.setState({ data: void 0 })} style={{ marginTop: 6 }}>Clear</Button>
        </>;
    }

    protected renderControls(): JSX.Element | null {
        if (this.state.data) {
            return this.downloadControls();
        }

        const ctrl = this.controls;
        const current = ctrl.behaviors.current.value;
        const info = ctrl.behaviors.info.value;
        const canApply = ctrl.behaviors.canApply.value;
        return <>
            <ParameterControls
                params={ctrl.behaviors.animations.value}
                values={{ current: current?.anim.name }}
                onChangeValues={xs => ctrl.setCurrent(xs.current)}
                isDisabled={this.state.busy}
            />
            {current && <ParameterControls
                params={current.params}
                values={current.values}
                onChangeValues={xs => ctrl.setCurrentParams(xs)}
                isDisabled={this.state.busy}
            />}
            <div className='msp-control-offset msp-help-text'>
                <div className='msp-help-description' style={{ textAlign: 'center' }}>
                    Resolution: {info.width}x{info.height}<br />
                    Adjust in viewport using <Icon svg={CameraOutlinedSvg} inline />
                </div>
            </div>
            <ParameterControls
                params={Mp4AnimationParams}
                values={ctrl.behaviors.params.value}
                onChangeValues={xs => ctrl.behaviors.params.next(xs)}
                isDisabled={this.state.busy}
            />
            <Button onClick={this.generate} style={{ marginTop: 1 }}
                disabled={this.state.busy || !canApply.canApply}
                commit={canApply.canApply ? 'on' : 'off'}>
                {canApply.canApply ? 'Render' : canApply.reason ?? 'Invalid params/state'}
            </Button>
        </>;
    }

    componentDidMount() {
        const merged = merge(
            this.controls.behaviors.animations,
            this.controls.behaviors.current,
            this.controls.behaviors.canApply,
            this.controls.behaviors.info,
            this.controls.behaviors.params
        );

        this.subscribe(merged.pipe(debounceTime(10)), () => {
            if (!this.state.isCollapsed) this.forceUpdate();
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this._controls?.dispose();
        this._controls = void 0;
    }

    save = () => {
        download(new Blob([this.state.data!.movie]), this.state.data!.filename);
    };

    savePngFrames = () => {
        if (!this.state.data?.pngFrames || !this.state.data.pngFilenamePrefix) return;

        const zip = new JSZip();
        this.state.data.pngFrames.forEach((frame, index) => {
            // Use padded frame numbering (e.g., 001, 002, etc.)
            const paddedIndex = String(index).padStart(
                String(this.state.data!.pngFrames!.length).length,
                '0'
            );
            zip.file(`${this.state.data!.pngFilenamePrefix}_frame${paddedIndex}.png`, frame);
        });
        zip.generateAsync({ type: 'blob' }).then((blob: Blob) => {
            download(blob, `${this.state.data!.pngFilenamePrefix}_frames.zip`);
        });
    };

    generate = async () => {
        try {
            this.setState({ busy: true });
            const data = await this.controls.render();
            this.setState({ busy: false, data });
        } catch (e) {
            console.error(e);
            this.setState({ busy: false });
        }
    };
}