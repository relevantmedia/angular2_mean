
import {Component, bootstrap, View} from "angular2/angular2";

@Component({
    selector: 'my-app'
})
@View({
	templateUrl: "./modules/core/client/views/index.client.view.html"
})
class MyAppComponent {
    name: string;

    constructor() {
        this.name = 'Alice';
    }
}

bootstrap(MyAppComponent);