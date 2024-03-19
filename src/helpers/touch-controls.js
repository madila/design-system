import {TFN} from "./timing-functions";

export class TouchControls {

    constructor(slider, childCount) {

        this._slider = slider;
        this.locked = false;
        this.w = null;

        this.size();

        this.x0 = null;
        this.N = slider.children.length;
        this.ini = null;
        this.fin = null;
        this.i = 0;
        this.rID = null;
        this.anf = null;
        this.NF = 30;

        this._slider.style.setProperty('--n', childCount);

        addEventListener('resize', this.size, false);

        this._slider.addEventListener('pointerdown', this.lock, false);

        this._slider.addEventListener('pointermove', this.drag, false);

        this._slider.addEventListener('pointerup', this.move, false);
        this._slider.addEventListener('pointerout', this.move, false);

    }

    stopAni() {
        cancelAnimationFrame(this.rID);
        this.rID = null
    };

    ani(cf = 0) {

        if(Number.isNaN(TFN['ease-out'](cf/this.anf))) return;

        this._slider.style.setProperty('--i', this.ini + (this.fin - this.ini)*TFN['ease-out'](cf/this.anf));

        if(cf === this.anf) {
            this.stopAni();
            return
        }

        this.rID = requestAnimationFrame(this.ani.bind(this, ++cf))
    };

    unify = (e) => { return e.changedTouches ? e.changedTouches[0] : e }

    lock = (e) => {
        this.x0 = this.unify(e).clientX;
        this.locked = true;
        this._slider.classList.add('smooth');
    }

    drag = (e) => {
        e.preventDefault();
        if (!this.locked) return;

        //this._slider.style.setProperty('--tx', `${Math.round(this.unify(e).clientX - this.x0)}px`)

        let dx = this.unify(e).clientX - this.x0,
            f = +(dx / this.w).toFixed(2);

        this._slider.style.setProperty('--i', this.i - f);

    }

    move = (e) => {
        if (!this.locked) return;

            let dx = this.unify(e).clientX - this.x0,
                s = Math.sign(dx),
                f = +(s*dx/this.w).toFixed(2);

            this.ini = this.i - s*f;

            if((this.i > 0 || s < 0) && (this.i < this.N - 1 || s > 0) && f > .2) {
                this.i -= s;
                f = 1 - f
            }

            this.fin = this.i;
            this.anf = Math.round(f*this.NF);

            this.ani();
            this.x0 = null;

            const swipe = new CustomEvent("frame-change-step", {
                detail: {
                    scroll: false,
                    getIndex: () => {
                        return this.fin
                    }
                },
                bubbles: true
            });

            this._slider.dispatchEvent(swipe);

            this._slider.classList.remove('smooth');
            this.locked = false;

    }

    size = () => { this.w = window.innerWidth }
}
