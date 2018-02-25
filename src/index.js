import { extendObservable, observe } from 'mobx';

export default class FieldTracker {

    constructor (ctx, ...fields) {
        this.fields = fields;
        this.ctx = ctx;
        this.oldState = null;

        extendObservable(this, {
            children: [],
            hasFieldChanges: false,
            get hasChanges() {
                return (
                    this.hasFieldChanges || this.children.some(form => {
                        return form.hasChanges;
                    })
                )
            }
        });

        this.track();
    }

    // track changes of fields
    track() {
        const snapShot = () => {
            return JSON.stringify(this.fields.reduce((obj, key) => {
                obj[key] = this.ctx[key];
                return obj;
            }, {}))
        }

        const changeListener = () => {
            this.hasFieldChanges = this.oldState !== snapShot();
        }

        this.oldState = snapShot();
        changeListener();
        observe(this.ctx, changeListener);
    }

    // reset form and it's all childrens
    reset() {
        const reset  = (frm) => {
            frm.track();
            frm.children.forEach(reset)
        }
        reset(this);
    }

    add(form) {
        this.children.push(form)
        this.track()
    }
}