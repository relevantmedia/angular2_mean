
import {Component, bootstrap, View} from "angular2/angular2";
import {LayoutHeader} from "header";

@Component({
    selector: 'my-app'
})
@View({
	templateUrl: "./modules/core/client/views/index.client.view.html",
	directives: [LayoutHeader]
})
class MyAppComponent {
    name: string;

    constructor() {
        this.name = 'Alice';
    }
}

bootstrap(MyAppComponent);