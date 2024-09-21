# Proyecto 9 Web Scrapping

## Descripción:

En este proyecto se deberá de realizar un web scrapping de cualquier página, extrayendo los datos (se deberán de recoger muchos) y que se pueda paginar.

[![N|Solid](https://moonlay.com/wp-content/uploads/2023/01/mongoDB.png)](https://nodesource.com/products/nsolid)
[![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkucnJUfKnyTgCTQ-XEp_CbYIDzXJ_1b4BafS7alYn8v8duI9DMcv3zQvb_WF11dX-95M&usqp=CAU)](https://nodesource.com/products/nsolid)
[![N|Solid](https://moonlay.com/wp-content/uploads/2023/01/node-JS.png)](https://nodesource.com/products/nsolid)

### Requisitos mínimos:

- Realizar el README.md con la documentación del proyecto.
- Web scrapping con puppeteer a una página que tenga paginación de datos.
- Se deben quitar siempre los modales que van apareciendo y nos molestan
- El scrapper debe seleccionar todos los productos de cada página.
- El scrapper debe pasar a la siguiente página hasta llegar al final y recoger todos los datos de todas las páginas.
- Debemos guardar el precio, el nombre y la imagen del producto.
- Cuando se hayan recogido todos los datos de todas las páginas, se generará un archivo llamado products.json que aloje todos los datos recogidos.
- En el package.json existirá un script que nos permita ejecutar el scrapper de manera sencilla.
- Una vez recogidos los datos en el scrapping, podréis subirlo a una BBDD y hacer un CRUD de manera adicional.

## Clonación del Proyecto:

```sh
git clone https://github.com/DanielSalvatierraSanchez/Proyecto-8-Backend-API-REST-FILES.git
```

- Entrega del .env:

```
DB_URL=mongodb+srv://proyect8:<password>@cluster0.myq5qnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

- Middlewares:

> upload (Permite la subida de ciertos tipos de archivos a una carpeta de Cloudinary)

- Dependencias del proyecto:

```
npm i -D nodemon
npm i express mongoose dotenv cloudinary multer multer-storage-cloudinary
```

- Scripts del proyecto:

```
npm run start ("node index.js")
npm run dev ("nodemon index.js")
npm run seed ("node ./src/utils/seed/seed.js")
```

### Endpoints Cake

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| REGISTER CAKE | POST | /api/v1/cake/register | { **name**, **difficulty**, **firstImg**, secondImg, thirdImg, ingredients } | upload |
| ALL CAKES | GET | /api/v1/cake | --- |
| CAKE BY NAME | GET | /api/v1/cake/getBy/:name | { **name** } |
| UPDATE CAKE | PUT | /api/v1/cake/update/:id | { **cake data** } | upload |
| DELETE CAKE | DELETE | /api/v1/cake/delete/:id | --- |
| DELETE INGREDIENT OF CAKE | DELETE | /api/v1/cake/deleteIngredient/:id | { **name** } | --- |

## Resumen de los Endpoints Cake

##### POST /api/v1/cake/register
- Para la creación de un Cake se crea un Schema, en el que requerimos 3 campos obligatorios, "name", "difficulty" y "firstImg", también tendremos otros extra que serán "secondImg", "thirdImg" e "ingredients".
```
    {      
        name: { type: String, required: true, trim: true },
        difficulty: { type: String, required: true, enum: ["Baja", "Media", "Alta"] },
        firstImg: { type: String, required: true },
        secondImg: { type: String, required: false },
        thirdImg: { type: String, required: false },
        ingredients: [{ type: mongoose.Types.ObjectId, ref: "ingredients"}]
    }
```

##### GET /api/v1/cake/getBy/:name
-  Para obtener un listado de Cakes por "name" será necesario introducir algún caracter.

##### GET /api/v1/cake/
-  Para obtener un listado de todas las Cakes.

##### PUT /api/v1/cake/update/:id
-  Para la actualización de una Cake mediante su ID.

##### DELETE /api/v1/cake/deleteIngredient/:id
-  Para eliminar un Ingredient por su "name" de una Cake mediante su ID.

##### DELETE /api/v1/cake/delete/:id
-  Para eliminar una Cake por completo mediante su ID.


## Endpoints Ingredient

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| REGISTER INGREDIENT | POST | /api/v1/ingredient/register | { **name**, **quantity**, **units**, **img** } | upload |
| ALL INGREDIENTS | GET | /api/v1/ingredient | --- |
| INGREDIENT BY NAME | GET | /api/v1/ingredient/getBy/:name | { **name** } |
| UPDATE INGREDIENT | PUT | /api/v1/ingredient/update/:id | { **INGREDIENT data** } | upload |
| DELETE INGREDIENT | DELETE | /api/v1/ingredient/delete/:id | --- |

## Resumen de los Endpoints Ingredient

##### POST /api/v1/ingredient/register
- Para la creación de un Ingredient se crea un Schema, en el que requerimos 4 campos obligatorios, "name", "quantity", "units" e "img".
```
    {
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, min: 1, trim: true },
        units: { type: String, required: true, enum: ["Gramos", "Mililitros", "Unidad", "Unidades"] },
        img: { type: String, required: true }
    }
```

##### GET /api/v1/ingredient/getBy/:name
-  Para obtener un listado de Ingredients por "name" será necesario introducir algún caracter.

##### GET /api/v1/ingredient/
-  Para obtener un listado de todos los Ingredients.

##### PUT /api/v1/ingredient/update/:id
-  Para la actualización de un Ingredient mediante su ID.

##### DELETE /api/v1/ingredient/delete/:id
-  Para eliminar un Ingredient por completo mediante su ID.
