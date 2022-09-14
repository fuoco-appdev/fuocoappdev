import { select } from '@ngneat/elf';
import { Subscription, skipWhile } from 'rxjs';
import {Controller} from '../controller';
import {WorldModel} from '../models';
import { RoutePaths } from '../route-paths';

class WorldController extends Controller {
    private readonly _model: WorldModel;
    private readonly _locationSubscription: Subscription;

    constructor() {
        super();

        this._model = new WorldModel();

        this.onLocationChanged = this.onLocationChanged.bind(this);

        this._locationSubscription = this._model.store.pipe(select((model => model.location)))
        .pipe(skipWhile((location: Location) => location === undefined))
        .subscribe(this.onLocationChanged);
    }

    public get model(): WorldModel {
        return this._model;
    }

    public override dispose(): void {
        this._locationSubscription.unsubscribe();
    }

    public updateIsVisible(isVisible: boolean): void {
        this._model.isVisible = isVisible;
    }

    private onLocationChanged(location: Location): void {
        switch(location.pathname) {
            case RoutePaths.Default:
                this._model.isVisible = true;
                break;
            case RoutePaths.Landing:
                this._model.isVisible = true;
                break;
            default:
                break;
        }
    }
}

export default new WorldController();