import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke.response.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/interfaces/adapters/axios.adapter';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  private readonly http: AxiosAdapter) { }

  async excecuteSeed() {

    await this.pokemonModel.deleteMany();
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100')
    
    const pokemonToInsert: {no:number , name: string}[] = []
    data.results.forEach(async ({ name, url }) => {
      let newPokemon: Pokemon;
      const segments = url.split('/')
      const no: number = +segments[segments.length - 2];
      pokemonToInsert.push({name, no})

    })
    await this.pokemonModel.insertMany(pokemonToInsert);
    // !! Forma de hacer inserciones con las promesas
    // await this.pokemonModel.deleteMany();
    // const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    // const insertPromiseArray = []
    // data.results.forEach(async ({ name, url }) => {
    //   let newPokemon: Pokemon;
    //   const segments = url.split('/')
    //   const no: number = +segments[segments.length - 2];

    //   insertPromiseArray.push(this.pokemonModel.create({ no, name }));

    //   // const resultData = await this.pokemonModel.create({no, name})
    //   // console.log("🚀 ~ SeedService ~ excecuteSeed ~ resultData:", resultData)
    // })
    // await Promise.all(insertPromiseArray);

    return "Seed ejecutado";
  }
}
