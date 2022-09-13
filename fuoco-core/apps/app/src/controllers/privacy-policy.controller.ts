import {Controller} from '../controller';
import {PrivacyPolicyModel} from '../models';

class PrivacyPolicyController extends Controller {
    private readonly _model: PrivacyPolicyModel;

    constructor() {
        super();

        this._model = new PrivacyPolicyModel();

        fetch('../assets/markdown/privacy_policy.md')
        .then((res) => res.text())
        .then((md) => {
            this._model.markdown = md;
        });
    }

    public get model(): PrivacyPolicyModel {
        return this._model;
    }
}

export default new PrivacyPolicyController();