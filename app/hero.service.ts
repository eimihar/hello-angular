import {Injectable} from "@angular/core";
import {HEROES} from "./mock-heroes";
import {Hero} from "./hero";
import {Http, Headers, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";

@Injectable()
export class HeroService {
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getHeroes(): Promise<Hero[]> {
        return this.http.get('app/heroes')
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)).then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    update(hero: Hero): Promise<Hero> {
        var url = 'app/heroes/'+hero.id;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post('app/heroes', JSON.stringify({name: name}), this.headers)
            .toPromise()
            .then( response => response.json().data)
            .catch(this.handleError);
    }

    search(name: string): Observable<Hero[]> {
        return this.http
            .get(`'app/heroes/?name=${name}`)
            .map((r: Response) => r.json().data as Hero[]);
    }

    delete(hero: Hero): Promise<Hero> {
        return this.http
            .delete('app/heroes/'+hero.id)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.log('Error error!', error);
        return Promise.reject(error.message || error);
    }
}