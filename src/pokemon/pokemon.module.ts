import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { CommonModule } from '../common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Pokemon.name,
          schema: PokemonSchema,
        }
      ]
    ),
    ConfigModule
  ],
  exports: [PokemonService, MongooseModule]
})
export class PokemonModule { }
