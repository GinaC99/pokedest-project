import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      return this.handleExceptions(error.code, "creacion pokemon");}
  }

  findAll(limit, offset) {
    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      no: 1
    })
    .select('-__v')
    ;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    }
    else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    else if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }
    else throw new NotFoundException(`No se encontro el pokemon ${term}`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (!pokemon) throw new NotFoundException(`No se encontro ${term}`)
    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
    try {
      await pokemon.updateOne(updatePokemonDto, {new: true})
      return {...pokemon.toJSON() };
      
    } catch (error) {
      return this.handleExceptions(error.code, term);
      
    }
  }

  async remove(terms: string) {

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: terms });
    console.log("🚀 ~ PokemonService ~ remove ~ deletedCount:", !deletedCount)
    if (!deletedCount) throw new NotFoundException(`No se encuentra el is ${terms}`)
    return 'Se elimino el registro exitosamente';
  
  }

  private handleExceptions (code:number, term:string){
    if(code === 11000) throw new BadRequestException(`el dato ya existe ${term}`)
    console.log(code)
    throw new InternalServerErrorException(`No se puede crear el pokemon - revisar los logs`)
    
  }
}
