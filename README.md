<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en DEV

1. Clonar repo
2. Ejecutar

```
npm i
```

3. Tener nest CLI instalado

```
npm i -g @nestjs/cli
``` 
4. Levantar la BD

```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. Rellenar la informacion faltante en las variables de entorno definidas en el __.env.template__

7. Ejecutar la aplicacion con el siguiente comando

```
npm run start:dev
```

8. Reconstruit la base de datos con la semilla

```
http://localhost:3000/api/v2/seed
```

# Produccion Build
1. Crear el archivo __.env.prod__
2. Diligenciar las variables de entorno de prod
3. Crear la nueva imagen

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Stack usado
* MongoDB
* Nest


