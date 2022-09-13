import {Controller} from '../controller';
import {TermsOfServiceModel} from '../models';

class TermsOfServiceController extends Controller {
    private readonly _model: TermsOfServiceModel;

    constructor() {
        super();

        this._model = new TermsOfServiceModel();

        fetch('../assets/markdown/terms_of_service.md')
        .then((res) => res.text())
        .then((md) => {
            this._model.markdown = md;
        });
    }

    public get model(): TermsOfServiceModel {
        return this._model;
    }
}

export default new TermsOfServiceController();