import {Controller} from '../controller';
import {AppModel} from '../models';

class AppController extends Controller {
    private readonly _model: AppModel;

    constructor() {
        super();

        this._model = new AppModel();
    }

    public get model(): AppModel {
        return this._model;
    }
}

export default new AppController();