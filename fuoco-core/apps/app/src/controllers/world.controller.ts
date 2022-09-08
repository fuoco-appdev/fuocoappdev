import {Controller} from '../controller';
import {WorldModel} from '../models';

class WorldController extends Controller {
    private readonly _model: WorldModel;

    constructor() {
        super();

        this._model = new WorldModel();
    }

    public get model(): WorldModel {
        return this._model;
    }
}

export default new WorldController();