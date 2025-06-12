# Getting Started

## Available Scripts

In the project directory, you can run:

### `npm test`

### `npm run build`

```
Features
API de consulta y filtrado por query parameter de customers  GET /customers
Si buscamos por el criterio de nombre “ab” seria GET /customers?name=ab y buscara cualquier nombre que empiece con ese criterio si encuentra resultados arrojada un array de objetos
El listado de datos lo obtiene de un servicio que retorna al azar 100 personas random https://randomuser.me/api/?results=100
ademas de retornar esos datos random del servicio agregaremos un correo que se basara con la primera letra de su nombre con su apellido seguido de @ihfintech.com.pe ejemplo john es su nombre y Doe es su apellido su seria johndoe@ihfintech.com.pe
Challenges
HU 1
Como usuario me gustaría poder listar customers por nombre y apellidos (name, lastname) poder buscar por ambos si es necesario de la siguiente forma
GET /customers?name=ab&lastname=cd
GET /customers?name=ab
GET /customers?lastname=cd
Si se busca por ambos name y lastname deberá coincidir ambos criterios para que pueda retornar algún valor si no hubiera valor considerar retornar vacio
// no hay conincidencias
[]
// si hay coincidencias 
[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]
HU 2Como usuario debo de poder listar customers por genero (gender) y paginarlo de tal forma que pueda ver 10 elementos por cada pagina la lógica de paginación es libre solo debe cumplirse que se le liste 10 por cada pagina.
Request referencial
GET /customers?gender=female
Response referencial
{
  "total": 300
  "<< fields pagination >>"
  "data": [...]
}
Nota: todos los cambios deberán tener uno o mas de un testcase que los cubra.

```