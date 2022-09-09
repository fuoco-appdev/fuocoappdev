import { select } from '@ngneat/elf';
import { Subscription } from 'rxjs';
import {Controller} from '../controller';
import {WorldModel} from '../models';

class WorldController extends Controller {
    private readonly _model: WorldModel;
    private readonly _locationSubscription: Subscription;

    constructor() {
        super();

        this._model = new WorldModel();

        this.onLocationChanged = this.onLocationChanged.bind(this);

        this._locationSubscription = this._model.store.pipe(select((model => model.location))).subscribe(this.onLocationChanged);
    }

    public get model(): WorldModel {
        return this._model;
    }

    public override dispose(): void {
        this._locationSubscription.unsubscribe();
    }

    private onLocationChanged(location: Location): void {
        console.log(location);
    }
}

export default new WorldController();