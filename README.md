#Ejercicio:
Construir una tienda online que despliegue productos agrupados por la categoría a
la que pertenecen, generando por separado backend (API REST) y frontend
(aplicación que la consuma) y utilizando la base de datos que se disponibiliza para
su desarrollo.
Además, hay que agregar un buscador, el cual tiene que estar implementado a nivel
de servidor, mediante una Api Rest cuyo lenguaje y framework puede ser de libre
elección. Es decir, los datos de productos deben llegar filtrados al cliente.
Opcionalmente, puedes implementar filtros por atributo, ordenar productos y
paginación.
La aplicación de cliente tiene que estar desarrollada con vanilla javascript
(javascript puro), sin ningún framework, si puedes usar librerías o componentes
específicos, tales como; boopstrap, material, Jquery, entre otros.

#Importante:
El codigo se encuentra documentado en ingles.
En el proyecto en GIT se encuentra el backend y el frontend divido cada uno en su respectiva carpeta. El deploy del Backend se hizo en heroku y el frontend en netlify, en las siguientes URLS:

- https://boiling-journey-27147.herokuapp.com/api/v1/products
- https://62295b26d9a497499bb4a297--stoic-swirles-650a13.netlify.app/

#Frontend:

- Lenguaje: Javascript
- Componentes: Boostrap

Se utilizo JS vanilla para la creacion, Boostrap para los componentes y CSS para modificar ciertas cosas de los componentes de boostrap. No se utilizo ningun manejo de rutas ya que no era necesario para el caso.
Se aplico el uso de los eventos en los distintos botones en el HTML para hacer las peticiones a la API y mostrar los datos en la pantalla.

El deploy del frontend se hizo en netlifi con la siguiente URL:

- https://62295b26d9a497499bb4a297--stoic-swirles-650a13.netlify.app/

Bugs:
-Se intento distribuir las funciones en distintos archivos js pero generaba problemas al momento de compilado, entonces solo se dejo en un mismo archivo.

#Backend:

- Lenguaje: Nodejs
- Framertork: Express
- Url de la API: https://boiling-journey-27147.herokuapp.com/api/v1

Se usaron principalmente dos librerias:
-Sequelize, se uso para hacer la coneccion con la base de datos y los llamados para pedir la informacion a la base de datos.
-@hapi/boom, se utilizo para el manejo de los errores en las distintas instancias del proyecto ya sea en las peticiones a la base de datos u otros.

El backend principalmente esta divido cuatro carpetas routes,services, middlewares y libs:
-libs:Contiene el archivo con la conexion a la base de datos usando sequelize.
-middlewares: Estos archivos son los encargados de atrapar todos los errores y/o validar ciertos datos de las peticiones.
-services: Estos archivos son los que manejan la logica de las peticiones hacia la base de datos.
-routes: Estos archivos archivos son los que se encargar de leer las rutas de las peticiones y derivarlos a su correspondiente funcion(carpeta services) para obtener la informacion solicitada.

El deploy de la API se hizo en heroku.

Guia de peticiones a la API:

- Todos los productos: https://boiling-journey-27147.herokuapp.com/api/v1/products
- Todos los productos de una categoria: https://boiling-journey-27147.herokuapp.com/api/v1/products/category/1
- Producto filtrado por un id: https://boiling-journey-27147.herokuapp.com/api/v1/products/50
- Productos que en su nombre hagan coincidencias con el dato: https://boiling-journey-27147.herokuapp.com/api/v1/products?data=pisco
- Todos las categorias: https://boiling-journey-27147.herokuapp.com/api/v1/categories
- Categoria filtrado por un id: https://boiling-journey-27147.herokuapp.com/api/v1/categories/5
