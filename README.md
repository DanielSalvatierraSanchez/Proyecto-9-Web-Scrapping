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
git clone https://github.com/DanielSalvatierraSanchez/Proyecto-9-Web-Scrapping.git
```

- Entrega del .env:

```
DB_URL=mongodb+srv://proyecto9:<password>@cluster0.2kwa8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

- Dependencias del proyecto:

```
npm i -D nodemon
npm i express mongoose dotenv puppeteer
```

- Scripts del proyecto:

```
npm run scrapper ("node ./src/utils/scrapperLauncher.js")
npm run start ("node index.js")
npm run dev ("nodemon index.js")
```

### Endpoints Products

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| CREATE LIST | POST | /api/v1/products/register | --- | --- |
| PRODUCTS BY NAME | GET | /api/v1/products/getByName/:name | { **name** } | --- |
| PRODUCTS BY PRICE | GET | /api/v1/products/getByPrice/:price | { **price** } | --- |
| ALL PRODUCTS | GET | /api/v1/products | --- | --- |
| UPDATE PRODUCT | PUT | /api/v1/products/update/:id | { **products data** } | --- |
| DELETE PRODUCT | DELETE | /api/v1/products/delete/:id | --- | --- |

## Resumen de los Endpoints Products

##### POST /api/v1/products/register
- Para la creación de un listado de products se crea un Schema, en el que requerimos 3 campos obligatorios, "image", "name" y "price".
Se obtendrá un listado de productos mediante la ejecución del script
``` npm run scrapper ```
el cuál obtendrá insertará un listado de productos con los campos que se requieren en el Schema dentro de la BBDD que hemos creado.
```
{
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true }
}
```

##### GET /api/v1/products/getByName/:name
-  Para obtener un listado de productos por "name" será necesario introducir algún caracter.

##### GET /api/v1/products/getByPrice/:price
-  Para obtener un listado de productos por "price" será necesario introducir algún caracter.

##### GET /api/v1/products/
-  Para obtener un listado de todas los productos.

##### PUT /api/v1/products/update/:id
-  Para la actualización de un producto mediante su ID.

##### DELETE /api/v1/products/delete/:id
-  Para eliminar un producto por completo mediante su ID.
