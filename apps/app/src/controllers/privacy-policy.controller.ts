/* eslint-disable @typescript-eslint/no-empty-function */
import {Controller} from '../controller';
import {PrivacyPolicyModel} from '../models';

class PrivacyPolicyController extends Controller {
    private readonly _model: PrivacyPolicyModel;

    constructor() {
        super();

        this._model = new PrivacyPolicyModel();
    }

    public get model(): PrivacyPolicyModel {
        return this._model;
    }

    public initialize(): void {
        fetch('../assets/markdown/privacy_policy.md')
        .then((res) => res.text())
        .then((md) => {
            this._model.markdown = md;
        });
    }

    public dispose(): void {}
}

export default new PrivacyPolicyController();