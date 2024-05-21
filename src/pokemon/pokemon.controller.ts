import { Controller, Get, Post, Body, Patch, Param, Delete,
  HttpCode, HttpStatus, 
  Query} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginatioDto } from 'src/common/dto/pagination.dto';
import { EnvConfiguration } from '../config/app.config';
import { ConfigService } from '@nestjs/config';

@Controller('pokemon')
export class PokemonController {

  private defaultLimit:number;
  private defaultOffset:number;
  constructor(private readonly pokemonService: PokemonService,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
    this.defaultOffset = configService.get<number>('defaulOffset');
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create (@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);  
  }

  @Get()
  findAll(@Query() paginationDto: PaginatioDto) {
    const { limit= this.defaultLimit , offset = this.defaultOffset} = paginationDto;
    return this.pokemonService.findAll(limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
