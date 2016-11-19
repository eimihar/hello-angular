import {InMemoryDbService} from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService{
    createDb() {
        let heroes = [
            {id: 1, name: "Enix"},
            {id: 2, name: "Yuri"},
            {id: 3, name: "Itzy"}
        ]

        return {heroes: heroes};
    }
}